import { describe, expect, it } from "vitest";
import { GRADE_DATA } from "./kanjiData.js";
import { TOTAL, makeQuestions } from "./quiz.js";
import { makeWriteQuestions } from "../features/kanji-quiz/logic.js";

describe("makeQuestions", () => {
  it("学年データから重複しない10問を返す", () => {
    const questions = makeQuestions(GRADE_DATA[1], "both");

    expect(questions).toHaveLength(TOTAL);
    expect(new Set(questions.map((question) => question.k)).size).toBe(TOTAL);
  });

  it("各設問に4択を含み、正答を必ず含める", () => {
    const questions = makeQuestions(GRADE_DATA[2], "on");

    for (const question of questions) {
      expect(question.choices).toHaveLength(4);
      expect(question.choices).toContain(question.reading);
    }
  });

  it("くんよみモードでは訓読み問題だけを返す", () => {
    const questions = makeQuestions(GRADE_DATA[3], "kun");

    expect(questions.every((question) => question.type === "くんよみ")).toBe(true);
  });
});

describe("makeWriteQuestions", () => {
  it("returns exactly 10 questions", () => {
    const questions = makeWriteQuestions(GRADE_DATA[2]);

    expect(questions).toHaveLength(TOTAL);
  });

  it("each question has display, answer, k, choices", () => {
    const questions = makeWriteQuestions(GRADE_DATA[2]);

    for (const question of questions) {
      expect(question).toHaveProperty("display");
      expect(question).toHaveProperty("answer");
      expect(question).toHaveProperty("k");
      expect(question).toHaveProperty("choices");
    }
  });

  it("correct answer is always in choices", () => {
    const questions = makeWriteQuestions(GRADE_DATA[2]);

    for (const question of questions) {
      expect(question.choices).toContain(question.answer);
    }
  });

  it("choices always has 4 items", () => {
    const questions = makeWriteQuestions(GRADE_DATA[2]);

    for (const question of questions) {
      expect(question.choices).toHaveLength(4);
    }
  });

  it("no distractor shares a reading with the question's display (20 runs)", () => {
    const data = GRADE_DATA[2];

    for (let run = 0; run < 20; run++) {
      const questions = makeWriteQuestions(data);

      for (const question of questions) {
        const distractors = question.choices.filter((c) => c !== question.answer);

        for (const distractor of distractors) {
          const entry = data.find((e) => e.k === distractor);
          const entryReadings = [];
          if (entry.on) entryReadings.push(entry.on);
          if (entry.kun) entryReadings.push(entry.kun.s + entry.kun.o);

          expect(entryReadings).not.toContain(question.display);
        }
      }
    }
  });
});
