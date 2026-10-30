/* 第 5 關的過關條件（裁判用，不需要修改） */
/* 包在函式裡，避免和你寫的變數名稱撞名 */
(function () {
  var H = LevelHelpers;
  function cards() { return document.querySelectorAll(".cards > .card"); }
  function rects() {
    return Array.prototype.map.call(cards(), function (c) { return c.getBoundingClientRect(); });
  }

  Level.define({
    level: 5,
    title: "並排的魔法",
    next: "../06-responsive/start.html",
    checks: [
      {
        text: ".cards 使用 display: flex",
        hint: ".cards { display: flex; }",
        test: function () {
          return H.css(document.querySelector(".cards"), "display") === "flex";
        }
      },
      {
        text: "三張卡片排在同一排",
        hint: "如果已經寫了 display: flex 還是沒過，請把瀏覽器視窗拉寬一點",
        test: function () {
          var r = rects();
          return r.length === 3 && Math.abs(r[0].top - r[1].top) < 2 && Math.abs(r[1].top - r[2].top) < 2 && r[1].left > r[0].right;
        }
      },
      {
        text: "卡片之間有空隙（至少 8px）",
        hint: ".cards { gap: 16px; }",
        test: function () {
          var r = rects();
          return r.length === 3 && r[1].left - r[0].right >= 8 && r[2].left - r[1].right >= 8;
        }
      },
      {
        text: "三張卡片一樣寬",
        hint: ".card { flex: 1; }",
        test: function () {
          var r = rects();
          var sameRow = r.length === 3 && Math.abs(r[0].top - r[2].top) < 2;
          return sameRow && Math.abs(r[0].width - r[1].width) < 2 && Math.abs(r[1].width - r[2].width) < 2;
        }
      }
    ]
  });
})();
