# 第 16 關：溫度換算器 🌡️

> 第三章開始！這一章要做出幾個真正好用、好玩的小作品。先從「函式」打好基礎。

## 這關會學到

- 函式的**參數**（放進去的東西）和**回傳值**（交出來的東西）
- `Number()` 把文字變成數字、`NaN` 是什麼
- `toFixed()` 控制小數位數

## 觀念小抄

### 函式就像一台果汁機

```js
function celsiusToFahrenheit(c) {   // c 是參數：放進果汁機的水果
  return c * 9 / 5 + 32;            // return：倒出來的果汁
}

const answer = celsiusToFahrenheit(100);   // 放 100 進去，answer 會是 212
```

- 之前寫的函式（例如 `updateScreen()`）只是「做一件事」。
- 有 `return` 的函式會「算出一個結果交給你」，你可以把結果存起來、拿去用。
- 好處：同一個公式只寫一次，哪裡需要就呼叫哪裡。

### 輸入框拿到的都是文字

```js
input.value;            // "25"（文字）
Number(input.value);    // 25（數字）
Number("abc");          // NaN（Not a Number，不是數字）
Number.isNaN(Number("abc"));  // true
```

> ⚠️ `Number("")` 會得到 `0`，不是 `NaN`！所以空白要另外檢查。

### 控制小數位數

```js
(97.88).toFixed(1);   // "97.9"
```

### 在主控台試試看

按 `F12` →「Console」，直接輸入 `celsiusToFahrenheit(30)` 按 Enter，就能看到函式算出來的結果。這是測試函式最快的方法！

## 任務

打開 `start.html`：

1. 寫 `celsiusToFahrenheit(c)`
2. 寫 `fahrenheitToCelsius(f)`
3. 按「換算」時顯示結果
4. 輸入錯誤時顯示「請輸入數字」
5. 只顯示到小數點後一位

## 額外挑戰

- 加一個切換按鈕，讓使用者也能從華氏換成攝氏（用你寫好的 `fahrenheitToCelsius`）。
- 在輸入框按 Enter 也能換算。
