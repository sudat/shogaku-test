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

function getAllReadings(entry) {
  const readings = []
  if (entry.on) readings.push(entry.on)
  if (entry.kun) readings.push(entry.kun.s + entry.kun.o)
  return readings
}

export function makeWriteQuestions(data) {
  const pool = []

  for (const entry of data) {
    const hasOn = entry.on !== null
    const hasKun = entry.kun !== null

    if (hasOn && hasKun) {
      if (Math.random() < 0.5) {
        pool.push({ display: entry.on, answer: entry.k, k: entry.k })
      } else {
        pool.push({ display: entry.kun.s + entry.kun.o, answer: entry.k, k: entry.k })
      }
    } else if (hasOn) {
      pool.push({ display: entry.on, answer: entry.k, k: entry.k })
    } else if (hasKun) {
      pool.push({ display: entry.kun.s + entry.kun.o, answer: entry.k, k: entry.k })
    }
  }

  const shuffledPool = shuffle(pool)
  const usedKanji = new Set()
  const selectedQuestions = []

  for (const item of shuffledPool) {
    if (!usedKanji.has(item.k) && selectedQuestions.length < TOTAL) {
      usedKanji.add(item.k)
      selectedQuestions.push(item)
    }
  }

  return selectedQuestions.map((item) => {
    const distractorPool = pool.filter((candidate) => {
      if (candidate.k === item.k) return false
      const candidateReadings = getAllReadings(data.find((e) => e.k === candidate.k))
      return !candidateReadings.includes(item.display)
    })

    const distractorKanji = [
      ...new Set(distractorPool.map((c) => c.k)),
    ]

    const chosenDistractors = shuffle(distractorKanji).slice(0, 3)

    return {
      display: item.display,
      answer: item.answer,
      k: item.k,
      choices: shuffle([item.answer, ...chosenDistractors]),
    }
  })
}

export function getReadingFontSize(text) {
  if (text.length <= 2) {
    return "clamp(64px,17vw,86px)"
  }

  if (text.length <= 4) {
    return "clamp(44px,12vw,58px)"
  }

  return "clamp(34px,9vw,46px)"
}
