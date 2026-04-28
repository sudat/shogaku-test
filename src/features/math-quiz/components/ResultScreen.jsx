import React from "react";
import { TOTAL } from "../../kanji-quiz/constants.js";
import { GRADE_LABEL } from "../../kanji-quiz/data.js";
import { getHistory } from "../../kanji-quiz/storage.js";
import { getMathResultMessage } from "../logic.js";

export default function ResultScreen({ grade, onBack, onRetry, score }) {
  const history = getHistory(grade, "math");

  return (
    <div className="kq-result">
      <div className="kq-resultTitle">{GRADE_LABEL[grade]}・けっか</div>
      <span className="kq-stars">{score >= 8 ? "⭐⭐⭐" : score >= 6 ? "⭐⭐" : "⭐"}</span>
      <div className="kq-scoreBig">
        {score} / {TOTAL}
      </div>
      <div className="kq-scoreSub">もんせいかい</div>
      <div className="kq-resultMsg">{getMathResultMessage(score)}</div>
      {history.length > 0 && (
        <div className="kq-history">
          <div className="kq-historyLabel">これまでの記録</div>
          <div className="kq-historyList">
            {history.map((historyScore, index) => (
              <span key={`${historyScore}-${index}`} className="kq-historyScore">
                {historyScore}/{TOTAL}
              </span>
            ))}
          </div>
        </div>
      )}
      <button className="kq-retryBtn" onClick={onRetry}>
        もういちど！
      </button>
      <button className="kq-backBtn" onClick={onBack}>
        教科をえらぶ
      </button>
    </div>
  );
}
