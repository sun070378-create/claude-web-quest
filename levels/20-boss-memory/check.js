/* 第三章魔王的過關條件（裁判用，不需要修改） */
/* 裁判會幫你玩幾局來測試，最後會按「重新開始」留給你一局新的 */
/* 包在函式裡，避免和你寫的變數名稱撞名 */
(function () {
  var H = LevelHelpers;

  function cards() { return Array.prototype.slice.call(document.querySelectorAll("#board .card")); }
  function restart() { document.querySelector("#restart").click(); }
  function movesText() { return document.querySelector("#moves").textContent.trim(); }
  function messageText() { return document.querySelector("#message").textContent.trim(); }
  function is(card, name) { return card.classList.contains(name); }

  /* 依圖案分組：{ "🍎": [牌, 牌], … } */
  function groups() {
    var result = {};
    cards().forEach(function (card) {
      var symbol = card.dataset.symbol;
      (result[symbol] = result[symbol] || []).push(card);
    });
    return result;
  }

  /* 找兩張圖案不一樣的牌 */
  function twoDifferent() {
    var list = cards();
    for (var i = 1; i < list.length; i++) {
      if (list[i].dataset.symbol !== list[0].dataset.symbol) return [list[0], list[i]];
    }
    return null;
  }

  function onePair() {
    var g = groups();
    var symbol = Object.keys(g)[0];
    return symbol && g[symbol].length === 2 ? g[symbol] : null;
  }

  function order() { return cards().map(function (c) { return c.dataset.symbol; }).join(""); }

  Level.define({
    level: 20,
    title: "第三章魔王：記憶翻牌遊戲",
    next: "../21-debug/start.html",
    checks: [
      {
        text: "牌桌上有 16 張牌，每種圖案剛好 2 張",
        hint: "createBoard() 裡用 shuffle(symbols.concat(symbols)) 做出 16 張 <button class=\"card\">，記得設定 card.dataset.symbol",
        test: function () {
          restart();
          var g = groups();
          var symbols = Object.keys(g);
          return cards().length === 16 && symbols.length === 8 && symbols.every(function (s) {
            return s !== "undefined" && g[s].length === 2;
          });
        }
      },
      {
        text: "點一張牌，它會翻開（加上 flipped）",
        hint: "card.addEventListener(\"click\", function () { card.classList.add(\"flipped\"); });",
        test: function () {
          restart();
          var card = cards()[0];
          if (!card) return false;
          card.click();
          return is(card, "flipped");
        }
      },
      {
        text: "翻開兩張一樣的牌，兩張都會加上 matched",
        hint: "if (firstCard.dataset.symbol === secondCard.dataset.symbol) { …兩張都 classList.add(\"matched\") }",
        test: function () {
          restart();
          var pair = onePair();
          if (!pair) return false;
          pair[0].click();
          pair[1].click();
          return is(pair[0], "matched") && is(pair[1], "matched");
        }
      },
      {
        text: "翻開兩張不一樣的牌，過一下會自動蓋回去",
        hint: "lock = true; setTimeout(function () { …拿掉兩張的 flipped，lock = false… }, 800);",
        test: function () {
          restart();
          var two = twoDifferent();
          if (!two) return false;
          two[0].click();
          two[1].click();
          if (!is(two[0], "flipped") || !is(two[1], "flipped")) return false;
          return H.waitFor(function () {
            return !is(two[0], "flipped") && !is(two[1], "flipped");
          }, 2500);
        }
      },
      {
        text: "每翻開兩張，步數加 1",
        hint: "翻開第二張時：moves = moves + 1; movesText.textContent = moves;",
        test: function () {
          restart();
          if (movesText() !== "0") return false;
          var two = twoDifferent();
          if (!two) return false;
          two[0].click();
          two[1].click();
          var afterOne = movesText() === "1";
          return H.waitFor(function () { return !is(two[0], "flipped"); }, 2500).then(function () {
            var pair = onePair();
            pair[0].click();
            pair[1].click();
            return afterOne && movesText() === "2";
          });
        }
      },
      {
        text: "全部配對完成，會顯示過關訊息",
        hint: "if (matchedPairs === symbols.length) { messageText.textContent = \"恭喜過關！\"; }",
        test: function () {
          restart();
          if (messageText() !== "") return false;
          var g = groups();
          Object.keys(g).forEach(function (symbol) {
            g[symbol][0].click();
            g[symbol][1].click();
          });
          return H.waitFor(function () { return messageText() !== ""; }, 1500);
        }
      },
      {
        text: "按「重新開始」，步數歸零、訊息清空、重新洗牌",
        hint: "在 createBoard() 開頭把 moves、matchedPairs、firstCard… 都歸零，清空 board 和 message",
        test: function () {
          var before = order();
          restart();
          var fresh = cards();
          return fresh.length === 16 && movesText() === "0" && messageText() === "" &&
            fresh.every(function (c) { return !is(c, "flipped") && !is(c, "matched"); }) &&
            order() !== before;
        }
      }
    ]
  });
})();
