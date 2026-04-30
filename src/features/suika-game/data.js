import figImage from "../../assets/suika/fig.svg";
import grapeImage from "../../assets/suika/grape.svg";
import melonImage from "../../assets/suika/melon.svg";
import peachImage from "../../assets/suika/peach.svg";
import pearImage from "../../assets/suika/pear.svg";
import strawberryImage from "../../assets/suika/strawberry.svg";
import watermelonImage from "../../assets/suika/watermelon.svg";

export const BOARD_WIDTH = 320;
export const BOARD_HEIGHT = 420;
export const DANGER_LINE_Y = 92;
export const DROP_Y = 44;
export const DROP_DELAY_MS = 420;
export const GAME_OVER_GRACE_MS = 1200;
export const BEST_SCORE_KEY = "shogaku-suika-best-score";
export const SPAWN_LEVEL_COUNT = 3;

export const FRUITS = [
  {
    id: "fig",
    label: "いちじく",
    radius: 14,
    score: 1,
    image: figImage,
    fallbackFill: "#9d4d90",
    fallbackStroke: "#7d396f",
  },
  {
    id: "strawberry",
    label: "いちご",
    radius: 18,
    score: 1,
    image: strawberryImage,
    fallbackFill: "#ef5f77",
    fallbackStroke: "#d8445f",
  },
  {
    id: "grape",
    label: "ぶどう",
    radius: 26,
    score: 3,
    image: grapeImage,
    fallbackFill: "#6f5ab4",
    fallbackStroke: "#56469a",
  },
  {
    id: "pear",
    label: "なし",
    radius: 34,
    score: 6,
    image: pearImage,
    fallbackFill: "#d1b24e",
    fallbackStroke: "#b29233",
  },
  {
    id: "peach",
    label: "もも",
    radius: 44,
    score: 10,
    image: peachImage,
    fallbackFill: "#f5a7b1",
    fallbackStroke: "#e07a89",
  },
  {
    id: "melon",
    label: "メロン",
    radius: 54,
    score: 16,
    image: melonImage,
    fallbackFill: "#cfe875",
    fallbackStroke: "#86af4c",
  },
  {
    id: "watermelon",
    label: "スイカ",
    radius: 66,
    score: 24,
    image: watermelonImage,
    fallbackFill: "#ea6954",
    fallbackStroke: "#c64635",
  },
];

export function getRandomSpawnLevel() {
  return Math.floor(Math.random() * SPAWN_LEVEL_COUNT);
}

export function getMergedLevel(level) {
  return level < FRUITS.length - 1 ? level + 1 : null;
}

export function clampDropX(level, x) {
  const radius = FRUITS[level].radius;
  return Math.max(radius, Math.min(BOARD_WIDTH - radius, x));
}

export function makeInitialQueue() {
  return {
    currentLevel: getRandomSpawnLevel(),
    nextLevel: getRandomSpawnLevel(),
  };
}
