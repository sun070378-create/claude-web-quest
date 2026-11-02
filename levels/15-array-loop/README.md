# 第二章魔王：我的書櫃 📚

> 真實的網站裡，資料常常有幾十、幾百筆。不可能一筆一筆手寫 HTML，要讓程式幫你「重複做」。

## 這關會學到

- **陣列**（array）`[ ]`：一串資料
- **物件**（object）`{ }`：一筆資料的各個欄位
- `forEach`：對每一筆資料做同樣的事
- `filter`：從一串資料中挑出符合條件的

## 觀念小抄

### 陣列和物件

```js
const books = [
  { title: "小王子", author: "聖修伯里" },    // 第 0 本
  { title: "解憂雜貨店", author: "東野圭吾" }  // 第 1 本
];

books.length;        // 2（有幾本）
books[0].title;      // "小王子"（第 0 本的書名，電腦從 0 開始數）
```

### forEach：一本一本處理

```js
books.forEach(function (book) {
  // 每一本書都會跑一次這裡，book 就是「這一次的那本書」
  console.log(book.title);
});
```

### filter：挑出符合的

```js
const result = books.filter(function (book) {
  return book.title.includes("小");   // true 就留下，false 就丟掉
});
// result 是一個新的陣列，只有書名有「小」的書
```

### 為什麼要寫成函式 showBooks(list)？

因為「顯示全部」和「顯示搜尋結果」做的事情一模一樣，只是書不一樣。
寫成函式之後：

```js
showBooks(books);    // 顯示全部
showBooks(result);   // 顯示搜尋結果
```

## 任務

打開 `start.html`：

1. 在 `books` 加上你自己的書（至少 6 本）
2. 用 `forEach` 把每本書顯示成卡片
3. 顯示「共 N 本」
4. 搜尋功能
5. 找不到時顯示提示

這是第二章的魔王，比較難！記得一次完成一個任務，然後重新整理看看。

## 打倒魔王之後……

恭喜你完成第二章！🎉 你已經會：

- 用 HTML 做表單、用 Grid 排版、用 CSS 做動畫
- 用 JavaScript 存資料、處理一整串資料

試試看把這些用在你的個人網頁 `index.html` 上：

- 「我的創作」改成用陣列和 `forEach` 產生
- 加一個留言表單
- 卡片加上 hover 動畫
