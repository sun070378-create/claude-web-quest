# Jason 的個人介紹網頁

這是一個用來練習寫網頁的小專案，也是放我所有作品的地方。個人網頁由兩個檔案組成，
不需要安裝任何東西：

- `index.html`：網頁本身
- `works.js`：「我的創作」的作品清單。**想新增作品，只要改這個檔案**

> 🎮 **想一步一步學做網頁？** 到 [`levels/`](levels/) 資料夾玩「網頁闖關」，
> 一共 25 關，從 HTML、JavaScript 學到 GitHub，每關都會自動檢查你有沒有過關。
> 用瀏覽器打開 `levels/index.html` 就能看到關卡地圖。
>
> 🖥️ 玩完第 24 關，想在自己的電腦上改檔案再送上 GitHub？看 [GitHub Desktop 新手教學](guides/github-desktop.md)。

## 🌐 網頁上線（GitHub Pages）

設定好之後，網址是：

- 個人網頁：<https://sun070378-create.github.io/claude-web-quest/>
- 闖關地圖：<https://sun070378-create.github.io/claude-web-quest/levels/>

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
| 我的創作 | 第二個 `<section>`，裡面有 `<ul class="works">` | 作品卡片（內容來自 `works.js`，見下面的「新增作品」） |
| 聯絡方式 | 第三個 `<section>`，裡面有 `<ul class="contact">` | GitHub 帳號 |
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
- **作品**：不在 `index.html` 裡，請看下一段「新增作品」。

- **聯絡方式**：目前只放了 GitHub，每一項長這樣：
  ```html
  <li>
    <span class="label">GitHub</span>
    <a href="https://github.com/sun070378-create">github.com/sun070378-create</a>
  </li>
  ```
  `href="..."` 引號裡是**點下去會去的地方**，`>` 和 `</a>` 之間是**畫面上顯示的文字**，改的時候兩個都要改。
  想再加一項，就把整組 `<li>...</li>` 複製一份。Email 的網址要寫成 `mailto:你的信箱`。

  > ⚠️ 這個網站是公開的，任何人都看得到。只放你願意讓所有人知道的帳號，不要放電話、住址。

### 🖼️ 新增作品

作品清單寫在 `works.js` 裡，每個作品是一組 `{ … }`：

```js
const works = [
  {
    title: "通勤碼表",                                        // 作品名稱
    type: "網頁工具",                                         // 類型
    year: 2026,                                              // 年份（數字，不用引號）
    url: "https://sun070378-create.github.io/claude-commute-timer/",   // 網址（可以不寫）
    description: "記錄搭捷運、輕軌時的等車、乘車、轉乘時間"         // 一句話介紹（可以不寫）
  },
  { title: "作品名稱", type: "攝影集", year: 2026 }          // 只寫必填的三個欄位也可以
];
```

- 想新增作品，就在清單**最上面**多加一組 `{ … }`，排在越上面的，網頁上也越上面。
- 每一組之間要用**逗號** `,` 隔開。
- 有寫 `url`，作品名稱就會變成可以點的連結；有寫 `description`，標題下面會多一行介紹。
- `url` 可以是完整網址，也可以是這個網站裡的檔案，例如 `"levels/index.html"`（「網頁闖關」就是這樣寫的）。
- 改完存檔、重新整理網頁就能看到。如果「我的創作」變成「作品準備中……」，通常是 `works.js` 少了逗號或引號，按 `F12` 看主控台的紅字就知道是哪一行。

> 為什麼要分成兩個檔案？作品越來越多的時候，只要改 `works.js` 這份清單，不用在一大堆 HTML 裡找位置，也比較不容易改壞版面。這種「資料和畫面分開」的寫法，在第 15 關（我的書櫃）有練習過。

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

---

## 給路過的你

這是 Jason 自己學做網頁的練習紀錄，「網頁闖關」也是照 Jason 的進度設計的。
想從零學網頁的話，[MDN Web Docs](https://developer.mozilla.org/zh-TW/)、[freeCodeCamp](https://www.freecodecamp.org/) 這些更完整的資源會更適合你。

不過歡迎參考這裡的內容！如果你也想玩這套關卡，或有任何問題，歡迎到 [Issues](https://github.com/sun070378-create/claude-web-quest/issues) 留言告訴我。
