# 第 18 關：番茄鐘 🍅

> 「番茄工作法」：專心 25 分鐘、休息 5 分鐘。這一關要自己做一個計時器。

## 這關會學到

- `setInterval`：每隔一段時間執行一次
- `clearInterval`：停止計時器
- 用變數記住「現在的狀態」（有沒有在跑）
- `%` 取餘數、`padStart` 補零

## 觀念小抄

### setInterval 和 clearInterval

```js
// 每 1000 毫秒（1 秒）執行一次，會回傳一個「計時器編號」
let timerId = setInterval(function () {
  console.log("又過了 1 秒");
}, 1000);

// 用編號叫它停下來
clearInterval(timerId);
```

還有一個很像的 `setTimeout`：**只執行一次**。

```js
setTimeout(function () {
  console.log("3 秒後才出現");
}, 3000);
```

### 為什麼要記住 timerId？

- 暫停時需要它，才能 `clearInterval(timerId)`。
- 用 `timerId === null` 表示「目前沒有在跑」。
- 如果在跑的時候又按「開始」，會開出**第二個**計時器，兩個一起倒數，就變成兩倍速了！所以要先檢查。

### 秒數變成「分:秒」

```js
Math.floor(65 / 60);         // 1（分）
65 % 60;                     // 5（秒）：% 是「除完的餘數」
String(5).padStart(2, "0");  // "05"：不夠 2 個字就在前面補 0
```

## 任務

打開 `start.html`：

1. 寫 `formatTime(seconds)`
2. 「開始」：每秒倒數
3. 「暫停」：停住
4. 「重來」：回到 25:00
5. 連按「開始」不會變兩倍速

> 💡 這關的裁判需要等幾秒鐘來測試計時器，面板會顯示 ⏳，請耐心等一下。

## 額外挑戰

- 時間到的時候，在 `#status` 顯示「時間到！」。（想快點測試的話，先把 `FOCUS_SECONDS` 暫時改成 `5`）
- 時間到時把網頁標題也改掉：`document.title = "⏰ 時間到！";`
- 加一個「休息 5 分鐘」的按鈕。
