const MAX_HISTORY = 10

function makeKey(grade, testType) {
  return `shogaku-history-${grade}-${testType}`
}

function saveHistory(grade, testType, score) {
  try {
    const key = makeKey(grade, testType)
    const raw = localStorage.getItem(key)
    let history = []
    if (raw) {
      try {
        history = JSON.parse(raw)
      } catch (e) {
        history = []
      }
    }
    history.push(score)
    history = history.slice(-MAX_HISTORY)
    localStorage.setItem(key, JSON.stringify(history))
  } catch (e) {
  }
}

function getHistory(grade, testType) {
  try {
    const key = makeKey(grade, testType)
    const raw = localStorage.getItem(key)
    if (!raw) return []
    try {
      return JSON.parse(raw)
    } catch (e) {
      return []
    }
  } catch (e) {
    return []
  }
}

export { saveHistory, getHistory }
