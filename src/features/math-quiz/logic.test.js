import { describe, expect, it } from "vitest";
import { TOTAL } from "../kanji-quiz/constants.js";
import { makeMathQuestions } from "./logic.js";

describe("makeMathQuestions", () => {
  it("1年生は一桁の足し算とマイナスにならない一桁の引き算を返す", () => {
    for (let run = 0; run < 30; run++) {
      const questions = makeMathQuestions(1);

      expect(questions).toHaveLength(TOTAL);

      for (const question of questions) {
        expect(["+", "-"]).toContain(question.operator);
        expect(question.left).toBeGreaterThanOrEqual(0);
        expect(question.left).toBeLessThanOrEqual(9);
        expect(question.right).toBeGreaterThanOrEqual(0);
        expect(question.right).toBeLessThanOrEqual(9);
        expect(question.answer).toBeGreaterThanOrEqual(0);
      }
    }
  });

  it("2年生は二桁の足し算、二桁の引き算、一桁の掛け算をだいたい均等に返す", () => {
    const questions = makeMathQuestions(2);
    const counts = countByOperator(questions);

    expect(questions).toHaveLength(TOTAL);
    expect(counts["+"]).toBeGreaterThanOrEqual(3);
    expect(counts["-"]).toBeGreaterThanOrEqual(3);
    expect(counts["×"]).toBeGreaterThanOrEqual(3);

    for (const question of questions) {
      if (question.operator === "×") {
        expect(question.left).toBeGreaterThanOrEqual(1);
        expect(question.left).toBeLessThanOrEqual(9);
        expect(question.right).toBeGreaterThanOrEqual(1);
        expect(question.right).toBeLessThanOrEqual(9);
      } else {
        expect(question.left).toBeGreaterThanOrEqual(10);
        expect(question.left).toBeLessThanOrEqual(99);
        expect(question.right).toBeGreaterThanOrEqual(10);
        expect(question.right).toBeLessThanOrEqual(99);
      }

      expect(question.answer).toBeGreaterThanOrEqual(0);
    }
  });

  it("3年生は二桁かける一桁の掛け算だけを返す", () => {
    const questions = makeMathQuestions(3);

    expect(questions).toHaveLength(TOTAL);

    for (const question of questions) {
      expect(question.operator).toBe("×");
      expect(question.left).toBeGreaterThanOrEqual(10);
      expect(question.left).toBeLessThanOrEqual(99);
      expect(question.right).toBeGreaterThanOrEqual(1);
      expect(question.right).toBeLessThanOrEqual(9);
      expect(question.answer).toBe(question.left * question.right);
    }
  });
});

function countByOperator(questions) {
  return questions.reduce(
    (counts, question) => ({
      ...counts,
      [question.operator]: counts[question.operator] + 1,
    }),
    { "+": 0, "-": 0, "×": 0 },
  );
}
