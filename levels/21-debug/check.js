/* 第 21 關的過關條件（裁判用，不需要修改） */
/* 裁判會幫你填數量、按「計算」來測試，最後會把數量改回 0 */
/* 包在函式裡，避免和你寫的變數名稱撞名 */
(function () {
  function quantities() { return document.querySelectorAll(".item input"); }

  /* 填好數量和運費，按「計算」，回傳畫面上的總金額（數字） */
  function order(coffee, filter, mug, shipping) {
    var inputs = quantities();
    inputs[0].value = coffee;
    inputs[1].value = filter;
    inputs[2].value = mug;
    document.querySelector("#shipping").value = String(shipping);
    document.querySelector("#calc-btn").click();
    var match = /(-?[\d.]+)\s*元/.exec(document.querySelector("#total").textContent);
    return match ? Number(match[1]) : NaN;
  }

  function reset() {
    Array.prototype.forEach.call(quantities(), function (input) { input.value = 0; });
    document.querySelector("#shipping").value = "0";
    document.querySelector("#calc-btn").click();
  }

  function withReset(fn) {
    return function () {
      try { return fn(); } finally { reset(); }
    };
  }

  Level.define({
    level: 21,
    title: "抓蟲大作戰",
    next: "../22-split-files/start.html",
    checks: [
      {
        text: "網頁打開時沒有錯誤，而且會顯示總金額",
        hint: "按 F12 打開「主控台（Console）」，看紅色的錯誤訊息和它指出的行數",
        test: function () {
          return (window.__pageErrors || []).length === 0 &&
            /總金額/.test(document.querySelector("#total").textContent);
        }
      },
      {
        text: "按「計算總金額」會重新計算",
        hint: "按了沒反應、主控台也沒有錯誤？仔細看 addEventListener 的事件名稱",
        test: withReset(function () { return order(1, 0, 0, 0) === 450; })
      },
      {
        text: "運費會正確加上去（450 + 60 = 510）",
        hint: "總金額變成很長的數字？select 的 value 是「文字」，要用 Number() 變成數字",
        test: withReset(function () { return order(1, 0, 0, 60) === 510; })
      },
      {
        text: "商品滿 1000 元會打九折",
        hint: "咖啡豆 2 包 + 馬克杯 1 個 = 1280 元，打九折應該是 1152 元。檢查 if 的比較符號",
        test: withReset(function () { return Math.abs(order(2, 0, 1, 0) - 1152) < 0.01; })
      },
      {
        text: "商品未滿 1000 元不打折",
        hint: "濾紙 1 包 = 120 元，不該打折",
        test: withReset(function () { return order(0, 1, 0, 0) === 120; })
      }
    ]
  });
})();
