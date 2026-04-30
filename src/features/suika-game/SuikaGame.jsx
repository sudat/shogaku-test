import React, { useEffect, useRef, useState } from "react";
import { Bodies, Body, Composite, Engine, Events, World } from "matter-js";
import {
  BEST_SCORE_KEY,
  BOARD_HEIGHT,
  BOARD_WIDTH,
  DANGER_LINE_Y,
  DROP_DELAY_MS,
  DROP_Y,
  FRUITS,
  GAME_OVER_GRACE_MS,
  clampDropX,
  getMergedLevel,
  getRandomSpawnLevel,
  makeInitialQueue,
} from "./data.js";

const FLOOR_THICKNESS = 40;
const SIDE_WALL_THICKNESS = 36;
const FIXED_TIME_STEP = 1000 / 60;
const MAX_FRAME_DELTA = 34;
const MERGE_LOCK_MS = 120;
const DRAWN_BACKGROUND_SCALE = 0.97;

let fruitIdSeed = 1;

function readBestScore() {
  if (typeof window === "undefined") {
    return 0;
  }

  const raw = window.localStorage.getItem(BEST_SCORE_KEY);
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function writeBestScore(score) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(BEST_SCORE_KEY, String(score));
}

function createImageMap() {
  if (typeof Image === "undefined") {
    return new Map();
  }

  return new Map(
    FRUITS.map((fruit) => {
      const image = new Image();
      image.src = fruit.image;
      return [fruit.id, image];
    }),
  );
}

function bodyMeta(body) {
  return body.plugin?.suika ?? null;
}

function isFruitBody(body) {
  return body.label === "fruit" && bodyMeta(body) !== null;
}

function drawFruit(context, imageMap, level, x, y, radius, alpha = 1) {
  const fruit = FRUITS[level];
  const image = imageMap.get(fruit.id);
  const backgroundRadius = radius * DRAWN_BACKGROUND_SCALE;

  context.save();
  context.globalAlpha = alpha;
  context.beginPath();
  context.arc(x, y, backgroundRadius, 0, Math.PI * 2);
  context.closePath();
  context.fillStyle = fruit.fallbackFill;
  context.fill();

  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.closePath();
  context.clip();

  if (image && image.complete) {
    const size = radius * 2.1;
    context.drawImage(image, x - size / 2, y - size / 2, size, size);
  } else {
    context.fillStyle = fruit.fallbackFill;
    context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }

  context.restore();

  context.save();
  context.globalAlpha = alpha;
  context.beginPath();
  context.arc(x, y, backgroundRadius, 0, Math.PI * 2);
  context.closePath();
  context.lineWidth = Math.max(2, radius * 0.08);
  context.strokeStyle = "rgba(255,255,255,0.58)";
  context.stroke();
  context.lineWidth = Math.max(1, radius * 0.04);
  context.strokeStyle = fruit.fallbackStroke;
  context.stroke();
  context.restore();
}

export default function SuikaGame({ onBackToSubjects }) {
  const initialQueueRef = useRef(makeInitialQueue());
  const bestScoreRef = useRef(readBestScore());
  const scoreRef = useRef(0);
  const currentLevelRef = useRef(initialQueueRef.current.currentLevel);
  const nextLevelRef = useRef(initialQueueRef.current.nextLevel);
  const dropXRef = useRef(BOARD_WIDTH / 2);
  const canDropAtRef = useRef(0);
  const gameOverRef = useRef(false);
  const dangerStartedAtRef = useRef(null);
  const dragPointerIdRef = useRef(null);
  const queuedMergesRef = useRef([]);
  const animationFrameRef = useRef(0);
  const engineRef = useRef(null);
  const boardRef = useRef(null);
  const canvasRef = useRef(null);
  const imageMapRef = useRef(createImageMap());

  const [sessionKey, setSessionKey] = useState(0);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(bestScoreRef.current);
  const [currentLevel, setCurrentLevel] = useState(initialQueueRef.current.currentLevel);
  const [nextLevel, setNextLevel] = useState(initialQueueRef.current.nextLevel);
  const [gameOver, setGameOver] = useState(false);

  function createFruitBody(level, x, y) {
    const fruit = FRUITS[level];
    const body = Bodies.circle(x, y, fruit.radius, {
      label: "fruit",
      restitution: 0.08,
      friction: 0.015,
      frictionAir: 0.012,
      density: 0.0015,
      slop: 0.5,
    });

    body.plugin.suika = {
      fruitId: fruitIdSeed++,
      level,
      removed: false,
      mergeLockedUntil: 0,
    };

    return body;
  }

  function updateScore(nextScore) {
    scoreRef.current = nextScore;
    setScore(nextScore);

    if (nextScore > bestScoreRef.current) {
      bestScoreRef.current = nextScore;
      setBestScore(nextScore);
      writeBestScore(nextScore);
    }
  }

  function resetSession() {
    const queue = makeInitialQueue();

    currentLevelRef.current = queue.currentLevel;
    nextLevelRef.current = queue.nextLevel;
    dropXRef.current = BOARD_WIDTH / 2;
    canDropAtRef.current = 0;
    gameOverRef.current = false;
    dangerStartedAtRef.current = null;
    queuedMergesRef.current = [];
    dragPointerIdRef.current = null;

    setScore(0);
    scoreRef.current = 0;
    setGameOver(false);
    setCurrentLevel(queue.currentLevel);
    setNextLevel(queue.nextLevel);
    setSessionKey((value) => value + 1);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    let context = null;

    if (canvas) {
      try {
        context = canvas.getContext("2d");
      } catch {
        context = null;
      }
    }

    if (!canvas || !context) {
      return undefined;
    }

    const engine = Engine.create({
      gravity: { x: 0, y: 1.08 },
      positionIterations: 10,
      velocityIterations: 8,
    });
    engineRef.current = engine;

    const world = engine.world;
    World.add(world, [
      Bodies.rectangle(BOARD_WIDTH / 2, BOARD_HEIGHT + FLOOR_THICKNESS / 2, BOARD_WIDTH + 24, FLOOR_THICKNESS, {
        isStatic: true,
        restitution: 0.05,
      }),
      Bodies.rectangle(-SIDE_WALL_THICKNESS / 2, BOARD_HEIGHT / 2, SIDE_WALL_THICKNESS, BOARD_HEIGHT, {
        isStatic: true,
      }),
      Bodies.rectangle(BOARD_WIDTH + SIDE_WALL_THICKNESS / 2, BOARD_HEIGHT / 2, SIDE_WALL_THICKNESS, BOARD_HEIGHT, {
        isStatic: true,
      }),
    ]);

    const queueMerge = (bodyA, bodyB) => {
      const metaA = bodyMeta(bodyA);
      const metaB = bodyMeta(bodyB);

      if (!metaA || !metaB || metaA.level !== metaB.level) {
        return;
      }

      const now = performance.now();
      if (metaA.removed || metaB.removed || metaA.mergeLockedUntil > now || metaB.mergeLockedUntil > now) {
        return;
      }

      const key =
        metaA.fruitId < metaB.fruitId
          ? `${metaA.fruitId}:${metaB.fruitId}`
          : `${metaB.fruitId}:${metaA.fruitId}`;

      if (queuedMergesRef.current.some((item) => item.key === key)) {
        return;
      }

      queuedMergesRef.current.push({ key, bodyA, bodyB, level: metaA.level });
    };

    const handleCollision = (event) => {
      for (const pair of event.pairs) {
        if (!isFruitBody(pair.bodyA) || !isFruitBody(pair.bodyB)) {
          continue;
        }

        queueMerge(pair.bodyA, pair.bodyB);
      }
    };

    Events.on(engine, "collisionStart", handleCollision);
    Events.on(engine, "collisionActive", handleCollision);

    let previousFrameAt = performance.now();

    const processMerges = (now) => {
      const worldBodies = new Set(Composite.allBodies(world));
      const nextQueue = [];

      for (const merge of queuedMergesRef.current) {
        const metaA = bodyMeta(merge.bodyA);
        const metaB = bodyMeta(merge.bodyB);

        if (
          !metaA ||
          !metaB ||
          metaA.removed ||
          metaB.removed ||
          !worldBodies.has(merge.bodyA) ||
          !worldBodies.has(merge.bodyB)
        ) {
          continue;
        }

        metaA.removed = true;
        metaB.removed = true;

        const mergedLevel = getMergedLevel(merge.level);
        World.remove(world, merge.bodyA);
        World.remove(world, merge.bodyB);

        if (mergedLevel !== null) {
          const mergedFruit = FRUITS[mergedLevel];
          const mergedBody = createFruitBody(
            mergedLevel,
            (merge.bodyA.position.x + merge.bodyB.position.x) / 2,
            (merge.bodyA.position.y + merge.bodyB.position.y) / 2 - 4,
          );

          bodyMeta(mergedBody).mergeLockedUntil = now + MERGE_LOCK_MS;
          World.add(world, mergedBody);

          Body.setVelocity(mergedBody, {
            x: (merge.bodyA.velocity.x + merge.bodyB.velocity.x) / 2,
            y: Math.max(0, (merge.bodyA.velocity.y + merge.bodyB.velocity.y) / 2),
          });
          Body.setAngularVelocity(mergedBody, (merge.bodyA.angularVelocity + merge.bodyB.angularVelocity) / 2);

          updateScore(scoreRef.current + mergedFruit.score);
          continue;
        }

        updateScore(scoreRef.current + FRUITS[merge.level].score);
      }

      queuedMergesRef.current = nextQueue;
    };

    const drawBoard = () => {
      const { width, height } = canvas;
      context.clearRect(0, 0, width, height);

      const background = context.createLinearGradient(0, 0, 0, height);
      background.addColorStop(0, "#fff7ed");
      background.addColorStop(1, "#ffe7dd");
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);

      context.fillStyle = "rgba(255,255,255,0.54)";
      context.fillRect(0, 0, width, 72);

      context.setLineDash([10, 8]);
      context.strokeStyle = gameOverRef.current ? "rgba(217,91,74,0.85)" : "rgba(160,112,96,0.58)";
      context.lineWidth = 3;
      context.beginPath();
      context.moveTo(18, DANGER_LINE_Y);
      context.lineTo(width - 18, DANGER_LINE_Y);
      context.stroke();
      context.setLineDash([]);

      context.fillStyle = "rgba(122,74,48,0.75)";
      context.font = "12px Kosugi Maru, sans-serif";
      context.fillText("ここをこえるとゲームオーバー", 18, DANGER_LINE_Y - 10);

      const fruits = Composite.allBodies(world)
        .filter(isFruitBody)
        .sort((left, right) => left.position.y - right.position.y);

      context.strokeStyle = "rgba(255,255,255,0.42)";
      context.lineWidth = 2;

      if (!gameOverRef.current) {
        const waitingFruit = FRUITS[currentLevelRef.current];
        const waitingX = clampDropX(currentLevelRef.current, dropXRef.current);
        const guideTop = 34;

        context.strokeStyle = "rgba(255,255,255,0.7)";
        context.beginPath();
        context.moveTo(waitingX, guideTop);
        context.lineTo(waitingX, DANGER_LINE_Y - 12);
        context.stroke();

        drawFruit(context, imageMapRef.current, currentLevelRef.current, waitingX, guideTop, waitingFruit.radius, 0.96);
      }

      for (const fruitBody of fruits) {
        const level = bodyMeta(fruitBody).level;
        drawFruit(
          context,
          imageMapRef.current,
          level,
          fruitBody.position.x,
          fruitBody.position.y,
          FRUITS[level].radius,
        );
      }
    };

    const frame = (now) => {
      const delta = Math.min(MAX_FRAME_DELTA, now - previousFrameAt || FIXED_TIME_STEP);
      previousFrameAt = now;

      Engine.update(engine, delta);
      processMerges(now);

      if (!gameOverRef.current) {
        const fruits = Composite.allBodies(world).filter(isFruitBody);
        const crossedDangerLine = fruits.some((fruitBody) => fruitBody.position.y - FRUITS[bodyMeta(fruitBody).level].radius < DANGER_LINE_Y);

        if (crossedDangerLine) {
          if (dangerStartedAtRef.current === null) {
            dangerStartedAtRef.current = now;
          } else if (now - dangerStartedAtRef.current >= GAME_OVER_GRACE_MS) {
            gameOverRef.current = true;
            setGameOver(true);
          }
        } else {
          dangerStartedAtRef.current = null;
        }
      }

      drawBoard();
      animationFrameRef.current = window.requestAnimationFrame(frame);
    };

    animationFrameRef.current = window.requestAnimationFrame(frame);

    return () => {
      window.cancelAnimationFrame(animationFrameRef.current);
      Events.off(engine, "collisionStart", handleCollision);
      Events.off(engine, "collisionActive", handleCollision);
      Composite.clear(world, false, true);
      Engine.clear(engine);
      engineRef.current = null;
    };
  }, [sessionKey]);

  const updateAim = (event) => {
    const board = boardRef.current;
    if (!board) {
      return;
    }

    const rect = board.getBoundingClientRect();
    const relativeX = ((event.clientX - rect.left) / rect.width) * BOARD_WIDTH;
    dropXRef.current = clampDropX(currentLevelRef.current, relativeX);
  };

  const dropCurrentFruit = () => {
    if (gameOverRef.current || !engineRef.current) {
      return;
    }

    const now = performance.now();
    if (now < canDropAtRef.current) {
      return;
    }

    const level = currentLevelRef.current;
    const body = createFruitBody(level, clampDropX(level, dropXRef.current), DROP_Y);
    World.add(engineRef.current.world, body);

    canDropAtRef.current = now + DROP_DELAY_MS;
    currentLevelRef.current = nextLevelRef.current;
    nextLevelRef.current = getRandomSpawnLevel();
    dropXRef.current = clampDropX(currentLevelRef.current, dropXRef.current);

    setCurrentLevel(currentLevelRef.current);
    setNextLevel(nextLevelRef.current);
  };

  const handlePointerDown = (event) => {
    if (gameOver) {
      return;
    }

    dragPointerIdRef.current = event.pointerId;
    boardRef.current?.setPointerCapture?.(event.pointerId);
    updateAim(event);
  };

  const handlePointerMove = (event) => {
    if (event.pointerType === "mouse" || dragPointerIdRef.current === event.pointerId) {
      updateAim(event);
    }
  };

  const handlePointerUp = (event) => {
    if (dragPointerIdRef.current !== event.pointerId) {
      return;
    }

    updateAim(event);
    dragPointerIdRef.current = null;
    boardRef.current?.releasePointerCapture?.(event.pointerId);
    dropCurrentFruit();
  };

  const nextFruit = FRUITS[nextLevel];

  return (
    <div className="sg-shell">
      <div className="sg-header">
        <div>
          <h1 className="sg-title">スイカゲーム</h1>
          <p className="sg-sub">同じ果物をくっつけて大きくしよう</p>
        </div>
        <div className="sg-scoreStack">
          <div className="sg-statCard">
            <span className="sg-statLabel">スコア</span>
            <span className="sg-statValue">{score}</span>
          </div>
          <div className="sg-statCard">
            <span className="sg-statLabel">ベスト</span>
            <span className="sg-statValue">{bestScore}</span>
          </div>
        </div>
      </div>

      <div className="sg-boardCard">
        <div className="sg-topRow">
          <div className="sg-previewCard">
            <span className="sg-previewLabel">つぎ</span>
            <div className="sg-previewFruit">
              <img src={nextFruit.image} alt="" />
            </div>
            <span className="sg-previewName">{nextFruit.label}</span>
          </div>

          <div className="sg-help">
            <p>左右にうごかして、はなすと落ちるよ</p>
            <p>いちじく → いちご → ぶどう → なし → もも → メロン → スイカ</p>
          </div>
        </div>

        <div
          ref={boardRef}
          className="sg-board"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <canvas
            ref={canvasRef}
            className="sg-canvas"
            width={BOARD_WIDTH}
            height={BOARD_HEIGHT}
            aria-label="スイカゲームのボード"
          />

          {gameOver && (
            <div className="sg-overlay">
              <div className="sg-overlayPanel">
                <div className="sg-overlayTitle">ゲームオーバー！</div>
                <div className="sg-overlayScore">{score}</div>
                <div className="sg-overlaySub">ここまでのスコア</div>
                <button className="kq-retryBtn" onClick={resetSession}>
                  もういちど！
                </button>
                <button className="kq-backBtn" onClick={onBackToSubjects}>
                  教科をえらぶ
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="sg-actions">
        <button className="kq-retryBtn sg-actionBtn" onClick={resetSession}>
          はじめから
        </button>
        {!gameOver && (
          <button className="kq-backBtn sg-actionBtnSecondary" onClick={onBackToSubjects}>
            教科をえらぶ
          </button>
        )}
      </div>
    </div>
  );
}
