/* 第 8 關的過關條件（裁判用，不需要修改） */
/* 裁判會幫你按按鈕來測試，最後會按「歸零」恢復 */
function readCount() { return Number(document.querySelector("#count").textContent.trim()); }
function press(id) { document.querySelector("#" + id).click(); }

Level.define({
  level: 8,
  title: "喝水計數器",
  next: "../09-dark-mode/start.html",
  checks: [
    {
      text: "按「＋」，數字加 1",
      hint: "count = count + 1; 之後記得 countText.textContent = count;",
      test: function () {
        var n = readCount();
        press("plus");
        return readCount() === n + 1;
      }
    },
    {
      text: "按「－」，數字減 1",
      hint: "minusButton.addEventListener(\"click\", function () { … });",
      test: function () {
        press("plus");
        var n = readCount();
        press("minus");
        return readCount() === n - 1;
      }
    },
    {
      text: "按「歸零」，數字變回 0",
      hint: "count = 0; 然後更新畫面",
      test: function () {
        press("plus");
        press("plus");
        var before = readCount();
        press("reset");
        return before > 0 && readCount() === 0;
      }
    },
    {
      text: "數字不會變成負的",
      hint: "if (count > 0) { count = count - 1; }",
      test: function () {
        press("reset");
        press("plus");
        var one = readCount();
        press("minus");
        press("minus");
        var ok = one === 1 && readCount() === 0;
        press("reset");
        return ok;
      }
    }
  ]
});
