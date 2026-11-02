/* 第 22 關的過關條件（裁判用，不需要修改） */
/* 包在函式裡，避免和你寫的變數名稱撞名 */
(function () {
  var H = LevelHelpers;

  /* 找到從 style.css 載入的樣式表 */
  function externalSheet() {
    return Array.prototype.filter.call(document.styleSheets, function (sheet) {
      return sheet.href && /\/style\.css$/.test(sheet.href);
    })[0];
  }

  function ruleCount(sheet) {
    try { return sheet.cssRules.length; } catch (e) { return 1; } /* 有些瀏覽器不讓讀本機檔案的規則，能載入就算 */
  }

  Level.define({
    level: 22,
    title: "分門別類",
    next: "../23-accessibility/start.html",
    checks: [
      {
        text: "用 <link> 載入了 style.css，而且裡面有樣式",
        hint: "在 <head> 裡寫 <link rel=\"stylesheet\" href=\"style.css\">，並確認 style.css 和 start.html 在同一個資料夾",
        test: function () {
          var sheet = externalSheet();
          return Boolean(sheet) && ruleCount(sheet) > 0;
        }
      },
      {
        text: "網頁裡已經沒有 <style>（CSS 都搬走了）",
        hint: "CSS 搬到 style.css 之後，把整個 <style>…</style> 刪掉",
        test: function () {
          return Array.prototype.every.call(document.querySelectorAll("style"), function (s) {
            return s.textContent.trim() === "";
          });
        }
      },
      {
        text: "畫面看起來跟原本一樣",
        hint: "樣式沒有套用？檢查 style.css 的檔名、位置，還有 <link> 的 href",
        test: function () {
          return Boolean(externalSheet()) &&
            H.css(document.querySelector("h1"), "color") === "rgb(138, 90, 68)" &&
            H.css(document.body, "text-align") === "center";
        }
      },
      {
        text: "用 <script src=\"script.js\"> 載入程式，按鈕可以正常使用",
        hint: "在 </body> 前寫 <script src=\"script.js\"></script>，並確認 script.js 和 start.html 在同一個資料夾",
        test: function () {
          var hasTag = Array.prototype.some.call(document.scripts, function (s) {
            return /(^|\/)script\.js$/.test(s.getAttribute("src") || "");
          });
          if (!hasTag) return false;
          var quote = document.querySelector("#quote");
          var before = quote.textContent;
          document.querySelector("#quote-btn").click();
          var changed = quote.textContent !== before && quote.textContent.trim() !== "";
          quote.textContent = before;
          return changed;
        }
      },
      {
        text: "網頁裡已經沒有直接寫在 HTML 的程式",
        hint: "JS 搬到 script.js 之後，把原本的 <script>…</script>（有程式碼的那個）刪掉",
        test: function () { return H.userScripts().length === 0; }
      }
    ]
  });
})();
