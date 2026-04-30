# 漢字テスト改修：読み/書きモード＋学習履歴

## TL;DR

> **Quick Summary**: 漢字テストアプリのモードを「読み」「書き」の2本に整理し、新しく「書きテスト（ひらがな→漢字4択）」を追加。localStorageで直近10回の点数を保存・表示する。
> 
> **Deliverables**:
> - スタート画面：📖読み / ✍️書き の横2ボタン
> - 読みテスト：従来のミックスモード（漢字→読み4択）
> - 書きテスト：新規追加（ひらがな→漢字4択）
> - 結果画面に直近10回の学習履歴表示
> - localStorage保存ユーティリティ
> 
> **Estimated Effort**: Medium
> **Parallel Execution**: YES - 3 waves
> **Critical Path**: Task 1 (logic) → Task 3 (KanjiQuiz統合) → Task 4 (履歴統合)

---

## Context

### Original Request
ユーザー発言：「今の漢字テストは音読み、訓読み、ミックスに分類してるけど全部読みのテスト。ミックスだけでよい。『読み（よみ）のテスト』って表記で。そのうえで『書き（かき）のテスト』を追加したい。問題文は『わるい』で回答候補は『悪』『XX』『YY』『ZZ』。実際に書くのは大変だから当てる感じ。あとlocalStorageで直近10回の点数を履歴として残したい。」

### Interview Summary
**Key Discussions**:
- モード整理：音/訓/ミックス3モード → 「読み」「書き」2モードに
- 書きテスト仕様：ひらがな表示→漢字4択、ダミーは同学年からランダム、同じ読みの漢字はダミーに含めない
- 学習履歴：学年×テスト種別ごと、直近10回のみ、点数一覧のみ表示
- スタート画面：横2ボタンレイアウト

**Research Findings**:
- 既存テスト5個あり（vitest + testing-library）、モード名変更で壊れるので更新必須
- 同じ読みを持つ漢字が多数存在（例：1年生「か」→ 下/火/花）。書きテストのダミー生成で必ず排除する必要あり
- ひらがなの長い読み（「あたたかい」5文字等）はフォントサイズ調整が必要

### Metis Review
**Identified Gaps** (addressed):
- 同読み漢字のダミー混入リスク → 排除ロジック必須
- ひらがな表示用フォントサイズ関数が必要 → 別関数追加
- 既存テスト5個がモード変更で壊れる → 更新タスクに含める
- 書きテストでも1漢字につき最大1問に制限 → プール肥大化防止
- localStorage無効環境でのグレースフルデグラデーション → try/catch必須

---

## Work Objectives

### Core Objective
漢字テストアプリに「読み」「書き」の2モード体制を確立し、学習履歴を表示できるようにする。

### Concrete Deliverables
- `src/features/kanji-quiz/logic.js`: `makeWriteQuestions()` 追加、`getReadingFontSize()` 追加
- `src/features/kanji-quiz/storage.js`: 新規ファイル（localStorage ユーティリティ）
- `src/features/kanji-quiz/constants.js`: MODE_OPTIONS を2つに変更
- `src/features/kanji-quiz/components/StartScreen.jsx`: 横2ボタンレイアウト
- `src/features/kanji-quiz/components/QuizScreen.jsx`: 書きテスト対応
- `src/features/kanji-quiz/components/ResultScreen.jsx`: 学習履歴表示
- `src/features/kanji-quiz/KanjiQuiz.jsx`: 書きモード対応、履歴保存
- `src/features/kanji-quiz/styles.js`: 新スタイル追加
- `src/lib/quiz.test.js`: テスト更新
- `src/components/KanjiQuiz.test.jsx`: テスト更新

### Definition of Done
- [x] `bun run test` → 全テストPASS
- [x] `bun run build` → ビルド成功
- [x] 読みテスト：漢字表示→読み4択（従来通り動作）
- [x] 書きテスト：ひらがな表示→漢字4択（新規動作）
- [x] 結果画面に直近10回の履歴表示
- [x] ページリロード後も履歴が残っている

### Must Have
- 書きテストで同読み漢字がダミーに入らないこと
- localStorage無効環境でもアプリ自体は動作すること
- 既存テストがすべてPASSすること

### Must NOT Have (Guardrails)
- data.js の漢字データ構造を変更しない
- 新しいnpmパッケージを追加しない
- 最高点、連続記録、分析などの余分な統計機能を追加しない
- 音効、アニメーション追加、共有ボタンなどのスコープクリープ
- adaptive難易度、不正解レビュー機能は追加しない
- CSSのカラースキーム・グラデーションは変更しない（拡張のみ）
- main.jsx, App.jsx, index.html は触らない
- 学年セレクターの動作は変更しない

---

## Verification Strategy (MANDATORY)

> **ZERO HUMAN INTERVENTION** - ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: YES (vitest + testing-library/react)
- **Automated tests**: YES (Tests-after)
- **Framework**: vitest
- **Test command**: `bun run test`

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Use Playwright - Navigate, interact, assert DOM, screenshot
- **Logic/Module**: Use Bash (`bun run test`) - Run tests, assert pass/fail
- **Build**: Use Bash (`bun run build`) - Verify no errors

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately - foundation):
├── Task 1: 書きテスト問題生成ロジック [unspecified-high]
├── Task 2: localStorageユーティリティ [quick]
└── Task 3: 定数・スタート画面リファクタ [quick]

Wave 2 (After Wave 1 - integration):
├── Task 4: QuizScreen書きテスト対応 [unspecified-high]
└── Task 5: KanjiQuiz統合（書きモード＋履歴保存） [unspecified-high]

Wave 3 (After Wave 2 - result + tests):
├── Task 6: ResultScreen学習履歴表示 [visual-engineering]
└── Task 7: テスト更新 [quick]

Wave FINAL (After ALL tasks — parallel reviews):
├── F1: Plan compliance audit [oracle]
├── F2: Code quality review [unspecified-high]
├── F3: Real manual QA [unspecified-high]
└── F4: Scope fidelity check [deep]

Critical Path: Task 1 → Task 4 → Task 5 → Task 6 → F1-F4
Parallel Speedup: Wave 1 runs 3 tasks in parallel
Max Concurrent: 3 (Wave 1)
```

### Dependency Matrix

| Task | Depends On | Blocks |
|------|-----------|--------|
| 1 | - | 4, 5 |
| 2 | - | 5, 6 |
| 3 | - | 4, 5, 7 |
| 4 | 1, 3 | 5 |
| 5 | 1, 2, 3, 4 | 6 |
| 6 | 2, 5 | F1-F4 |
| 7 | 3, 5 | F1-F4 |

### Agent Dispatch Summary

- **Wave 1**: **3** - T1 → `unspecified-high`, T2 → `quick`, T3 → `quick`
- **Wave 2**: **2** - T4 → `unspecified-high`, T5 → `unspecified-high`
- **Wave 3**: **2** - T6 → `visual-engineering`, T7 → `quick`
- **FINAL**: **4** - F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

- [x] 1. 書きテスト問題生成ロジック追加

  **What to do**:
  - `src/features/kanji-quiz/logic.js` に `makeWriteQuestions(data)` を追加
  - プール生成：各漢字について、音読み or 訓読みをランダムに1つ選び1問生成（1漢字最大1問）
  - 問題オブジェクト：`{ display: "わるい"（ひらがな）, answer: "悪", k: "悪", choices: ["悪", "春", "楽", "進"] }`
  - ダミー生成：同学年の他の漢字から選ぶが、**表示する読みと同じ読みを持つ漢字は除外**（複数正解を防ぐ）
  - 除外ロジック：ダミー候補の漢字の音読み・訓読みのすべてが、問題の `display` と異なることを確認
  - `getReadingFontSize(text)` を追加：ひらがな文字列用のフォントサイズ（1-2文字→大、3-4文字→中、5文字以上→小）
  - 既存の `makeQuestions()` は変更しない

  **Must NOT do**:
  - data.js の構造を変更しない
  - 既存の `makeQuestions()` を壊さない
  - 過度な抽象化をしない（`makeWriteQuestions` は独立関数でOK）

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 書きテストのダミー生成ロジックに同読み排除の注意が必要。中高度のロジック実装
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `supabase-postgres-best-practices`: DB使わないので不要

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3)
  - **Blocks**: Tasks 4, 5
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References** (existing code to follow):
  - `src/features/kanji-quiz/logic.js:14-62` - 既存の `makeQuestions()` の全体パターン。シャッフル→重複排除→ダミー生成の流れを踏襲する
  - `src/features/kanji-quiz/logic.js:48-61` - ダミー生成パターン。現在は読みで重複排除しているが、書きでは漢字の読みが一致するものを除外する必要あり
  - `src/features/kanji-quiz/logic.js:92-102` - `getKanjiFontSize()` のパターン。文字数→フォントサイズのマッピング。ひらがな用も同様のパターンで

  **API/Type References**:
  - `src/features/kanji-quiz/data.js:4-5` - 漢字データ構造 `{ k: "一", on: "いち", kun: { s: "ひとつ", o: "" } }`。on=null, kun=null のケースあり（`data.js:9` 王, `data.js:14` 貝 等）
  - `src/features/kanji-quiz/data.js:310` - `kun: { s: "さら", o: "" }` のように kun.o が空文字のケース。display は `kun.s + kun.o` で統一

  **Test References**:
  - `src/lib/quiz.test.js` - 既存テスト3個。`makeQuestions` のモード別動作を検証。`makeWriteQuestions` も同様の構造でテスト追加する

  **WHY Each Reference Matters**:
  - `logic.js:14-62`: makeWriteQuestions の全体構造（シャッフル→選択→ダミー生成）のテンプレート
  - `logic.js:48-61`: ダミー生成のロジック。書きテストでは読みが一致する漢字を除外する必要があるから、ここのフィルター条件が最重要
  - `data.js` の null ケース: on=null や kun=null の漢字ではその読みの問題を生成できない。プール生成時の null チェック必須

  **Acceptance Criteria**:

  - [ ] `makeWriteQuestions(G1)` がちょうど10問の配列を返す
  - [ ] 各問題に `display`（ひらがな）, `answer`（漢字1文字）, `choices`（4つの漢字配列）が含まれる
  - [ ] 正解の漢字が必ず choices に含まれる
  - [ ] choices 内に同じ読みを持つ他の漢字が含まれていない（例：「か」→ 下が正解なら火・花はダミーに入らない）
  - [ ] on=null の漢字は音読み問題を生成しない
  - [ ] kun=null の漢字は訓読み問題を生成しない
  - [ ] `bun run test` → 全テストPASS

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: 書きテスト問題生成 - 正常系
    Tool: Bash (bun run test)
    Preconditions: data.js (G1-G3) が存在
    Steps:
      1. `bun run test src/lib/quiz.test.js` を実行
      2. makeWriteQuestions のテスト結果を確認
    Expected Result: 全テストPASS。10問生成、choices 4つ、正解含む
    Failure Indicators: テストFAIL、choices が4つ未満、正解がchoicesにない
    Evidence: .sisyphus/evidence/task-1-write-logic-pass.txt

  Scenario: 書きテスト - 同読み漢字がダミーに含まれない
    Tool: Bash (bun run test)
    Preconditions: G1の「か」読みを持つ漢字（下/火/花）が存在
    Steps:
      1. makeWriteQuestions(G1) を100回実行して全問題を収集
      2. 各問題で、ダミー漢字の読み（on/kun）が display と異なることを確認
    Expected Result: 全ダミーの読みが display と異なる
    Failure Indicators: いずれかのダミーが同じ読みを持つ
    Evidence: .sisyphus/evidence/task-1-no-shared-reading.txt
  ```

  **Commit**: YES
  - Message: `feat(kanji-quiz): add writing test question generation logic`
  - Files: `src/features/kanji-quiz/logic.js`

- [x] 2. localStorage学習履歴ユーティリティ作成

  **What to do**:
  - `src/features/kanji-quiz/storage.js` を新規作成
  - `saveHistory(grade, testType, score)`: 学年×テスト種別の履歴に点数を追加。直近10件まで保存。11件目以降は最古を削除
  - `getHistory(grade, testType)`: 直近10回の点数配列を返す（最新が最後）
  - `makeKey(grade, testType)`: 内部関数。キー形式 `shogaku-history-{grade}-{testType}`
  - localStorage アクセスは try/catch で囲み、エラー時はサイレントにフェイル（アプリは動き続ける）
  - testType は "reading" | "writing" の文字列

  **Must NOT do**:
  - 暗号化、圧縮、その他の過剰な処理を追加しない
  - localStorage 以外のストレージ（IndexedDB等）を検討しない
  - エクスポート/インポート機能を追加しない

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 純粋なユーティリティ関数3つ。ロジックは単純
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3)
  - **Blocks**: Tasks 5, 6
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References**:
  - なし（新規ファイル）。既存コードスタイルに合わせる：no semicolons, single quotes, 2-space indent, `function` 宣言

  **API/Type References**:
  - `src/features/kanji-quiz/constants.js:1` - TOTAL = 10。履歴の最大保存数も10で統一
  - localStorage キー例：`shogaku-history-1-reading`, `shogaku-history-3-writing`

  **WHY Each Reference Matters**:
  - 定数 TOTAL との整合性。保存数は TOTAL とは独立して 10 件

  **Acceptance Criteria**:

  - [ ] `saveHistory(1, "reading", 7)` → localStorage に保存される
  - [ ] `getHistory(1, "reading")` → `[7]` を返す
  - [ ] 11件保存すると最初の1件が消える
  - [ ] localStorage 無効環境でもエラーで落ちない（try/catch）
  - [ ] `bun run test` → 全テストPASS

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: 履歴保存・取得の正常系
    Tool: Bash (bun run test)
    Preconditions: なし
    Steps:
      1. saveHistory(1, "reading", 7) を実行
      2. saveHistory(1, "reading", 9) を実行
      3. getHistory(1, "reading") を確認
    Expected Result: [7, 9] が返る
    Evidence: .sisyphus/evidence/task-2-storage-basic.txt

  Scenario: 11件目で最古が削除される
    Tool: Bash (bun run test)
    Preconditions: 10件の履歴が既にある
    Steps:
      1. 既存10件 + 1件保存
      2. getHistory で件数確認
    Expected Result: 常に10件以下。最初のスコアが消えている
    Evidence: .sisyphus/evidence/task-2-storage-overflow.txt
  ```

  **Commit**: YES
  - Message: `feat(kanji-quiz): add localStorage history utility`
  - Files: `src/features/kanji-quiz/storage.js` (new)

- [x] 3. 定数・スタート画面リファクタ

  **What to do**:
  - `src/features/kanji-quiz/constants.js` の MODE_OPTIONS を2つに変更：
    - `{ id: "reading", label: "読み（よみ）", sub: "音読み＋訓読み", emoji: "📖", className: "kq-modeBtn-reading" }`
    - `{ id: "writing", label: "書き（かき）", sub: "漢字をえらぶ", emoji: "✍️", className: "kq-modeBtn-writing" }`
  - `src/features/kanji-quiz/components/StartScreen.jsx` を横2ボタンレイアウトに変更：
    - 現在の縦並び（`kq-modes` flex-direction: column）を横並びに変更
    - ボタン内レイアウトは簡素化（emoji + label + sub は維持）
  - `src/features/kanji-quiz/styles.js` の `.kq-modes` を横並びに更新：
    - `flex-direction: row`、gap調整、ボタン幅調整
  - 新しいボタンカラー：
    - 読み：紫系（既存のbothカラー `#A855F7/#8B3FE0` を流用）
    - 書き：緑系（既存のkunカラー `#34B89A/#20967D` を流用）

  **Must NOT do**:
  - 学年セレクター（1-3年生ボタン）は変更しない
  - 全体のカラースキーム・グラデーション背景は変更しない
  - アプリタイトル・ロゴは変更しない

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 定数書き換え + CSS微調整。シンプル
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2)
  - **Blocks**: Tasks 4, 5, 7
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References**:
  - `src/features/kanji-quiz/constants.js:6-28` - 現在の MODE_OPTIONS 定義。id/label/sub/className/emoji 構造を踏襲
  - `src/features/kanji-quiz/components/StartScreen.jsx:31-45` - MODE_OPTIONS を map してボタン描画。構造はそのまま流用
  - `src/features/kanji-quiz/styles.js:39-52` - `.kq-modes` と `.kq-modeBtn` のスタイル。flex-direction を row にするだけで横並びになる

  **WHY Each Reference Matters**:
  - constants.js: モード定義の構造を変えずに中身だけ2つにする
  - StartScreen.jsx: 描画ロジックは map のまま、データが変わるだけでOK
  - styles.js: CSS の変更点は `flex-direction: row` とボタン幅の調整のみ

  **Acceptance Criteria**:

  - [ ] MODE_OPTIONS.length === 2
  - [ ] MODE_OPTIONS[0].id === "reading", MODE_OPTIONS[1].id === "writing"
  - [ ] スタート画面にボタンが横並びで2つ表示される
  - [ ] 📖 と ✍️ の絵文字が表示される
  - [ ] 学年セレクター（1-3年生）は変更なし

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: スタート画面の横2ボタン表示
    Tool: Playwright
    Preconditions: dev server 起動済み
    Steps:
      1. http://localhost:5173 にアクセス
      2. スタート画面のボタン要素を取得
      3. ボタン数が2つであることを確認
      4. 1つ目に「読み（よみ）」が含まれることを確認
      5. 2つ目に「書き（かき）」が含まれることを確認
      6. ボタンが横並びであることをCSS確認（flex-direction: row）
    Expected Result: 2つのボタンが横並びで表示
    Failure Indicators: ボタンが3つ以上、縦並び、テキスト不一致
    Evidence: .sisyphus/evidence/task-3-start-screen.png

  Scenario: 学年セレクターが変更されていない
    Tool: Playwright
    Preconditions: dev server 起動済み
    Steps:
      1. スタート画面で学年ボタンを確認
      2. 「1年生」「2年生」「3年生」の3つが存在
      3. クリックで切り替えられる
    Expected Result: 学年セレクターは従来通り3ボタン
    Evidence: .sisyphus/evidence/task-3-grade-selector.png
  ```

  **Commit**: YES
  - Message: `refactor(kanji-quiz): consolidate modes to reading/writing`
  - Files: `src/features/kanji-quiz/constants.js`, `src/features/kanji-quiz/components/StartScreen.jsx`, `src/features/kanji-quiz/styles.js`

- [x] 4. QuizScreen書きテスト対応

  **What to do**:
  - `src/features/kanji-quiz/components/QuizScreen.jsx` を書きテストに対応
  - `testType` prop を追加（"reading" | "writing"）
  - 読みテスト時：従来通り「この漢字の{type}は？」+ 漢字表示 + 読み4択
  - 書きテスト時：「この漢字はどれ？」+ ひらがな表示 + 漢字4択
  - 書きテストの正解判定：`question.answer`（漢字）と選択を比較
  - 書きテストのフォントサイズ：`getReadingFontSize(question.display)` を使用
  - 書きテストの選択肢スタイル：漢字1文字が大きく表示されるように

  **Must NOT do**:
  - 読みテストの見た目・動作を変更しない
  - QuizScreenを2つのコンポーネントに分割しない（条件分岐で対応）

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 既存コンポーネントの拡張。条件分岐の追加とテストタイプ判定の注意が必要
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 5
  - **Blocked By**: Tasks 1, 3

  **References**:

  **Pattern References**:
  - `src/features/kanji-quiz/components/QuizScreen.jsx:1-81` - 既存のQuizScreen全体。testType で条件分岐を追加する土台
  - `src/features/kanji-quiz/components/QuizScreen.jsx:49` - `question.type` によるラベル表示。書きテストでは「この漢字はどれ？」に差し替え
  - `src/features/kanji-quiz/components/QuizScreen.jsx:50-52` - `question.displayK` による漢字表示。書きテストでは `question.display`（ひらがな）に差し替え
  - `src/features/kanji-quiz/components/QuizScreen.jsx:6-20` - `getChoiceState` の正解判定。書きテストでは `question.reading` ではなく `question.answer` と比較

  **API/Type References**:
  - 読みテストの問題形状：`{ k, reading, displayK, type, choices }`
  - 書きテストの問題形状（Task 1で定義）：`{ display, answer, k, choices }`

  **WHY Each Reference Matters**:
  - QuizScreenの全行がリファレンス。条件分岐の追加ポイントを把握するため
  - 正解判定ロジックの違い：読みは `reading`、書きは `answer` で比較する必要あり

  **Acceptance Criteria**:

  - [ ] 読みテスト：従来通り「この漢字のおんよみ/くんよみは？」表示
  - [ ] 書きテスト：「この漢字はどれ？」+ ひらがな表示 + 漢字4択
  - [ ] 正解/不正解の判定が両モードで正しい
  - [ ] ✅ ❌ アイコン表示が両モードで動作する
  - [ ] `bun run test` → PASS

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: 書きテスト画面表示
    Tool: Playwright
    Preconditions: dev server起動、書きテスト開始済み
    Steps:
      1. スタート画面で1年生選択 → ✍️書きボタンクリック
      2. 問題画面のテキスト確認
      3. 「この漢字はどれ？」が表示されている
      4. ひらがなの読みが大きく表示されている
      5. 4つの漢字選択肢が表示されている
    Expected Result: ひらがな表示 + 漢字4択の画面
    Failure Indicators: 漢字が大きく表示されている（読みテストと同じ）、選択肢がひらがな
    Evidence: .sisyphus/evidence/task-4-writing-screen.png

  Scenario: 読みテスト画面が従来通り
    Tool: Playwright
    Preconditions: dev server起動
    Steps:
      1. スタート画面で1年生選択 → 📖読みボタンクリック
      2. 問題画面のテキスト確認
      3. 「この漢字の○○よみは？」が表示されている
      4. 漢字が大きく表示されている
      5. 4つのひらがな選択肢が表示されている
    Expected Result: 従来通りの読みテスト画面
    Failure Indicators: レイアウト崩れ、テキスト変更
    Evidence: .sisyphus/evidence/task-4-reading-screen-unchanged.png
  ```

  **Commit**: YES
  - Message: `feat(kanji-quiz): support writing test in quiz screen`
  - Files: `src/features/kanji-quiz/components/QuizScreen.jsx`, `src/features/kanji-quiz/styles.js`

- [x] 5. KanjiQuiz統合（書きモード＋履歴保存）

  **What to do**:
  - `src/features/kanji-quiz/KanjiQuiz.jsx` を更新
  - `startQuiz(mode)` で mode === "writing" の場合、`makeWriteQuestions()` を呼ぶ
  - mode === "reading" の場合、`makeQuestions()` を呼ぶ（従来通り "both" 相当）
  - `handleChoice` で正解判定：
    - 読みテスト：`choice === questions[current].reading`
    - 書きテスト：`choice === questions[current].answer`
  - テスト完了時（画面遷移 to "result"）に `saveHistory(grade, mode, score)` を呼ぶ
  - ResultScreen に `mode` と `grade` を渡す（履歴取得用）

  **Must NOT do**:
  - state構造を大幅に変更しない
  - 画面遷移ロジックを変えない

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: アプリのステート管理の中核。分岐ミスがテスト全体に影響する
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2 (sequential after Task 4)
  - **Blocks**: Tasks 6, 7
  - **Blocked By**: Tasks 1, 2, 3, 4

  **References**:

  **Pattern References**:
  - `src/features/kanji-quiz/KanjiQuiz.jsx:20-28` - `startQuiz` 関数。mode で分岐を追加する場所
  - `src/features/kanji-quiz/KanjiQuiz.jsx:30-51` - `handleChoice` 関数。正解判定を mode で分岐
  - `src/features/kanji-quiz/KanjiQuiz.jsx:41-44` - 結果画面遷移。ここで `saveHistory` を呼ぶ

  **API/Type References**:
  - `src/features/kanji-quiz/storage.js` - `saveHistory(grade, testType, score)`, `getHistory(grade, testType)` (Task 2で作成)
  - `src/features/kanji-quiz/logic.js` - `makeWriteQuestions(data)` (Task 1で作成)

  **WHY Each Reference Matters**:
  - KanjiQuiz.jsx: アプリ全体のステート管理。startQuiz と handleChoice の2箇所が主な変更点
  - storage.js: 履歴保存のタイミングは結果画面遷移直前が適切

  **Acceptance Criteria**:

  - [ ] 読みモード開始で `makeQuestions()` が呼ばれる
  - [ ] 書きモード開始で `makeWriteQuestions()` が呼ばれる
  - [ ] 両モードで正解/不正解のスコアカウントが正しい
  - [ ] テスト完了時に localStorage にスコアが保存される
  - [ ] `bun run test` → PASS

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: 書きテストフルフロー
    Tool: Playwright
    Preconditions: dev server起動
    Steps:
      1. 1年生選択 → ✍️書きボタンクリック
      2. 問題が10問表示される（ひらがな→漢字4択）
      3. 全問適当に回答
      4. 結果画面に遷移
      5. 点数が表示される
    Expected Result: 書きテストが最後まで完走する
    Failure Indicators: エラーで落ちる、画面が遷移しない
    Evidence: .sisyphus/evidence/task-5-writing-full-flow.png

  Scenario: 履歴がlocalStorageに保存される
    Tool: Playwright
    Preconditions: dev server起動、履歴なし状態
    Steps:
      1. 1年生 → 📖読み → 全問回答 → 結果画面
      2. ブラウザのlocalStorageを確認
      3. `shogaku-history-1-reading` キーが存在
      4. 値が [score] のJSON配列
    Expected Result: localStorage にスコアが1件保存されている
    Failure Indicators: キーが存在しない、値が配列ではない
    Evidence: .sisyphus/evidence/task-5-localstorage-save.txt
  ```

  **Commit**: YES
  - Message: `feat(kanji-quiz): integrate writing mode and history save`
  - Files: `src/features/kanji-quiz/KanjiQuiz.jsx`

- [x] 6. ResultScreen学習履歴表示

  **What to do**:
  - `src/features/kanji-quiz/components/ResultScreen.jsx` に学習履歴セクションを追加
  - `getHistory(grade, mode)` で直近10回の点数を取得
  - 点数一覧をシンプルに表示（例：「7/10」「9/10」「6/10」...）
  - 履歴なしの場合は何も表示しない（空状態メッセージもなし）
  - スタイル追加（`styles.js`）：履歴セクション用のCSS。既存のカードデザインに馴染むよう控えめに

  **Must NOT do**:
  - 最高点、合計回数、前回差分などの統計は表示しない
  - グラフ・チャートを追加しない
  - 履歴削除ボタンを追加しない

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: 既存UIに馴染む履歴セクションのデザイン・スタイリングが必要
  - **Skills**: [`design-principles`]
    - `design-principles`: 子ども向けUIのトーン＆マナーを維持するため

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (after Task 5)
  - **Blocks**: F1-F4
  - **Blocked By**: Tasks 2, 5

  **References**:

  **Pattern References**:
  - `src/features/kanji-quiz/components/ResultScreen.jsx:1-24` - 現在のResultScreen全体。履歴セクションを追加する土台
  - `src/features/kanji-quiz/styles.js:95-117` - `.kq-result` と関連スタイル。同じトーンで履歴セクションを追加

  **API/Type References**:
  - `src/features/kanji-quiz/storage.js` - `getHistory(grade, testType)` (Task 2で作成)。int配列を返す

  **WHY Each Reference Matters**:
  - ResultScreen: 「もういちど」「モードをえらぶ」ボタンの下に履歴セクションを追加
  - styles.js: 既存の `.kq-result` のボーダーラディウス、シャドウ、フォントに統一感を持たせる

  **Acceptance Criteria**:

  - [ ] 履歴あり：直近10回の点数が一覧表示される
  - [ ] 履歴なし：履歴セクションが表示されない
  - [ ] 最新のスコアが一番下（または一番上）に表示される
  - [ ] `bun run test` → PASS

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: 結果画面に履歴が表示される
    Tool: Playwright
    Preconditions: dev server起動、履歴2回分あり
    Steps:
      1. 1年生 → 📖読み → 全問回答 → 結果画面
      2. 履歴セクションの存在確認
      3. 3件（前回2件＋今回）のスコアが表示されている
    Expected Result: スコア一覧が3件表示
    Failure Indicators: 履歴セクションがない、件数が違う
    Evidence: .sisyphus/evidence/task-6-history-display.png

  Scenario: 履歴なしの場合は何も表示されない
    Tool: Playwright
    Preconditions: dev server起動、localStorage cleared
    Steps:
      1. localStorage をクリア
      2. 1年生 → ✍️書き → 全問回答 → 結果画面
      3. 履歴セクションの確認
    Expected Result: 今回のスコアのみ表示（または今回を含めて1件のみ）
    Failure Indicators: 空の履歴エリアが表示される、「まだ履歴がありません」等のメッセージ
    Evidence: .sisyphus/evidence/task-6-no-history.png
  ```

  **Commit**: YES
  - Message: `feat(kanji-quiz): show learning history on result screen`
  - Files: `src/features/kanji-quiz/components/ResultScreen.jsx`, `src/features/kanji-quiz/styles.js`

- [x] 7. テスト更新

  **What to do**:
  - `src/lib/quiz.test.js` を更新：
    - 既存の `makeQuestions` テストのモード名を更新（"on"/"kun"/"both" → "reading" に対応）
    - `makeWriteQuestions` のテストを追加（10問生成、choices検証、同読み排除検証）
  - `src/components/KanjiQuiz.test.jsx` を更新：
    - ボタンラベルのアサーションを更新（「おんよみ」等 → 「読み（よみ）」等）
    - ボタン数のアサーション：3 → 2

  **Must NOT do**:
  - テストフレームワークを追加・変更しない
  - テストの書き方（describe/it/expect構造）を変えない

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 既存テストの微修正 + 新テスト追加。ロジックは明確
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (with Task 6)
  - **Blocks**: F1-F4
  - **Blocked By**: Tasks 3, 5

  **References**:

  **Test References**:
  - `src/lib/quiz.test.js` - 既存3テスト。makeQuestions の on/kun/both モード検証。"both" モードのみ残るので、関連アサーションを更新
  - `src/components/KanjiQuiz.test.jsx` - 既存2テスト。MODE_OPTIONS の表示検証。ボタン数3→2、ラベル変更

  **WHY Each Reference Matters**:
  - quiz.test.js: モード名変更で既存テストがFAILになるので、対応必須
  - KanjiQuiz.test.jsx: ボタン数とラベルのアサーションが 3→2 で変わる

  **Acceptance Criteria**:

  - [ ] `bun run test` → 全テストPASS
  - [ ] `makeWriteQuestions` のテストが追加されている
  - [ ] 既存テストが新しいモード構造に対応している

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: 全テストPASS
    Tool: Bash
    Preconditions: 全タスク実装完了
    Steps:
      1. `bun run test` を実行
      2. テスト結果を確認
    Expected Result: 全テストPASS（0 failures）
    Failure Indicators: いずれかのテストがFAIL
    Evidence: .sisyphus/evidence/task-7-all-tests-pass.txt

  Scenario: ビルド成功
    Tool: Bash
    Preconditions: 全タスク実装完了
    Steps:
      1. `bun run build` を実行
    Expected Result: ビルド成功（エラーなし）
    Failure Indicators: ビルドエラー
    Evidence: .sisyphus/evidence/task-7-build-success.txt
  ```

  **Commit**: YES
  - Message: `test(kanji-quiz): update tests for reading/writing modes`
  - Files: `src/lib/quiz.test.js`, `src/components/KanjiQuiz.test.jsx`

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.

- [x] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [x] F2. **Code Quality Review** — `unspecified-high`
  Run `bun run build` + `bun run test`. Review all changed files for: `as any`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names.
  Output: `Build [PASS/FAIL] | Tests [N pass/N fail] | Files [N clean/N issues] | VERDICT`

- [x] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill)
  Start dev server. Execute EVERY QA scenario from EVERY task — follow exact steps, capture evidence. Test cross-task integration. Test edge cases: empty history state, long hiragana display, shared-reading kanji. Save to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [x] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Detect unaccounted changes.
  Output: `Tasks [N/N compliant] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **Task 1+7**: `feat(kanji-quiz): add writing test question generation logic` - logic.js, quiz.test.js
- **Task 2**: `feat(kanji-quiz): add localStorage history utility` - storage.js (new)
- **Task 3+7**: `refactor(kanji-quiz): consolidate modes to reading/writing` - constants.js, StartScreen.jsx, styles.js, KanjiQuiz.test.jsx
- **Task 4**: `feat(kanji-quiz): support writing test in quiz screen` - QuizScreen.jsx, styles.js
- **Task 5**: `feat(kanji-quiz): integrate writing mode and history save` - KanjiQuiz.jsx
- **Task 6**: `feat(kanji-quiz): show learning history on result screen` - ResultScreen.jsx, styles.js

---

## Success Criteria

### Verification Commands
```bash
bun run test     # Expected: all tests PASS
bun run build    # Expected: build success, no errors
```

### Final Checklist
- [x] All "Must Have" present
- [x] All "Must NOT Have" absent
- [x] All tests pass
- [x] 読みテスト従来通り動作
- [x] 書きテスト新規動作OK
- [x] 履歴保存・表示OK
