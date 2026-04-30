# Learnings

## 2026-04-14 Plan Context
- App: React SPA with Vite, no external state management
- Files under src/features/kanji-quiz/ (actual code) + re-exports at src/lib/, src/components/
- Data: { k: kanji, on: reading|null, kun: { s: stem, o: okurigana }|null }
- Existing tests: 5 passing (3 in quiz.test.js, 2 in KanjiQuiz.test.jsx)
- Kanji with shared readings exist (G1: 下/火/花 all read "か") - MUST exclude from writing test distractors
- Code style: no semicolons, single quotes, 2-space indent, function declarations
