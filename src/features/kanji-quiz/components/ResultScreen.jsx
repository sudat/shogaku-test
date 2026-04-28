import React from "react";
import { TOTAL } from "../constants.js";
import { GRADE_LABEL } from "../data.js";
import { getResultMessage, getStars } from "../logic.js";
import { getHistory } from "../storage.js";

export default function ResultScreen({ grade, mode, score, onRetry, onBack, onBackToSubjects }) {
  const history = getHistory(grade, mode);

  return (
    <div className="kq-result">
      <div className="kq-resultTitle">{GRADE_LABEL[grade]}・けっか</div>
      <span className="kq-stars">{getStars(score)}</span>
      <div className="kq-scoreBig">
        {score} / {TOTAL}
      </div>
      <div className="kq-scoreSub">もんせいかい</div>
      <div className="kq-resultMsg">{getResultMessage(score)}</div>
      {history.length > 0 && (
        <div className="kq-history">
          <div className="kq-historyLabel">これまでの記録</div>
          <div className="kq-historyList">
            {history.map((s) => (
              <span key={s} className="kq-historyScore">{s}/{TOTAL}</span>
            ))}
          </div>
        </div>
      )}
      <button className="kq-retryBtn" onClick={() => onRetry(mode)}>
        もういちど！
      </button>
      <button className="kq-backBtn" onClick={onBack}>
        モードをえらぶ
      </button>
      {onBackToSubjects && (
        <button className="kq-backBtn mq-resultSubjectBack" onClick={onBackToSubjects}>
          教科をえらぶ
        </button>
      )}
    </div>
  );
}
