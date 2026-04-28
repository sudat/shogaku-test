import React, { useState } from "react";
import KanjiQuiz from "./components/KanjiQuiz.jsx";
import MathQuiz from "./features/math-quiz/index.js";
import { CSS } from "./features/kanji-quiz/styles.js";

export default function App() {
  const [subject, setSubject] = useState(null);

  return (
    <>
      <style>{CSS}</style>
      {subject === null && (
        <div className="kq-app">
          <SubjectSelect onSubjectSelect={setSubject} />
        </div>
      )}
      {subject === "kanji" && (
        <KanjiQuiz onBackToSubjects={() => setSubject(null)} />
      )}
      {subject === "math" && (
        <div className="kq-app">
          <MathQuiz onBackToSubjects={() => setSubject(null)} />
        </div>
      )}
    </>
  );
}

function SubjectSelect({ onSubjectSelect }) {
  return (
    <div className="sq-panel">
      <span className="kq-logo">🌸</span>
      <div className="kq-title">
        <span className="kq-titleLine kq-titleNames">
          <span className="kq-name-akari">あかり</span>
          <span>と</span>
          <span className="kq-name-toshiharu">としはる</span>
          <span>の</span>
        </span>
        <span className="kq-titleLine">しょうがくテスト</span>
      </div>
      <div className="kq-sub">教科をえらんでね</div>
      <div className="sq-subjects">
        <button className="sq-subjectBtn sq-kanjiBtn" onClick={() => onSubjectSelect("kanji")}>
          <span className="sq-subjectIcon">📖</span>
          <span>かんじ</span>
        </button>
        <button className="sq-subjectBtn sq-mathBtn" onClick={() => onSubjectSelect("math")}>
          <span className="sq-subjectIcon">🧮</span>
          <span>さんすう</span>
        </button>
      </div>
    </div>
  );
}
