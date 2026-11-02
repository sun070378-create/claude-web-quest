/* 第 16 關的過關條件（裁判用，不需要修改） */
/* 包在函式裡，避免和你寫的變數名稱撞名 */
(function () {
  /* 數字差不多一樣就算對（小數計算會有一點點誤差） */
  function near(a, b) { return typeof a === "number" && Math.abs(a - b) < 0.01; }

  /* 在輸入框打字，按下換算，回傳 #result 顯示的文字 */
  function convert(text) {
    var input = document.querySelector("#celsius");
    var result = document.querySelector("#result");
    var before = { value: input.value, text: result.textContent };
    input.value = text;
    document.querySelector("#convert-btn").click();
    var shown = result.textContent;
    input.value = before.value;
    result.textContent = before.text;
    return shown;
  }

  Level.define({
    level: 16,
    title: "溫度換算器",
    next: "../17-random/start.html",
    checks: [
      {
        text: "celsiusToFahrenheit(c) 會回傳正確的華氏溫度",
        hint: "function celsiusToFahrenheit(c) { return c * 9 / 5 + 32; }（記得寫 return）",
        test: function () {
          return typeof celsiusToFahrenheit === "function" &&
            near(celsiusToFahrenheit(0), 32) && near(celsiusToFahrenheit(100), 212) && near(celsiusToFahrenheit(-40), -40);
        }
      },
      {
        text: "fahrenheitToCelsius(f) 會回傳正確的攝氏溫度",
        hint: "function fahrenheitToCelsius(f) { return (f - 32) * 5 / 9; }",
        test: function () {
          return typeof fahrenheitToCelsius === "function" &&
            near(fahrenheitToCelsius(32), 0) && near(fahrenheitToCelsius(212), 100);
        }
      },
      {
        text: "按「換算」，輸入 25 會顯示 77",
        hint: "按鈕的 click 事件裡：Number(input.value) → celsiusToFahrenheit(…) → 放進 result.textContent",
        test: function () { return convert("25").indexOf("77") !== -1; }
      },
      {
        text: "沒輸入或輸入的不是數字，會顯示「請輸入數字」",
        hint: "if (text === \"\" || Number.isNaN(celsius)) { result.textContent = \"請輸入數字\"; return; }",
        test: function () {
          return convert("").indexOf("請輸入") !== -1 && convert("abc").indexOf("請輸入") !== -1;
        }
      },
      {
        text: "結果只顯示到小數點後一位（36.6 → 97.9）",
        hint: "fahrenheit.toFixed(1)",
        test: function () {
          var shown = convert("36.6");
          return shown.indexOf("97.9") !== -1 && shown.indexOf("97.88") === -1;
        }
      }
    ]
  });
})();
