/* 第 6 關的過關條件（裁判用，不需要修改） */
var H = LevelHelpers;

/* 找出「寬度在某個值以下」才生效的 @media 規則 */
function maxWidthMedia() {
  return H.mediaRules().filter(function (rule) {
    return /max-width/.test(rule.media.mediaText);
  });
}

Level.define({
  level: 6,
  title: "手機也要好看",
  next: "../07-first-js/start.html",
  checks: [
    {
      text: "有 viewport 設定",
      hint: "在 <head> 裡加上 <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
      test: function () {
        var meta = document.querySelector("meta[name='viewport']");
        return meta && /width\s*=\s*device-width/.test(meta.getAttribute("content") || "");
      }
    },
    {
      text: "圖片不會超出畫面（max-width: 100%）",
      hint: "img { max-width: 100%; height: auto; }",
      test: function () {
        var img = document.querySelector("img");
        return img && H.css(img, "max-width") === "100%";
      }
    },
    {
      text: "有一個 @media (max-width: …) 規則",
      hint: "@media (max-width: 600px) { …在這裡寫手機版的 CSS… }",
      test: function () {
        return maxWidthMedia().length > 0;
      }
    },
    {
      text: "在 @media 裡，把 .cards 改成直的排",
      hint: "在 @media 的大括號裡寫：.cards { flex-direction: column; }",
      test: function () {
        return maxWidthMedia().some(function (media) {
          return Array.prototype.some.call(media.cssRules, function (rule) {
            return rule.selectorText && rule.selectorText.indexOf(".cards") !== -1 &&
              (rule.style.flexDirection === "column" || rule.style.display === "block" || rule.style.flexWrap === "wrap");
          });
        });
      }
    }
  ]
});
