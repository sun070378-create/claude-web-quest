# 第 9 關：夜間模式 🌙

> 這一關，你要讓 CSS 和 JavaScript 合作。

## 這關會學到

- 用 JavaScript 切換 **class**，讓 CSS 決定樣子
- `classList.toggle`、`classList.contains`
- `if … else`
- （額外）用 `transition` 讓顏色慢慢變化

## 觀念小抄

### 分工合作

- **CSS** 負責「夜間模式長什麼樣子」
- **JavaScript** 只負責「切換開關」（加上或拿掉 class）

```css
/* 當 body 有 class="dark" 時，套用這些樣式 */
body.dark {
  background-color: #1f2328;
  color: #d8dadd;
}
```

```js
document.body.classList.toggle("dark");   // 沒有就加上，有就拿掉
document.body.classList.contains("dark"); // 現在有沒有？會得到 true 或 false
```

### if … else

```js
if (條件) {
  // 條件成立時做這個
} else {
  // 不成立時做這個
}
```

## 任務

打開 `start.html`：

1. 在 CSS 寫出 `body.dark` 的樣子
2. 按按鈕時切換 `dark` class
3. 按鈕的文字要跟著變（🌙 夜間模式 ⇄ ☀️ 日間模式）

## 額外挑戰

- 在 `body` 加上 `transition: background-color 0.3s, color 0.3s;`，切換時會有漸變效果。
- 把專案根目錄 `index.html` 的個人網頁也加上夜間模式按鈕！
  （提示：它的顏色都放在 `:root` 的變數裡，你可以寫 `body.dark { --color-bg: #1f2328; … }`）
