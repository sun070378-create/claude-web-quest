# 第 11 關：留言表單 ✉️

> 第二章開始！到目前為止，網頁都是「給人看」的。從這一關開始，網頁要能「讓人輸入」。

## 這關會學到

- `<form>` 表單
- 各種輸入欄位：`<input>`、`<select>`、`<textarea>`
- `<label>` 為什麼重要
- `type="email"`、`required` 讓瀏覽器幫你檢查

## 觀念小抄

```html
<form>
  <label for="name">你的名字</label>
  <input id="name" type="text" required>

  <label for="topic">留言類型</label>
  <select id="topic">
    <option>打個招呼</option>
    <option>合作邀約</option>
  </select>

  <label for="message">留言內容</label>
  <textarea id="message"></textarea>

  <button type="submit">送出</button>
</form>
```

### label 的 for 和 input 的 id

`for` 和 `id` 寫一樣的名字，它們就配成一對：

- 點 label 的文字，游標會跳到輸入框（手機上很好用）
- 螢幕報讀軟體會唸出「你的名字，輸入框」

### 常見的 input type

| type | 用途 |
|------|------|
| `text` | 一般文字 |
| `email` | Email，會檢查有沒有 @ |
| `number` | 數字 |
| `date` | 日期，會跳出日曆 |
| `checkbox` | 打勾方塊 |

### required

加上 `required` 的欄位是**必填**的。沒填就按送出，瀏覽器會跳出提示，不讓你送出。

> 💡 按送出後網頁會重新整理，這是正常的。真正把留言寄出去，需要「後端伺服器」，那是之後的課題。

## 任務

打開 `start.html`，照著註解完成 7 個任務。完成後試試看：什麼都不填就按送出，會發生什麼事？

## 額外挑戰

- 加一個 `<input type="checkbox">`，例如「我想收到回信」。
- 試試 `type="date"`、`type="color"`，看看瀏覽器會給你什麼。
