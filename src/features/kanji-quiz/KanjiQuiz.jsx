import React, { useState } from "react";
import { TOTAL } from "./constants.js";
import { GRADE_DATA } from "./data.js";
import { makeQuestions, makeWriteQuestions } from "./logic.js";
import { saveHistory } from "./storage.js";
import { CSS } from "./styles.js";
import ResultScreen from "./components/ResultScreen.jsx";
import QuizScreen from "./components/QuizScreen.jsx";
import StartScreen from "./components/StartScreen.jsx";

export default function KanjiQuiz({ onBackToSubjects }) {
  const [grade, setGrade] = useState(1);
  const [screen, setScreen] = useState("start");
  const [mode, setMode] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  function startQuiz(nextMode) {
    setMode(nextMode);
    setQuestions(
      nextMode === "writing"
        ? makeWriteQuestions(GRADE_DATA[grade])
        : makeQuestions(GRADE_DATA[grade], "both")
    );
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setScreen("quiz");
    setAnimKey((currentKey) => currentKey + 1);
  }

  function handleChoice(choice) {
    if (selected !== null) {
      return;
    }

    setSelected(choice);

    const correct = mode === "writing" ? questions[current].answer : questions[current].reading;
    const isCorrect = choice === correct;
    if (isCorrect) {
      setScore((currentScore) => currentScore + 1);
    }

    setTimeout(() => {
      if (current + 1 >= TOTAL) {
        const newScore = isCorrect ? score + 1 : score;
        saveHistory(grade, mode, newScore);
        setScreen("result");
        return;
      }

      setCurrent((questionIndex) => questionIndex + 1);
      setSelected(null);
      setAnimKey((currentKey) => currentKey + 1);
    }, 1300);
  }

  const question = questions[current];

  return (
    <>
      <style>{CSS}</style>
      <div className="kq-app">
        {screen === "start" && (
          <StartScreen
            grade={grade}
            onBackToSubjects={onBackToSubjects}
            onGradeChange={setGrade}
            onStartQuiz={startQuiz}
          />
        )}

        {screen === "quiz" && question && (
          <QuizScreen
            animKey={animKey}
            current={current}
            grade={grade}
            question={question}
            selected={selected}
            testType={mode}
            onChoiceSelect={handleChoice}
          />
        )}

        {screen === "result" && (
          <ResultScreen
            grade={grade}
            mode={mode}
            score={score}
            onRetry={startQuiz}
            onBack={() => setScreen("start")}
            onBackToSubjects={onBackToSubjects}
          />
        )}
      </div>
    </>
  );
}
