import React from "react";
import { TOTAL } from "../../kanji-quiz/constants.js";
import { GRADE_LABEL } from "../../kanji-quiz/data.js";
import { formatProblem } from "../logic.js";

export default function QuizScreen({
  answer,
  current,
  feedback,
  grade,
  onAnswerChange,
  onSubmit,
  question,
  submitted,
}) {
  return (
    <form className="kq-card mq-card" onSubmit={onSubmit}>
      <div className="kq-progress">
        {Array.from({ length: TOTAL }, (_, index) => (
          <div
            key={index}
            className={`kq-dot ${
              index < current
                ? "kq-dot-done"
                : index === current
                  ? "kq-dot-current"
                  : "kq-dot-future"
            }`}
          />
        ))}
      </div>
      <div className="kq-qmeta">
        {GRADE_LABEL[grade]}・{current + 1} / {TOTAL} もん
      </div>
      <div className="kq-type">こたえを数字で入れてね</div>
      <div className="mq-problem">{formatProblem(question)}</div>

      <label className="mq-answerLabel" htmlFor="math-answer">
        こたえ
      </label>
      <input
        id="math-answer"
        className="mq-answerInput"
        inputMode="numeric"
        pattern="[0-9]*"
        value={answer}
        onChange={(event) => onAnswerChange(event.target.value.replace(/\D/g, ""))}
        disabled={submitted}
        autoFocus
      />

      {feedback && (
        <div className={`mq-feedback ${feedback.correct ? "mq-correct" : "mq-wrong"}`}>
          {feedback.correct ? "せいかい！" : `ざんねん、こたえは ${feedback.answer}`}
        </div>
      )}

      <button className="kq-retryBtn mq-submitBtn" disabled={submitted || answer === ""}>
        こたえる
      </button>
    </form>
  );
}
