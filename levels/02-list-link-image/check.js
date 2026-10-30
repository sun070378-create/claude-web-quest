/* 第 2 關的過關條件（裁判用，不需要修改） */
/* 包在函式裡，避免和你寫的變數名稱撞名 */
(function () {
  Level.define({
    level: 2,
    title: "清單與連結",
    next: "../03-css-color/start.html",
    checks: [
      {
        text: "有一個 <ul> 清單，裡面至少 3 個 <li>",
        hint: "<ul> 包住整個清單，每一項用 <li>…</li>",
        test: function () {
          return Array.prototype.some.call(document.querySelectorAll("ul"), function (ul) {
            return ul.querySelectorAll("li").length >= 3;
          });
        }
      },
      {
        text: "有一個 <ol> 清單，裡面至少 3 個 <li>",
        hint: "跟 ul 一樣，只是把 ul 換成 ol，前面會變成數字",
        test: function () {
          return Array.prototype.some.call(document.querySelectorAll("ol"), function (ol) {
            return ol.querySelectorAll("li").length >= 3;
          });
        }
      },
      {
        text: "有一個 <a> 連結，網址以 http 開頭",
        hint: "例如：<a href=\"https://www.google.com\">Google</a>",
        test: function () {
          return Array.prototype.some.call(document.querySelectorAll("a"), function (a) {
            return /^https?:\/\//.test(a.getAttribute("href") || "") && a.textContent.trim() !== "";
          });
        }
      },
      {
        text: "有一張成功顯示的 <img> 圖片",
        hint: "例如：<img src=\"cat.svg\" alt=\"貓咪\">，注意檔名要拼對",
        test: function () {
          return Array.prototype.some.call(document.querySelectorAll("img"), function (img) {
            return img.complete && img.naturalWidth > 0;
          });
        }
      },
      {
        text: "圖片有寫 alt 文字說明",
        hint: "在 <img> 裡加上 alt=\"這張圖在畫什麼\"",
        test: function () {
          var img = document.querySelector("img");
          return img && (img.getAttribute("alt") || "").trim() !== "";
        }
      }
    ]
  });
})();
