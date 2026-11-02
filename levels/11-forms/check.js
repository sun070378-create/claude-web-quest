/* 第 11 關的過關條件（裁判用，不需要修改） */
/* 包在函式裡，避免和你寫的變數名稱撞名 */
(function () {
  function form() { return document.querySelector("form"); }
  function inForm(selector) { return form() ? form().querySelectorAll(selector) : []; }

  /* 這個欄位有沒有對應的 <label>（for 跟 id 一樣） */
  function hasLabel(field) {
    return field.id && document.querySelector("label[for='" + field.id + "']") !== null;
  }

  Level.define({
    level: 11,
    title: "留言表單",
    next: "../12-grid/start.html",
    checks: [
      {
        text: "有一個 <form> 表單",
        hint: "用 <form> … </form> 包住所有欄位",
        test: function () { return form() !== null; }
      },
      {
        text: "有文字輸入框，而且有對應的 <label>",
        hint: "<label for=\"name\">你的名字</label> <input id=\"name\" type=\"text\">",
        test: function () {
          return Array.prototype.some.call(inForm("input[type='text'], input:not([type])"), hasLabel);
        }
      },
      {
        text: "有 type=\"email\" 的輸入框，而且有 <label>",
        hint: "<label for=\"email\">Email</label> <input id=\"email\" type=\"email\">",
        test: function () {
          return Array.prototype.some.call(inForm("input[type='email']"), hasLabel);
        }
      },
      {
        text: "有一個 <select> 下拉選單，至少 3 個選項",
        hint: "<select> 裡面放三個 <option>選項</option>",
        test: function () {
          return Array.prototype.some.call(inForm("select"), function (s) { return s.options.length >= 3; });
        }
      },
      {
        text: "有一個 <textarea> 多行文字框",
        hint: "<textarea id=\"message\"></textarea>（記得有結尾標籤）",
        test: function () { return inForm("textarea").length > 0; }
      },
      {
        text: "至少兩個欄位是必填（required）",
        hint: "在 <input> 或 <textarea> 裡加上 required，例如 <input id=\"name\" required>",
        test: function () { return inForm("[required]").length >= 2; }
      },
      {
        text: "有一個送出按鈕",
        hint: "<button type=\"submit\">送出</button>",
        test: function () {
          return inForm("button[type='submit'], button:not([type]), input[type='submit']").length > 0;
        }
      }
    ]
  });
})();
