/* 期末專題的過關條件：一份「上線前檢查清單」（裁判用，不需要修改） */
/* 不管你做什麼作品，這些都是一個好網頁該有的基本功 */
/* 包在函式裡，避免和你寫的變數名稱撞名 */
(function () {
  var H = LevelHelpers;
  var PLACEHOLDER_TITLE = "我的期末專題";

  function failed(fileName) {
    return (window.__failedFiles || []).some(function (url) {
      return new RegExp("(^|/)" + fileName.replace(".", "\\.") + "$").test(url);
    });
  }

  function hasFile(selector, attribute, fileName) {
    return Array.prototype.some.call(document.querySelectorAll(selector), function (el) {
      return new RegExp("(^|/)" + fileName.replace(".", "\\.") + "$").test(el.getAttribute(attribute) || "");
    });
  }

  /* 空白頁面也會「沒有錯誤、沒有捲軸」，所以這幾項要等 <main> 裡真的有內容才算 */
  function hasContent() {
    var main = document.querySelector("main");
    return Boolean(main) && main.textContent.trim().length > 0;
  }

  function hasLabel(field) {
    return (field.id && document.querySelector("label[for='" + field.id + "']")) ||
      field.closest("label") || (field.getAttribute("aria-label") || "").trim() !== "";
  }

  Level.define({
    level: 25,
    title: "期末專題",
    next: null,
    checks: [
      {
        text: "網頁標題改成你的作品名稱",
        hint: "把 <title>我的期末專題</title> 改成你自己的名稱",
        test: function () {
          var title = document.title.trim();
          return title !== "" && title !== PLACEHOLDER_TITLE;
        }
      },
      {
        text: "有 <header>、<main>、<footer> 三個區塊，還有一個 <h1>",
        hint: "用這三個標籤把網頁分成頁首、主要內容、頁尾，標題用 <h1>",
        test: function () {
          return Boolean(document.querySelector("header") && document.querySelector("main") &&
            document.querySelector("footer") && document.querySelector("h1"));
        }
      },
      {
        text: "樣式寫在 style.css，而且有成功載入",
        hint: "新增 style.css，在 <head> 加上 <link rel=\"stylesheet\" href=\"style.css\">；網頁裡不要再寫 <style>",
        test: function () {
          var inlineStyle = Array.prototype.some.call(document.querySelectorAll("style"), function (s) {
            return s.textContent.trim() !== "";
          });
          return hasFile("link[rel='stylesheet']", "href", "style.css") && !failed("style.css") && !inlineStyle;
        }
      },
      {
        text: "程式寫在 script.js，而且有成功載入",
        hint: "新增 script.js，在 </body> 前加上 <script src=\"script.js\"></script>；網頁裡不要再寫 <script>程式</script>",
        test: function () {
          return hasFile("script", "src", "script.js") && !failed("script.js") && H.userScripts().length === 0;
        }
      },
      {
        text: "有可以互動的東西（按鈕或輸入框）",
        hint: "加一個 <button> 或表單欄位，用 script.js 讓它做點事",
        test: function () {
          return document.querySelectorAll("main button, main input, main select, main textarea, header button").length > 0;
        }
      },
      {
        text: "網頁執行時沒有任何錯誤",
        hint: "按 F12 打開主控台，把紅色的錯誤都修好（第 21 關）",
        test: function () {
          return hasContent() && hasFile("script", "src", "script.js") && (window.__pageErrors || []).length === 0;
        }
      },
      {
        text: "無障礙：圖片都有 alt，輸入框都有 label",
        hint: "<img alt=\"…\">、<label for=\"…\">（第 23 關）",
        test: function () {
          var imgsOk = Array.prototype.every.call(document.querySelectorAll("img"), function (img) {
            return img.hasAttribute("alt");
          });
          var fields = document.querySelectorAll("input:not([type='hidden']):not([type='submit']):not([type='button']), select, textarea");
          return hasContent() && imgsOk && Array.prototype.every.call(fields, hasLabel);
        }
      },
      {
        text: "畫面沒有左右捲軸（內容沒有超出視窗）",
        hint: "可能是圖片太寬（img { max-width: 100%; }）或某個元素寫死了很大的寬度",
        test: function () { return hasContent() && document.documentElement.scrollWidth <= window.innerWidth + 1; }
      }
    ]
  });
})();
