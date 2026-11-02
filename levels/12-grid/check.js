/* 第 12 關的過關條件（裁判用，不需要修改） */
/* 包在函式裡，避免和你寫的變數名稱撞名 */
(function () {
  var H = LevelHelpers;
  function gallery() { return document.querySelector(".gallery"); }
  function photos() { return document.querySelectorAll(".gallery > .photo"); }

  /* 數一數照片排出了幾種不同的「左邊位置」= 有幾欄 */
  function columnCount() {
    var lefts = {};
    Array.prototype.forEach.call(photos(), function (p) {
      lefts[Math.round(p.getBoundingClientRect().left)] = true;
    });
    return Object.keys(lefts).length;
  }

  Level.define({
    level: 12,
    title: "照片牆",
    next: "../13-animation/start.html",
    checks: [
      {
        text: ".gallery 使用 display: grid",
        hint: ".gallery { display: grid; }",
        test: function () { return H.css(gallery(), "display") === "grid"; }
      },
      {
        text: "照片排成 3 欄",
        hint: "grid-template-columns: 1fr 1fr 1fr;（請在電腦上、視窗夠寬時檢查）",
        test: function () { return columnCount() === 3; }
      },
      {
        text: "格子之間有空隙（至少 8px）",
        hint: ".gallery { gap: 12px; }",
        test: function () { return parseFloat(H.css(gallery(), "column-gap")) >= 8; }
      },
      {
        text: ".featured 這張照片橫跨 2 欄",
        hint: ".featured { grid-column: span 2; }",
        test: function () {
          var big = document.querySelector(".featured").getBoundingClientRect().width;
          var normal = document.querySelector(".gallery > .photo:not(.featured)").getBoundingClientRect().width;
          return columnCount() >= 2 && big > normal * 1.8;
        }
      },
      {
        text: "手機上（@media）改變欄數",
        hint: "@media (max-width: 600px) { .gallery { grid-template-columns: 1fr 1fr; } }",
        test: function () {
          return H.mediaRules().some(function (media) {
            return /max-width/.test(media.media.mediaText) && Array.prototype.some.call(media.cssRules, function (rule) {
              return rule.selectorText && rule.selectorText.indexOf(".gallery") !== -1 && rule.style.gridTemplateColumns;
            });
          });
        }
      }
    ]
  });
})();
