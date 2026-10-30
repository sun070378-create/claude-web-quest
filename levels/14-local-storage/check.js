/* 第 14 關的過關條件（裁判用，不需要修改） */
/* 裁判會幫你打字測試，測完會把你的筆記恢復原狀 */
/* 包在函式裡，避免和你寫的變數名稱撞名 */
(function () {

  function storedNote() {
    try { return localStorage.getItem("note"); } catch (e) { return null; }
  }

  /* 網頁剛打開時的狀態（在裁判測試之前先記下來） */
  var openedWith = {
    stored: storedNote(),
    value: document.querySelector("#note").value
  };

  function typeText(text) {
    var note = document.querySelector("#note");
    note.value = text;
    note.dispatchEvent(new Event("input", { bubbles: true }));
  }

  /* 測完把筆記和 localStorage 恢復成原來的樣子 */
  function restore(original) {
    typeText(original.value);
    try {
      if (original.stored === null) localStorage.removeItem("note");
      else localStorage.setItem("note", original.stored);
    } catch (e) { /* 存不了就算了 */ }
  }

  function withRestore(fn) {
    return function () {
      var original = { value: document.querySelector("#note").value, stored: storedNote() };
      try { return fn(); } finally { restore(original); }
    };
  }

  Level.define({
    level: 14,
    title: "不會忘記的筆記本",
    next: "../15-array-loop/start.html",
    checks: [
      {
        text: "打字時，內容會存進 localStorage 的 \"note\"",
        hint: "note.addEventListener(\"input\", function () { localStorage.setItem(\"note\", note.value); });",
        test: withRestore(function () {
          typeText("裁判測試：你好");
          return storedNote() === "裁判測試：你好";
        })
      },
      {
        text: "重新整理後，之前寫的內容還在",
        hint: "先完成上一條，打幾個字，再按重新整理。網頁打開時要用 localStorage.getItem(\"note\") 拿回內容",
        test: function () {
          return openedWith.stored !== null && openedWith.stored !== "" && openedWith.value === openedWith.stored;
        }
      },
      {
        text: "會顯示目前的字數",
        hint: "charCount.textContent = note.value.length + \" 字\";（打字時更新）",
        test: withRestore(function () {
          var counter = document.querySelector("#char-count");
          typeText("一二三四五");
          var five = counter.textContent.indexOf("5") !== -1;
          typeText("一二三四五六七八九十一二");
          var twelve = counter.textContent.indexOf("12") !== -1;
          return five && twelve;
        })
      },
      {
        text: "按「清空筆記」，畫面和 localStorage 都會清空",
        hint: "note.value = \"\"; 再加上 localStorage.removeItem(\"note\");",
        test: withRestore(function () {
          typeText("等一下會被清掉");
          document.querySelector("#clear-btn").click();
          var stored = storedNote();
          return document.querySelector("#note").value === "" && (stored === null || stored === "");
        })
      }
    ]
  });
})();
