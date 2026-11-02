/* 第 18 關的過關條件（裁判用，不需要修改） */
/* 裁判會幫你按按鈕、等幾秒鐘來測試，最後會按「重來」恢復 */
/* 包在函式裡，避免和你寫的變數名稱撞名 */
(function () {
  var H = LevelHelpers;

  function shown() { return document.querySelector("#time").textContent.trim(); }
  function press(id) { document.querySelector("#" + id).click(); }

  /* 把畫面上的 "24:58" 變回秒數；格式不對就回傳 NaN */
  function shownSeconds() {
    var match = /^(\d+):(\d\d)$/.exec(shown());
    return match ? Number(match[1]) * 60 + Number(match[2]) : NaN;
  }

  Level.define({
    level: 18,
    title: "番茄鐘",
    next: "../19-fetch/start.html",
    checks: [
      {
        text: "formatTime(秒數) 會回傳「分:秒」格式",
        hint: "1500 → \"25:00\"、65 → \"01:05\"。補零用 String(數字).padStart(2, \"0\")",
        test: function () {
          return typeof formatTime === "function" &&
            formatTime(1500) === "25:00" && formatTime(65) === "01:05" && formatTime(0) === "00:00";
        }
      },
      {
        text: "按「開始」，時間會開始倒數",
        hint: "timerId = setInterval(function () { remaining = remaining - 1; …更新畫面… }, 1000);",
        test: function () {
          press("reset-btn");
          var before = shown();
          press("start-btn");
          return H.wait(1300).then(function () {
            var moved = shown() !== before && shownSeconds() < 1500;
            press("pause-btn");
            press("reset-btn");
            return moved;
          });
        }
      },
      {
        text: "按「暫停」，時間會停住",
        hint: "clearInterval(timerId); timerId = null;",
        test: function () {
          press("reset-btn");
          press("start-btn");
          return H.wait(1200).then(function () {
            press("pause-btn");
            var paused = shown();
            return H.wait(1300).then(function () {
              var ok = shown() === paused && shownSeconds() < 1500;
              press("reset-btn");
              return ok;
            });
          });
        }
      },
      {
        text: "按「重來」，時間回到 25:00 而且停住",
        hint: "停止計時、remaining = FOCUS_SECONDS、更新畫面",
        test: function () {
          press("start-btn");
          return H.wait(1200).then(function () {
            var moved = shown() !== "25:00";   /* 要先真的有在倒數，才測得出「重來」有沒有用 */
            press("reset-btn");
            var right = moved && shown() === "25:00";
            return H.wait(1200).then(function () {
              return right && shown() === "25:00";
            });
          });
        }
      },
      {
        text: "連按兩次「開始」，也不會變成兩倍速",
        hint: "開始按鈕裡先寫：if (timerId !== null) { return; }",
        test: function () {
          press("reset-btn");
          press("start-btn");
          press("start-btn");
          return H.wait(2300).then(function () {
            var passed = 1500 - shownSeconds();
            press("pause-btn");
            press("reset-btn");
            return passed >= 1 && passed <= 3;
          });
        }
      }
    ]
  });
})();
