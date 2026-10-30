/* 第 9 關的過關條件（裁判用，不需要修改） */
var H = LevelHelpers;

/* 裁判幫你按兩次按鈕，記錄每次的樣子，最後恢復成原本的模式 */
function simulateToggle() {
  var body = document.body;
  var button = document.querySelector("#theme-toggle");
  var oldTransition = body.style.transition;
  body.style.transition = "none"; /* 暫停漸變動畫，才能馬上讀到新顏色 */

  function snapshot() {
    return {
      dark: body.classList.contains("dark"),
      bg: H.css(body, "background-color"),
      color: H.css(body, "color"),
      label: button.textContent.trim()
    };
  }

  var start = snapshot();
  button.click();
  var once = snapshot();
  button.click();
  var twice = snapshot();

  body.classList.toggle("dark", start.dark);
  button.textContent = start.label;
  body.style.transition = oldTransition;
  return { start: start, once: once, twice: twice };
}

Level.define({
  level: 9,
  title: "夜間模式",
  next: "../10-boss-todo/start.html",
  checks: [
    {
      text: "按下按鈕後，body 會加上 class=\"dark\"",
      hint: "toggleButton.addEventListener(\"click\", function () { document.body.classList.toggle(\"dark\"); });",
      test: function () {
        var r = simulateToggle();
        return !r.start.dark && r.once.dark;
      }
    },
    {
      text: "夜間模式的背景顏色不一樣",
      hint: "body.dark { background-color: #1f2328; }",
      test: function () {
        var r = simulateToggle();
        return r.once.bg !== r.start.bg;
      }
    },
    {
      text: "夜間模式的文字顏色不一樣",
      hint: "body.dark { color: #d8dadd; }",
      test: function () {
        var r = simulateToggle();
        return r.once.color !== r.start.color;
      }
    },
    {
      text: "再按一次，會切換回日間模式",
      hint: "用 classList.toggle 就會自動切換回來",
      test: function () {
        var r = simulateToggle();
        return r.once.dark && !r.twice.dark && r.twice.bg === r.start.bg;
      }
    },
    {
      text: "按鈕上的文字會跟著模式改變",
      hint: "if (document.body.classList.contains(\"dark\")) { toggleButton.textContent = \"☀️ 日間模式\"; } else { … }",
      test: function () {
        var r = simulateToggle();
        return r.once.label !== r.start.label && r.twice.label === r.start.label;
      }
    }
  ]
});
