# Jason 的個人介紹網頁

這是一個用來練習寫網頁的小專案。整個網頁只有一個檔案：`index.html`，
不需要安裝任何東西。

> 🎮 **想一步一步學做網頁？** 到 [`levels/`](levels/) 資料夾玩「網頁闖關」，
> 一共 15 關，從 HTML 學到 JavaScript，每關都會自動檢查你有沒有過關。
> 用瀏覽器打開 `levels/index.html` 就能看到關卡地圖。

## 🌐 網頁上線（GitHub Pages）

設定好之後，網址是：

- 個人網頁：<https://sun070378-create.github.io/test-place-for-claude/>
- 闖關地圖：<https://sun070378-create.github.io/test-place-for-claude/levels/>

**第一次設定（只要做一次）：**

1. 打開 GitHub 上的這個專案，點上方的 **Settings**
2. 左邊選單點 **Pages**
3. 「Build and deployment」底下的 **Source** 選 **Deploy from a branch**
4. **Branch** 選 `main`，資料夾選 `/ (root)`，按 **Save**
5. 等 1～2 分鐘，重新整理那一頁，上方會出現網址

之後只要 `main` 有更新（例如合併 Pull Request），網站就會在幾分鐘內自動更新。

> 專案根目錄的 `.nojekyll` 是一個空檔案，告訴 GitHub「直接放上網頁就好，不要另外加工」，請不要刪除。

## 怎麼打開它？

在電腦上找到 `index.html`，**用滑鼠雙擊**，它就會在瀏覽器（Chrome、Edge、Safari 等）裡打開。

修改檔案後，存檔，再回到瀏覽器按 **重新整理**（Windows 按 `F5`，Mac 按 `Cmd + R`），就能看到改變。

> 編輯 `index.html` 可以用任何文字編輯器，推薦免費的 [VS Code](https://code.visualstudio.com/)。
> 不要用 Word 編輯，它會把檔案存成別的格式。

---

## 一、這個網頁由哪幾個部分組成？

打開 `index.html`，你會看到它分成兩大塊：

### 1. `<head>`：給瀏覽器看的設定（畫面上看不到）

- `<meta charset="UTF-8">`：讓中文正常顯示，不會變亂碼。
- `<meta name="viewport" ...>`：讓網頁在手機上正常大小顯示。
- `<title>`：瀏覽器分頁上顯示的文字。
- `<style>`：**CSS 樣式**，決定網頁長什麼樣子（顏色、字體、間距）。

### 2. `<body>`：畫面上真正看到的內容

由上到下依序是：

| 部分 | 在程式碼裡的樣子 | 內容 |
|------|----------------|------|
| 頁首 | `<header>` | 名字「Jason」和一句話介紹 |
| 關於我 | 第一個 `<section>` | 一段自我介紹 |
| 我的創作 | 第二個 `<section>`，裡面有 `<ul class="works">` | 三個作品標題 |
| 聯絡方式 | 第三個 `<section>`，裡面有 `<ul class="contact">` | Email、Instagram、GitHub |
| 頁尾 | `<footer>` | 版權文字 |

小知識：
- `<h1>`、`<h2>`、`<h3>` 是標題，數字越小越重要（越大）。
- `<p>` 是一段文字（paragraph）。
- `<ul>` 是清單，裡面每一項是 `<li>`。
- `<a href="...">` 是連結。
- `<!-- ... -->` 是 HTML 註解，`/* ... */` 是 CSS 註解，瀏覽器不會顯示它們，是寫給人看的。

---

## 二、我想改……要改哪裡？

### ✏️ 改文字

文字都在 `<body>` 裡，直接找到想改的字，換掉就好。例如：

- **名字**：找到 `<h1>Jason</h1>`，把 `Jason` 改成你的名字。
  （也記得改 `<head>` 裡的 `<title>Jason｜個人介紹</title>` 和最下面頁尾的名字）
- **一句話介紹**：找到 `<p class="tagline">`。
- **自我介紹**：在「關於我」區塊的兩個 `<p>` 裡。想多一段，就複製一組 `<p>...</p>` 貼在下面。
- **作品**：在「我的創作」區塊，每個作品長這樣：

  ```html
  <li>
    <h3>《午後的巷口》</h3>
    <p class="meta">攝影集・2026</p>
  </li>
  ```

  改 `<h3>` 裡的標題、`<p class="meta">` 裡的類型和年份。想增加作品，就把整組 `<li>...</li>` 複製一份。

- **聯絡方式**：每一項有兩個地方要改：
  ```html
  <a href="mailto:jason@example.com">jason@example.com</a>
  ```
  `href="..."` 引號裡是**點下去會去的地方**，`>` 和 `</a>` 之間是**畫面上顯示的文字**，兩個都要改。

### 🎨 改顏色

所有顏色都集中在 `<style>` 最上面的 `:root { ... }` 裡：

```css
:root {
  --color-bg: #faf9f6;        /* 背景色 */
  --color-text: #333333;      /* 主要文字顏色 */
  --color-muted: #777777;     /* 次要文字顏色 */
  --color-accent: #5b7a6e;    /* 強調色（標題旁的線、連結） */
  --color-line: #e4e1da;      /* 分隔線顏色 */
  ...
}
```

只要改 `#` 後面的色碼，整個網頁用到這個顏色的地方就會一起改變。

- 色碼可以在 Google 搜尋「color picker」，選好顏色後複製像 `#5b7a6e` 這樣的值。
- 例如想要藍色調，把 `--color-accent` 改成 `#4a6a8a` 試試看。

### 🔤 改字體

字體也在 `:root` 裡：

```css
--font-main: "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif;
```

瀏覽器會**從左到右**找，電腦裡有哪個字體就用哪個：
- `Noto Sans TC`：思源黑體（需要電腦有安裝）
- `PingFang TC`：蘋方，Mac / iPhone 內建
- `Microsoft JhengHei`：微軟正黑體，Windows 內建
- `sans-serif`：都沒有時，使用系統預設的黑體

**想改成明體（有襯線、比較文藝的感覺）**，可以換成：

```css
--font-main: "Noto Serif TC", "Songti TC", "PMingLiU", serif;
```

**想調整字的大小或行距**，找到 `body { ... }` 裡的：

```css
font-size: 17px;     /* 字的大小，數字越大字越大 */
line-height: 1.9;    /* 行距，數字越大行與行之間越寬 */
```

手機版的字體大小則在最下面 `@media (max-width: 600px) { ... }` 裡另外設定。

---

## 三、小提醒

- 改壞了也沒關係！這個專案用 Git 管理，隨時可以回到之前的版本。
- 一次改一點，改完就重新整理看看效果，最容易學會。
