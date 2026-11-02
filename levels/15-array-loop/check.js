/* 第二章魔王的過關條件（裁判用，不需要修改） */
/* 裁判會幫你在搜尋框打字測試，測完會清空搜尋框 */
/* 包在函式裡，避免和你寫的變數名稱撞名 */
(function () {

  /* 讀取你寫的 books 陣列（讀不到就當作沒有） */
  function bookData() {
    try { return Array.isArray(books) ? books : []; } catch (e) { return []; }
  }

  function shownCards() { return document.querySelectorAll("#book-list .book"); }

  function search(keyword) {
    var input = document.querySelector("#search");
    input.value = keyword;
    input.dispatchEvent(new Event("input", { bubbles: true }));
  }

  function withReset(fn) {
    return function () {
      try { return fn(); } finally { search(""); }
    };
  }

  /* 有幾本書的書名包含這個關鍵字（正確答案） */
  function expectedCount(keyword) {
    return bookData().filter(function (b) { return String(b.title).indexOf(keyword) !== -1; }).length;
  }

  Level.define({
    level: 15,
    title: "第二章魔王：我的書櫃",
    next: "../16-functions/start.html",
    checks: [
      {
        text: "書櫃裡至少有 6 本書（加上你自己的書）",
        hint: "在 books 陣列最後加上 { title: \"書名\", author: \"作者\" }，上一本的結尾要有逗號",
        test: function () {
          var list = bookData();
          return list.length >= 6 && list.every(function (b) { return b && b.title && b.author; });
        }
      },
      {
        text: "每一本書都顯示成一張 .book 卡片，有書名",
        hint: "寫 showBooks(list)，用 forEach 做出 <div class=\"book\">，最後呼叫 showBooks(books);",
        test: function () {
          var list = bookData();
          var cards = shownCards();
          return list.length > 0 && cards.length === list.length &&
            cards[0].textContent.indexOf(list[0].title) !== -1;
        }
      },
      {
        text: "會顯示目前有幾本書",
        hint: "resultCount.textContent = \"共 \" + list.length + \" 本\";",
        test: withReset(function () {
          var all = String(bookData().length);
          var showsAll = document.querySelector("#result-count").textContent.indexOf(all) !== -1;
          var keyword = bookData()[0].title;
          search(keyword);
          var showsFiltered = document.querySelector("#result-count").textContent.indexOf(String(expectedCount(keyword))) !== -1;
          return showsAll && showsFiltered;
        })
      },
      {
        text: "在搜尋框打字，只會顯示書名符合的書",
        hint: "searchInput.addEventListener(\"input\", …)，用 books.filter 找出符合的書，再 showBooks(result)",
        test: withReset(function () {
          var keyword = bookData()[0].title;
          search(keyword);
          var cards = shownCards();
          return cards.length === expectedCount(keyword) && cards.length < bookData().length &&
            cards[0].textContent.indexOf(keyword) !== -1;
        })
      },
      {
        text: "找不到時，顯示「找不到符合的書」",
        hint: "在 showBooks 裡：if (list.length === 0) { bookList.innerHTML = \"<p>找不到符合的書</p>\"; }",
        test: withReset(function () {
          search("裁判亂打的關鍵字ㄅㄆㄇ");
          return shownCards().length === 0 &&
            document.querySelector("#book-list").textContent.indexOf("找不到") !== -1;
        })
      }
    ]
  });
})();
