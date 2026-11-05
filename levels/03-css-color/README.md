# 第 3 關：幫網頁上色 🎨

> HTML 決定「有什麼」，CSS 決定「長什麼樣子」。

## 這關會學到

- CSS 的基本寫法：**選擇器 + 屬性 + 值**
- 改顏色、背景、字體大小、行距
- 用 `class` 只改特定的元素

## 觀念小抄

CSS 寫在 `<head>` 裡的 `<style>` 標籤中：

```css
選擇器 {
  屬性: 值;
  屬性: 值;
}
```

例如：

```css
h1 {
  color: tomato;         /* 文字顏色 */
}

body {
  background-color: #f7f3ea;   /* 背景顏色 */
}

p {
  font-size: 18px;       /* 字體大小 */
  line-height: 1.8;      /* 行距 */
}

.highlight {             /* 開頭有「.」= 選擇 class="highlight" 的元素 */
  background-color: yellow;
}
```

### 顏色的寫法

- 英文名字：`red`、`tomato`、`skyblue`
- 色碼：`#3d6b56`（Google 搜尋「color picker」可以挑顏色、複製色碼）

### 常見錯誤

- 忘記冒號 `:` 或分號 `;`
- 大括號 `{ }` 沒有成對
- class 選擇器忘記加 `.`

## 任務

打開 `start.html`，只要在 `<style>` 裡寫 CSS：

1. body 背景色
2. h1 文字顏色
3. p 字體大小
4. p 行距
5. `.highlight` 的螢光筆效果

## 額外挑戰

- 試試 `font-weight: bold;` 和 `text-align: center;`。
- 試試 `font-family`，換成不同字體（可參考 [個人網頁修改說明](../../guides/edit-homepage.md) 的「改字體」）。
