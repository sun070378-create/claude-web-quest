# CLAUDE.md — claude-web-quest 的 agent 守則

在這個專案工作前先讀這份。專案介紹看 `README.md`；Jason 所有專案的總清單不放在這裡。

> **跨專案的共通慣例、待辦和工作環境說明**在私人 repo [`sun070378-create/control-claude-projects`](https://github.com/sun070378-create/control-claude-projects) 的 `CLAUDE.md`（總索引）。如果它還不在工作環境裡，開始工作前先把它加進來讀；這份只寫這個專案自己的事。

## 一定要遵守

- **語氣**：語言、PR 流程等共通慣例見總索引。這個專案的說明文字要寫給初學者看得懂，語氣延續現有檔案。
- **雙擊就能用**：所有網頁都要同時在本機雙擊打開（`file://`）和 GitHub Pages（`https://`）下正常運作。
  - 不引入建置工具、npm 套件或外部 CDN。
  - 站內連結要指到檔案（例如 `levels/index.html`），不要寫成以 `/` 結尾的資料夾。
- **不要刪 `.nojekyll`**：GitHub Pages 從 `main` 的根目錄部署，靠它直接發布檔案。
- **專案要保持公開**：免費帳號的 GitHub Pages 需要公開專案，第 24 關的檢查也要讀公開的 GitHub API。
- **網站是公開的**：聯絡方式只放 GitHub，不放電話、住址、Email。
- **第 24 關要 Jason 親手做**：不要代替他建立 `my-first-branch`、開 PR 或修改 `levels/24-github/guestbook.md`。
- **第 21 關 `start.html` 的錯誤是故意的**（除錯練習），不要修。

## 常見修改

- **新增作品**：只改 `works.js`，欄位說明寫在檔案開頭。
- **修改關卡**：每關有 `README.md`、`start.html`、`answer.html`（第 22、25 關是 `answer/` 資料夾）、`check.js`。
  - 新增或刪除關卡時，同步更新 `levels/index.html` 和 `levels/README.md`。
  - 改檢查條件後要確認：`answer` 全部通過，`start.html` 一開始是 0 分。
  - 檢查可以回傳 `true` / `false`，或回傳 `{ ok: false, hint: "…" }` 換掉提示（見 `levels/checker.js`）。
- **測試**：用無頭 Chrome（Playwright）打開每一關的 `start.html` 和解答頁，`file://` 和 `http://` 各跑一次，讀 `window.__levelResult` 的分數。
