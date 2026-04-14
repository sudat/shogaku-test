import React from "react";
import { TOTAL } from "../constants.js";
import { GRADE_LABEL } from "../data.js";
import { getResultMessage, getStars } from "../logic.js";

export default function ResultScreen({ grade, mode, score, onRetry, onBack }) {
  return (
    <div className="kq-result">
      <div className="kq-resultTitle">{GRADE_LABEL[grade]}・けっか</div>
      <span className="kq-stars">{getStars(score)}</span>
      <div className="kq-scoreBig">
        {score} / {TOTAL}
      </div>
      <div className="kq-scoreSub">もんせいかい</div>
      <div className="kq-resultMsg">{getResultMessage(score)}</div>
      <button className="kq-retryBtn" onClick={() => onRetry(mode)}>
        もういちど！
      </button>
      <button className="kq-backBtn" onClick={onBack}>
        モードをえらぶ
      </button>
    </div>
  );
}
