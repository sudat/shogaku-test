import React from "react";
import { CHOICE_COLORS, SHADOW_COLORS, TOTAL } from "../constants.js";
import { GRADE_LABEL } from "../data.js";
import { getKanjiFontSize } from "../logic.js";

function getChoiceState(choice, selected, correctReading) {
  if (selected === null) {
    return "";
  }

  if (choice === correctReading) {
    return "kq-reveal";
  }

  if (choice === selected) {
    return "kq-wrong";
  }

  return "kq-dim";
}

export default function QuizScreen({
  animKey,
  current,
  grade,
  question,
  selected,
  onChoiceSelect,
}) {
  return (
    <div className="kq-card" key={animKey}>
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
      <div className="kq-type">この漢字の{question.type}は？</div>
      <div className="kq-kanji" style={{ fontSize: getKanjiFontSize(question.displayK) }}>
        {question.displayK}
      </div>
      <div className="kq-choices">
        {question.choices.map((choice, index) => {
          const choiceState = getChoiceState(choice, selected, question.reading);

          return (
            <button
              key={`${choice}${index}`}
              className={`kq-choice ${choiceState}`}
              style={{
                background: CHOICE_COLORS[index],
                boxShadow: `0 5px 0 ${SHADOW_COLORS[index]}`,
              }}
              onClick={() => onChoiceSelect(choice)}
              disabled={selected !== null}
            >
              {selected !== null && choice === question.reading && (
                <span className="kq-icon">✅</span>
              )}
              {selected !== null && choice === selected && choice !== question.reading && (
                <span className="kq-icon">❌</span>
              )}
              {choice}
            </button>
          );
        })}
      </div>
    </div>
  );
}
