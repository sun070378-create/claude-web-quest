/* 第 1 關的過關條件（裁判用，不需要修改） */
/* 包在函式裡，避免和你寫的變數名稱撞名 */
(function () {
  Level.define({
    level: 1,
    title: "說聲哈囉",
    next: "../02-list-link-image/start.html",
    checks: [
      {
        text: "網頁標題 <title> 改成你自己的文字",
        hint: "在 <head> 裡找到 <title>請改我</title>，把中間的字換掉",
        test: function () {
          var t = document.title.trim();
          return t !== "" && t !== "請改我";
        }
      },
      {
        text: "有一個 <h1> 大標題，而且裡面有字",
        hint: "例如：<h1>我的第一個網頁</h1>",
        test: function () {
          var h1 = document.querySelector("h1");
          return h1 && h1.textContent.trim() !== "";
        }
      },
      {
        text: "至少有兩個 <p> 段落",
        hint: "每一段用 <p> 開頭、</p> 結尾",
        test: function () {
          var ps = Array.prototype.filter.call(document.querySelectorAll("p"), function (p) {
            return p.textContent.trim() !== "";
          });
          return ps.length >= 2;
        }
      },
      {
        text: "用 <strong> 把一些字變粗體",
        hint: "例如：<p>我最喜歡<strong>貓咪</strong>。</p>",
        test: function () {
          var s = document.querySelector("strong");
          return s && s.textContent.trim() !== "";
        }
      }
    ]
  });
})();
