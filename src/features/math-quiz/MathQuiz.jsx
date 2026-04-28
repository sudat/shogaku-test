import React, { useState } from "react";
import { TOTAL } from "../kanji-quiz/constants.js";
import { saveHistory } from "../kanji-quiz/storage.js";
import QuizScreen from "./components/QuizScreen.jsx";
import ResultScreen from "./components/ResultScreen.jsx";
import StartScreen from "./components/StartScreen.jsx";
import { makeMathQuestions } from "./logic.js";

export default function MathQuiz({ onBackToSubjects }) {
  const [grade, setGrade] = useState(1);
  const [screen, setScreen] = useState("start");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);

  function startQuiz() {
    setQuestions(makeMathQuestions(grade));
    setCurrent(0);
    setAnswer("");
    setFeedback(null);
    setScore(0);
    setScreen("quiz");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (answer === "" || feedback !== null) {
      return;
    }

    const question = questions[current];
    const isCorrect = Number(answer) === question.answer;
    const nextScore = isCorrect ? score + 1 : score;

    setFeedback({ correct: isCorrect, answer: question.answer });
    setScore(nextScore);

    setTimeout(() => {
      if (current + 1 >= TOTAL) {
        saveHistory(grade, "math", nextScore);
        setScreen("result");
        return;
      }

      setCurrent((questionIndex) => questionIndex + 1);
      setAnswer("");
      setFeedback(null);
    }, 1300);
  }

  const question = questions[current];

  return (
    <>
      {screen === "start" && (
        <StartScreen
          grade={grade}
          onBack={onBackToSubjects}
          onGradeChange={setGrade}
          onStart={startQuiz}
        />
      )}

      {screen === "quiz" && question && (
        <QuizScreen
          answer={answer}
          current={current}
          feedback={feedback}
          grade={grade}
          onAnswerChange={setAnswer}
          onSubmit={handleSubmit}
          question={question}
          submitted={feedback !== null}
        />
      )}

      {screen === "result" && (
        <ResultScreen
          grade={grade}
          score={score}
          onRetry={startQuiz}
          onBack={onBackToSubjects}
        />
      )}
    </>
  );
}
