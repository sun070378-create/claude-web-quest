/* 第 3 關的過關條件（裁判用，不需要修改） */
var H = LevelHelpers;

Level.define({
  level: 3,
  title: "幫網頁上色",
  next: "../04-box-model/start.html",
  checks: [
    {
      text: "body 有背景顏色（不是白色）",
      hint: "body { background-color: #f7f3ea; }",
      test: function () {
        var bg = H.css(document.body, "background-color");
        if (H.isTransparent(bg)) bg = H.css(document.documentElement, "background-color");
        return !H.isTransparent(bg) && bg !== "rgb(255, 255, 255)";
      }
    },
    {
      text: "h1 的文字顏色不是黑色",
      hint: "h1 { color: #3d6b56; }",
      test: function () {
        return H.css(document.querySelector("h1"), "color") !== "rgb(0, 0, 0)";
      }
    },
    {
      text: "p 的字體大小不是預設的 16px",
      hint: "p { font-size: 18px; }",
      test: function () {
        return H.css(document.querySelector("p"), "font-size") !== "16px";
      }
    },
    {
      text: "p 有設定行距",
      hint: "p { line-height: 1.8; }",
      test: function () {
        return H.css(document.querySelector("p"), "line-height") !== "normal";
      }
    },
    {
      text: ".highlight 有背景顏色（螢光筆效果）",
      hint: "記得 class 選擇器前面要加一個點：.highlight { background-color: yellow; }",
      test: function () {
        return !H.isTransparent(H.css(document.querySelector(".highlight"), "background-color"));
      }
    }
  ]
});
