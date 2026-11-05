# CLAUDE.md — 個人網頁 + 網頁闖關（claude-web-quest）

給 agent 的專案索引。先讀這份，需要細節再開對應檔案，不要整個 repo 掃描。

- 個人網頁：https://sun070378-create.github.io/claude-web-quest/
- 關卡地圖：https://sun070378-create.github.io/claude-web-quest/levels/
- 技術：純靜態 HTML/CSS/JS（無 build、無套件），GitHub Pages（main / root）。根目錄 `.nojekyll` 不要刪。
- 對象：Jason 自己學做網頁的練習紀錄，說明文字要寫給初學者看得懂。

## 檔案

| 路徑 | 內容 |
|---|---|
| `index.html` | Jason 的個人介紹頁：關於我、我的創作、聯絡方式（只放 GitHub） |
| `works.js` | `works` 陣列，產生「我的創作」卡片。`title`/`type`/`year` 必填，`url`/`description` 選填；新作品加在最上面 |
| `guides/github-desktop.md` | GitHub Desktop 新手教學（接在第 24 關之後） |
| `levels/index.html` | 關卡地圖 |
| `levels/README.md` | 關卡總說明和列表 |
| `levels/checker.js` | 共用裁判：右下角檢查面板，各關用 `Level.define(...)` 定義條件；進度存在 localStorage `webquest-progress` |
| `levels/NN-名稱/` | 每關四件套：`README.md` 說明、`start.html` 練習檔、`answer.html` 解答（第 22、25 關是 `answer/` 資料夾）、`check.js` 檢查條件 |

## 25 關（四章）

1. 網頁的基本功：01 hello-html、02 list-link-image、03 css-color、04 box-model、05 flexbox、06 responsive、07 first-js、08 counter、09 dark-mode、10 boss-todo（魔王）
2. 更進一步：11 forms、12 grid、13 animation、14 local-storage、15 array-loop（魔王：我的書櫃）
3. 做出小作品：16 functions（溫度換算）、17 random（今天吃什麼）、18 timer（番茄鐘）、19 fetch（天氣，需要網路）、20 boss-memory（魔王：記憶翻牌）
4. 像工程師一樣：21 debug、22 split-files、23 accessibility、24 github（第一個 PR）、25 final-project（期末專題）

## 常見任務

- **新增作品**：只改 `works.js`。
- **新增或修改關卡**：建立或修改該關的四件套，並同步更新 `levels/index.html` 和 `levels/README.md`；改檢查條件時，確認 `answer.html` 能全部通過、`start.html` 一開始不會通過。

## 慣例

- commit 訊息、文件、介面文字都用繁體中文。
- 開 feature branch，用 PR 合併到 main。
- 網站是公開的：聯絡方式只放 GitHub，不放電話、住址、email。

## 相關

- 姊妹專案：[claude-commute-timer](https://github.com/sun070378-create/claude-commute-timer)（通勤碼表：記錄輕軌／捷運通勤時間並統計，前端加 Supabase）。
