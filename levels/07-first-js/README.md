# 第 7 關：第一行 JavaScript ⚡

> HTML 是骨架，CSS 是衣服，JavaScript 讓網頁**動起來**。

## 這關會學到

- JavaScript 寫在哪裡：`<script>` 標籤
- 用 `document.querySelector` 找到網頁上的元素
- 用 `addEventListener` 監聽「點擊」
- 用 `textContent` 改文字、`style.color` 改顏色

## 觀念小抄

```js
// 1. 找到元素（# 代表找 id）
const button = document.querySelector("#hello-btn");
const message = document.querySelector("#message");

// 2. 當按鈕被點擊時……
button.addEventListener("click", function () {
  // 3. ……就做這些事
  message.textContent = "你按了按鈕！";
  message.style.color = "tomato";
});
```

- `//` 開頭的是註解。
- `const` 用來建立一個**變數**，就像一個貼了名字的盒子，把東西放進去，之後用名字就能拿出來。
- `"#hello-btn"`：`#` 代表 id，跟 CSS 選擇器的寫法一樣（`.` 代表 class）。
- 每一行結尾的 `;` 建議都寫上。
- 大小寫有差別：`querySelector` 寫成 `queryselector` 就不會動。

### 程式不動？打開「主控台」看錯誤訊息

按 `F12` →「Console（主控台）」分頁。如果有紅色的錯誤訊息，它會告訴你是第幾行出錯。

## 任務

打開 `start.html`，在 `<script>` 裡：

1. 用 `querySelector` 找到按鈕和訊息
2. 按鈕被點擊時，改變訊息的文字
3. 同時改變訊息的顏色

## 額外挑戰

- 試試 `alert("哈囉！");`，會跳出一個對話框。
- 試試 `console.log("我被按了");`，然後到主控台看看。
- 讓按鈕自己的文字也改變：`button.textContent = "再按一次";`
