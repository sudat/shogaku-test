import { TOTAL } from "../kanji-quiz/constants.js";

export function makeMathQuestions(grade) {
  if (grade === 1) {
    return makeQuestionsFromOperators(["+", "-"], 1);
  }

  if (grade === 2) {
    return makeQuestionsFromOperators(makeBalancedOperators(["+", "-", "×"]), 2);
  }

  return makeQuestionsFromOperators(Array.from({ length: TOTAL }, () => "×"), 3);
}

export function getMathResultMessage(score) {
  if (score === TOTAL) {
    return "かんぺき！すごい！";
  }

  if (score >= 8) {
    return "あとすこしでまんてん！";
  }

  if (score >= 6) {
    return "よくがんばったね！";
  }

  return "またチャレンジしよう！";
}

export function formatProblem(question) {
  return `${question.left} ${question.operator} ${question.right} = ?`;
}

function makeQuestionsFromOperators(operators, grade = null) {
  const selectedOperators = operators.length === TOTAL ? operators : fillOperators(operators);
  return shuffle(selectedOperators).map((operator) => makeQuestion(operator, grade));
}

function fillOperators(operators) {
  return Array.from({ length: TOTAL }, (_, index) => operators[index % operators.length]);
}

function makeBalancedOperators(operators) {
  return fillOperators(operators);
}

function makeQuestion(operator, fixedGrade) {
  if (fixedGrade === 3) {
    return makeMultiplicationQuestion(10, 99, 1, 9);
  }

  if (operator === "+") {
    return makeAdditionQuestion(fixedGrade === 1 ? 0 : 10, fixedGrade === 1 ? 9 : 99);
  }

  if (operator === "-") {
    return makeSubtractionQuestion(fixedGrade === 1 ? 0 : 10, fixedGrade === 1 ? 9 : 99);
  }

  return makeMultiplicationQuestion(1, 9, 1, 9);
}

function makeAdditionQuestion(min, max) {
  const left = randomInt(min, max);
  const right = randomInt(min, max);

  return {
    left,
    operator: "+",
    right,
    answer: left + right,
  };
}

function makeSubtractionQuestion(min, max) {
  const a = randomInt(min, max);
  const b = randomInt(min, max);
  const left = Math.max(a, b);
  const right = Math.min(a, b);

  return {
    left,
    operator: "-",
    right,
    answer: left - right,
  };
}

function makeMultiplicationQuestion(leftMin, leftMax, rightMin, rightMax) {
  const left = randomInt(leftMin, leftMax);
  const right = randomInt(rightMin, rightMax);

  return {
    left,
    operator: "×",
    right,
    answer: left * right,
  };
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(items) {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}
