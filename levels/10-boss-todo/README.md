# 最終魔王：待辦清單 🐉

> 你已經學會了 HTML、CSS 和 JavaScript 的基本功。現在，用它們做出一個真正能用的小工具吧！

## 這關會學到

- 讀取輸入框的文字：`input.value`
- 用 JavaScript **新增**元素：`createElement`、`appendChild`
- **刪除**元素：`remove()`
- 把程式整理成**函式**

## 觀念小抄

### 讀取和清空輸入框

```js
const text = input.value;        // 讀取
input.value = "";                // 清空
input.value.trim() === ""        // 是不是空的（trim 會去掉前後的空白）
```

### 做出新元素，放進網頁

```js
const li = document.createElement("li");   // 做出一個 <li>
li.textContent = "買牛奶";                   // 放文字進去
list.appendChild(li);                       // 放進清單的最後面
```

### 每一項都有自己的按鈕

```js
const deleteButton = document.createElement("button");
deleteButton.textContent = "刪除";
li.appendChild(deleteButton);

deleteButton.addEventListener("click", function () {
  li.remove();                              // 把這一項移除
});
```

> 💡 小提醒：每一項的「點擊」和「刪除」事件，要在**新增那一項的時候**一起綁定。

## 任務

打開 `start.html`，完成五個任務：

1. 按「新增」，清單多一項
2. 新增後清空輸入框
3. 空白不新增
4. 點一下劃掉（切換 `done` class，CSS 已經寫好了）
5. 每一項有「刪除」按鈕

這關比較難，卡住是正常的！可以：

- 一次只做一個任務，做完就重新整理看看哪個打勾了
- 按 `F12` 看主控台有沒有紅色錯誤
- 偷看 `answer.html`，看懂之後**關掉它，自己再寫一次**

## 打倒魔王之後……

恭喜你完成全部 10 關！🎉 接下來可以挑戰：

- 在輸入框按 Enter 也能新增（`keydown` 事件、`event.key === "Enter"`）
- 重新整理後清單不會消失（搜尋關鍵字：`localStorage`）
- 把個人網頁 `index.html` 加上夜間模式、作品卡片並排……用你學到的東西改造它！
