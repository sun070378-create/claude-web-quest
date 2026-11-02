/* 第 7 關的過關條件（裁判用，不需要修改） */
/* 包在函式裡，避免和你寫的變數名稱撞名 */
(function () {
  var H = LevelHelpers;

  /* 裁判幫你按一下按鈕，記錄按之前和按之後的樣子，然後恢復原狀 */
  function simulateClick() {
    var button = document.querySelector("#hello-btn");
    var message = document.querySelector("#message");
    var before = { text: message.textContent, color: H.css(message, "color"), inline: message.style.color };
    button.click();
    var after = { text: message.textContent, color: H.css(message, "color") };
    message.textContent = before.text;
    message.style.color = before.inline;
    return { before: before, after: after };
  }

  Level.define({
    level: 7,
    title: "第一行 JavaScript",
    next: "../08-counter/start.html",
    checks: [
      {
        text: "在 <script> 裡用 querySelector 找到元素",
        hint: "const button = document.querySelector(\"#hello-btn\");",
        test: function () {
          return H.userScripts().some(function (s) {
            return /^(?!\s*\/\/).*(querySelector|getElementById)/m.test(s.textContent);
          });
        }
      },
      {
        text: "按下按鈕後，訊息的文字會改變",
        hint: "button.addEventListener(\"click\", function () { message.textContent = \"新的文字\"; });",
        test: function () {
          var r = simulateClick();
          return r.after.text !== r.before.text;
        }
      },
      {
        text: "按下按鈕後，訊息的顏色會改變",
        hint: "在點擊事件裡加上：message.style.color = \"tomato\";",
        test: function () {
          var r = simulateClick();
          return r.after.color !== r.before.color;
        }
      }
    ]
  });
})();
