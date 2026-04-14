import { TOTAL } from "./constants.js";

export function shuffle(items) {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

export function makeQuestions(data, mode) {
  const pool = [];

  for (const entry of data) {
    if (mode !== "kun" && entry.on) {
      pool.push({
        k: entry.k,
        reading: entry.on,
        displayK: entry.k,
        type: "おんよみ",
      });
    }

    if (mode !== "on" && entry.kun) {
      pool.push({
        k: entry.k,
        reading: entry.kun.s,
        displayK: entry.k + entry.kun.o,
        type: "くんよみ",
      });
    }
  }

  const shuffledPool = shuffle(pool);
  const usedKanji = new Set();
  const selectedQuestions = [];

  for (const item of shuffledPool) {
    if (!usedKanji.has(item.k) && selectedQuestions.length < TOTAL) {
      usedKanji.add(item.k);
      selectedQuestions.push(item);
    }
  }

  return selectedQuestions.map((item) => {
    const distractors = [
      ...new Set(
        pool
          .filter((candidate) => candidate.type === item.type && candidate.reading !== item.reading)
          .map((candidate) => candidate.reading),
      ),
    ];

    return {
      ...item,
      choices: shuffle([item.reading, ...shuffle(distractors).slice(0, 3)]),
    };
  });
}

export function getStars(score) {
  if (score >= 9) {
    return "⭐⭐⭐";
  }

  if (score >= 6) {
    return "⭐⭐";
  }

  return "⭐";
}

export function getResultMessage(score) {
  if (score === 10) {
    return "かんぺき！100てん！🎉";
  }

  if (score >= 9) {
    return "すごい！あとすこし！";
  }

  if (score >= 6) {
    return "よくできました！";
  }

  return "もっとがんばろう！";
}

export function getKanjiFontSize(text) {
  if (text.length <= 1) {
    return "clamp(78px,21vw,106px)";
  }

  if (text.length === 2) {
    return "clamp(58px,15vw,76px)";
  }

  return "clamp(40px,10.5vw,54px)";
}
