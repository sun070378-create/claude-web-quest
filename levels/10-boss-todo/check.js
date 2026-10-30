/* 最終魔王的過關條件（裁判用，不需要修改） */
/* 裁判會幫你新增一個測試項目，檢查完會把它刪掉 */
var H = LevelHelpers;
var TEST_TEXT = "裁判的測試項目";

function items() { return document.querySelectorAll("#todo-list li"); }

/* 輸入文字並按新增，回傳新出現的那一項（沒有就回傳 null） */
function addTestItem(text) {
  var input = document.querySelector("#todo-input");
  var before = items().length;
  input.value = text;
  document.querySelector("#add-btn").click();
  var list = items();
  return list.length > before ? list[list.length - 1] : null;
}

function cleanUp() {
  Array.prototype.forEach.call(items(), function (li) {
    if (li.textContent.indexOf(TEST_TEXT) !== -1) li.remove();
  });
  document.querySelector("#todo-input").value = "";
}

/* 包一層：不管檢查成功或失敗，都把測試項目清掉 */
function withCleanUp(fn) {
  return function () {
    try { return fn(); } finally { cleanUp(); }
  };
}

Level.define({
  level: 10,
  title: "最終魔王：待辦清單",
  next: null,
  checks: [
    {
      text: "按「新增」，清單會多一項，而且是輸入的文字",
      hint: "document.createElement(\"li\") → 設定文字 → list.appendChild(li)",
      test: withCleanUp(function () {
        var li = addTestItem(TEST_TEXT);
        return li && li.textContent.indexOf(TEST_TEXT) !== -1;
      })
    },
    {
      text: "新增之後，輸入框會清空",
      hint: "新增完寫 input.value = \"\";",
      test: withCleanUp(function () {
        return addTestItem(TEST_TEXT) && document.querySelector("#todo-input").value === "";
      })
    },
    {
      text: "輸入框是空白時，不會新增",
      hint: "if (input.value.trim() === \"\") { return; }",
      test: withCleanUp(function () {
        if (!addTestItem(TEST_TEXT)) return false;
        var before = items().length;
        addTestItem("   ");
        return items().length === before;
      })
    },
    {
      text: "點一下某一項，會劃掉（切換 done）",
      hint: "li.addEventListener(\"click\", function () { li.classList.toggle(\"done\"); });",
      test: withCleanUp(function () {
        var li = addTestItem(TEST_TEXT);
        if (!li) return false;
        li.click();
        return li.classList.contains("done");
      })
    },
    {
      text: "每一項都有「刪除」按鈕，按了會移除那一項",
      hint: "在 li 裡放一個 button，按下時執行 li.remove();",
      test: withCleanUp(function () {
        var li = addTestItem(TEST_TEXT);
        var button = li && li.querySelector("button");
        if (!button) return false;
        button.click();
        return !document.body.contains(li);
      })
    }
  ]
});
