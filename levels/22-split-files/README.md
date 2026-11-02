# 第 22 關：分門別類 🗂️

> 到目前為止，HTML、CSS、JS 都擠在同一個檔案裡。網頁一變大，就很難找東西。真正的網站都會「分門別類」。

## 這關會學到

- 把 CSS 搬到 `.css` 檔，用 `<link>` 載入
- 把 JS 搬到 `.js` 檔，用 `<script src>` 載入
- 在 VS Code 裡新增檔案
- **相對路徑**是什麼

## 觀念小抄

### 拆開之後長這樣

```
22-split-files/
├── start.html   ← 只放內容（HTML）
├── style.css    ← 只放樣式（CSS）
└── script.js    ← 只放程式（JS）
```

```html
<head>
  <link rel="stylesheet" href="style.css">    <!-- 載入樣式 -->
</head>
<body>
  ……內容……
  <script src="script.js"></script>           <!-- 載入程式 -->
</body>
```

**搬的時候只搬「裡面的內容」**：`<style>` 和 `<script>` 這兩個標籤本身不用搬，`.css` 和 `.js` 檔裡不需要它們。

### 好處

- 每個檔案都比較短，比較好找
- 好幾個網頁可以**共用**同一個 `style.css`，改一次全部一起變
- 這也是所有網頁專案的標準做法

### 相對路徑

`href="style.css"` 的意思是「**跟這個 HTML 同一個資料夾**裡的 style.css」。

| 寫法 | 意思 |
|------|------|
| `style.css` | 同一個資料夾 |
| `css/style.css` | 同一個資料夾裡的 css 資料夾 |
| `../style.css` | 上一層資料夾 |

> 其實你每一關都在用相對路徑：`<script src="../checker.js">` 就是「上一層資料夾的 checker.js」！

### 在 VS Code 新增檔案

左邊的檔案列表，對著 `22-split-files` 資料夾按右鍵 →「新增檔案」，輸入檔名 `style.css` 按 Enter。

## 任務

打開 `start.html`：

1. 新增 `style.css`，把 CSS 搬過去
2. 刪掉 `<style>`，改用 `<link>` 載入
3. 新增 `script.js`，把 JS 搬過去
4. 刪掉原本的 `<script>`，改用 `<script src="script.js">`

做完之後，網頁看起來、用起來要**跟原本一模一樣**。

參考解答在 `answer/` 資料夾裡（因為有三個檔案）。

## 額外挑戰

- 回頭看專案根目錄的 `index.html`（你的個人網頁），試著把它也拆成 `index.html` + `style.css`。
