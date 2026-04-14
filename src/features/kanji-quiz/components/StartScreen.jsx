import React from "react";
import { MODE_OPTIONS } from "../constants.js";

export default function StartScreen({ grade, onGradeChange, onStartQuiz }) {
  return (
    <div style={{ width: "100%", maxWidth: 300 }}>
      <span className="kq-logo">📖</span>
      <div className="kq-title">
        <span className="kq-titleLine kq-titleNames">
          <span className="kq-name-akari">あかり</span>
          <span>と</span>
          <span className="kq-name-toshiharu">としはる</span>
          <span>の</span>
        </span>
        <span className="kq-titleLine">かんじテスト</span>
      </div>
      <div className="kq-sub">学年をえらんでスタート！</div>

      <div className="kq-grade-row">
        {[1, 2, 3].map((gradeOption) => (
          <button
            key={gradeOption}
            className={`kq-grade-btn${grade === gradeOption ? " active" : ""}`}
            onClick={() => onGradeChange(gradeOption)}
          >
            {gradeOption}年生
          </button>
        ))}
      </div>

      <div className="kq-modes">
        {MODE_OPTIONS.map((mode) => (
          <button
            key={mode.id}
            className={`kq-modeBtn ${mode.className}`}
            onClick={() => onStartQuiz(mode.id)}
          >
            <span className="kq-modeEmoji">{mode.emoji}</span>
            <div>
              <div className="kq-modeName">{mode.label}</div>
              <div className="kq-modeSub">{mode.sub}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
