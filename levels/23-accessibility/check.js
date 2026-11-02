/* 第 23 關的過關條件（裁判用，不需要修改） */
/* 包在函式裡，避免和你寫的變數名稱撞名 */
(function () {
  var H = LevelHelpers;

  /* 把 "rgb(187, 187, 187)" 變成 [187, 187, 187] */
  function parseColor(color) {
    var match = /rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/.exec(color);
    return match ? [Number(match[1]), Number(match[2]), Number(match[3])] : null;
  }

  /* 顏色的「相對亮度」（WCAG 無障礙標準的公式） */
  function luminance(rgb) {
    var c = rgb.map(function (v) {
      v = v / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }

  /* 往外層找，第一個有設定背景色的元素；都沒有就當作白色 */
  function backgroundOf(el) {
    for (var node = el; node && node.nodeType === 1; node = node.parentElement) {
      var bg = H.css(node, "background-color");
      if (!H.isTransparent(bg)) return parseColor(bg);
    }
    return [255, 255, 255];
  }

  function contrast(el) {
    var a = luminance(parseColor(H.css(el, "color")));
    var b = luminance(backgroundOf(el));
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  }

  /* 這個輸入框有沒有標籤：<label for>、被 <label> 包住、或有 aria-label */
  function hasLabel(field) {
    return (field.id && document.querySelector("label[for='" + field.id + "']")) ||
      field.closest("label") || (field.getAttribute("aria-label") || "").trim() !== "";
  }

  Level.define({
    level: 23,
    title: "每個人都能用",
    next: "../24-github/start.html",
    checks: [
      {
        text: "<html> 有設定語言（lang）",
        hint: "<html lang=\"zh-Hant-TW\">",
        test: function () { return (document.documentElement.getAttribute("lang") || "").trim() !== ""; }
      },
      {
        text: "每張圖片都有 alt",
        hint: "<img src=\"…\" alt=\"藍天下的綠色山丘\">",
        test: function () {
          var imgs = document.querySelectorAll("img");
          return imgs.length > 0 && Array.prototype.every.call(imgs, function (img) { return img.hasAttribute("alt"); });
        }
      },
      {
        text: "每個輸入框都有 <label>",
        hint: "<label for=\"name\">你的名字</label> 放在 <input id=\"name\"> 前面，Email 也一樣",
        test: function () {
          var fields = document.querySelectorAll("input, select, textarea");
          return fields.length > 0 && Array.prototype.every.call(fields, hasLabel);
        }
      },
      {
        text: "「報名」是真正的 <button>，不是 <div>",
        hint: "把 <div class=\"btn\" onclick=\"signUp()\">報名</div> 的 div 改成 button（開頭和結尾都要改）",
        test: function () {
          var fakeButtons = document.querySelectorAll("div[onclick], span[onclick]");
          var realButton = Array.prototype.some.call(document.querySelectorAll("button"), function (b) {
            return b.textContent.indexOf("報名") !== -1;
          });
          return fakeButtons.length === 0 && realButton;
        }
      },
      {
        text: "說明文字的顏色夠深，看得清楚（對比至少 4.5 : 1）",
        hint: ".hint { color: #666; }（顏色越深，對比越高）",
        test: function () { return contrast(document.querySelector(".hint")) >= 4.5; }
      }
    ]
  });
})();
