/* 第 13 關的過關條件（裁判用，不需要修改） */
/* 包在函式裡，避免和你寫的變數名稱撞名 */
(function () {
  var H = LevelHelpers;

  /* 把網頁裡所有 CSS 規則攤平成一個清單（包含 @media 裡面的） */
  function allRules() {
    var found = [];
    function walk(rules) {
      Array.prototype.forEach.call(rules || [], function (rule) {
        found.push(rule);
        if (rule.cssRules && rule.type !== 7) walk(rule.cssRules);
      });
    }
    Array.prototype.forEach.call(document.styleSheets, function (sheet) {
      try { walk(sheet.cssRules); } catch (e) { /* 讀不到的就跳過 */ }
    });
    return found;
  }

  function hoverRules() {
    return allRules().filter(function (rule) {
      return rule.selectorText && /\.cta:hover|button:hover/.test(rule.selectorText);
    });
  }

  function keyframesNames() {
    return allRules().filter(function (rule) { return rule.type === 7; }) /* 7 = @keyframes */
      .map(function (rule) { return rule.name; });
  }

  Level.define({
    level: 13,
    title: "讓網頁動起來",
    next: "../14-local-storage/start.html",
    checks: [
      {
        text: "按鈕有 transition（變化會慢慢發生）",
        hint: ".cta { transition: transform 0.2s; }",
        test: function () {
          var durations = H.css(document.querySelector(".cta"), "transition-duration").split(",");
          return durations.some(function (d) { return parseFloat(d) > 0; });
        }
      },
      {
        text: "有寫按鈕的 :hover 樣式",
        hint: ".cta:hover { … }（冒號前後不要有空格）",
        test: function () { return hoverRules().length > 0; }
      },
      {
        text: ":hover 時用 transform 改變按鈕",
        hint: ".cta:hover { transform: scale(1.1); }",
        test: function () {
          return hoverRules().some(function (rule) { return rule.style.transform !== ""; });
        }
      },
      {
        text: "用 @keyframes 定義了一個動畫",
        hint: "@keyframes float { from { … } to { … } }",
        test: function () { return keyframesNames().length > 0; }
      },
      {
        text: ".logo 使用你定義的動畫",
        hint: ".logo { animation: float 1s ease-in-out infinite alternate; }（名字要和 @keyframes 一樣）",
        test: function () {
          /* 看 CSS 規則而不是畫面，這樣系統開了「減少動態效果」也能過關 */
          var names = keyframesNames();
          return allRules().some(function (rule) {
            return rule.selectorText && rule.selectorText.indexOf(".logo") !== -1 &&
              names.indexOf(rule.style.animationName) !== -1;
          });
        }
      }
    ]
  });
})();
