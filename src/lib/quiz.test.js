import { describe, expect, it } from "vitest";
import { GRADE_DATA } from "./kanjiData.js";
import { TOTAL, makeQuestions } from "./quiz.js";

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
