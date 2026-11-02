/* 第 4 關的過關條件（裁判用，不需要修改） */
/* 包在函式裡，避免和你寫的變數名稱撞名 */
(function () {
  var H = LevelHelpers;
  function card() { return document.querySelector(".card"); }
  function px(value) { return parseFloat(value) || 0; }

  Level.define({
    level: 4,
    title: "盒子的秘密",
    next: "../05-flexbox/start.html",
    checks: [
      {
        text: "卡片有內距 padding（至少 10px）",
        hint: ".card { padding: 24px; }",
        test: function () {
          return px(H.css(card(), "padding-top")) >= 10 && px(H.css(card(), "padding-left")) >= 10;
        }
      },
      {
        text: "卡片有邊框 border",
        hint: "border: 1px solid #ccc;（粗細、樣式、顏色）",
        test: function () {
          return px(H.css(card(), "border-top-width")) > 0 && H.css(card(), "border-top-style") !== "none";
        }
      },
      {
        text: "卡片有圓角 border-radius",
        hint: "border-radius: 12px;",
        test: function () {
          return px(H.css(card(), "border-top-left-radius")) > 0;
        }
      },
      {
        text: "卡片寬度不超過 500px",
        hint: "max-width: 400px;",
        test: function () {
          return card().getBoundingClientRect().width <= 500;
        }
      },
      {
        text: "卡片左右置中",
        hint: "margin: 40px auto;（左右是 auto 就會置中）",
        test: function () {
          var r = card().getBoundingClientRect();
          var p = card().parentElement.getBoundingClientRect();
          var left = r.left - p.left;
          var right = p.right - r.right;
          var narrowScreen = p.width < 520;
          return Math.abs(left - right) <= 2 && (left > 4 || narrowScreen);
        }
      },
      {
        text: "卡片有陰影 box-shadow",
        hint: "box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);",
        test: function () {
          return H.css(card(), "box-shadow") !== "none";
        }
      }
    ]
  });
})();
