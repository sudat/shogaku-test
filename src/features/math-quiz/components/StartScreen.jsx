import React from "react";

export default function StartScreen({ grade, onBack, onGradeChange, onStart }) {
  return (
    <div style={{ width: "100%", maxWidth: 320 }}>
      <span className="kq-logo">🧮</span>
      <div className="kq-title">
        <span className="kq-titleLine kq-titleNames">
          <span className="kq-name-akari">あかり</span>
          <span>と</span>
          <span className="kq-name-toshiharu">としはる</span>
          <span>の</span>
        </span>
        <span className="kq-titleLine">さんすうテスト</span>
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

      <button className="kq-modeBtn mq-startBtn" onClick={onStart}>
        <span className="kq-modeEmoji">✏️</span>
        <span className="kq-modeName">スタート</span>
      </button>
      <button className="kq-backBtn mq-subjectBack" onClick={onBack}>
        教科をえらぶ
      </button>
    </div>
  );
}
