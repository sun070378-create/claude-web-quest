# 第 6 關：手機也要好看 📱

> 現在大部分人都用手機看網頁。電腦上漂亮還不夠，手機上也要好看。

## 這關會學到

- **響應式設計**（RWD）：同一個網頁，在不同螢幕自動調整
- `viewport` 設定
- 讓圖片不超出畫面
- `@media`：針對小螢幕另外寫 CSS

## 觀念小抄

### 1. viewport（一定要加）

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

沒有這行，手機會把網頁當成電腦版縮小顯示，字會小到看不見。

### 2. 圖片不超出畫面

```css
img {
  max-width: 100%;   /* 最寬 = 容器寬度 */
  height: auto;      /* 高度跟著等比例縮放 */
}
```

### 3. @media

```css
/* 平常（電腦）的樣式 */
.cards {
  display: flex;
}

/* 螢幕寬度 600px 以下時，才套用這裡面的樣式 */
@media (max-width: 600px) {
  .cards {
    flex-direction: column;   /* 改成直的排 */
  }
}
```

### 怎麼在電腦上看手機版？

1. 按 `F12` 打開開發者工具
2. 按左上角的「手機/平板」小圖示（或按 `Ctrl + Shift + M`，Mac 是 `Cmd + Shift + M`）
3. 在上方選一支手機，例如 iPhone

或者，直接把瀏覽器視窗拉窄，也能看到變化。

## 任務

打開 `start.html`：

1. 加上 viewport
2. 讓圖片 `max-width: 100%`
3. 寫一個 `@media (max-width: 600px)`
4. 在 `@media` 裡把 `.cards` 改成直的排

## 額外挑戰

- 在 `@media` 裡把 `h1` 的字縮小一點。
- 回頭看看專案根目錄的 `index.html`，找找看它的 `@media` 寫在哪裡。
