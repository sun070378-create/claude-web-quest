# 第 14 關：不會忘記的筆記本 🗒️

> 還記得第 8 關的計數器嗎？重新整理後數字就歸零了。這一關，我們要讓網頁「記住」東西。

## 這關會學到

- `localStorage`：把資料存在瀏覽器裡
- `input` 事件：內容一有變化就觸發
- `null` 是什麼

## 觀念小抄

### localStorage 就像瀏覽器裡的小抽屜

每個抽屜有一個**名字**，裡面放一段**文字**：

```js
localStorage.setItem("note", "今天天氣很好");   // 存：放進名叫 note 的抽屜
localStorage.getItem("note");                  // 拿：打開 note 抽屜看裡面
localStorage.removeItem("note");               // 刪：把 note 抽屜清空
```

- 關掉網頁、甚至重新開機，資料都還在。
- 資料只存在**這台電腦的這個瀏覽器**裡，換一台電腦就看不到了。
- 抽屜裡沒有東西時，`getItem` 會得到 `null`（意思是「什麼都沒有」）。

### 網頁打開時，把資料拿回來

```js
const saved = localStorage.getItem("note");
if (saved !== null) {      // !== 是「不等於」
  note.value = saved;
}
```

### input 事件

```js
note.addEventListener("input", function () {
  // 打字、貼上、刪除……只要內容有變就會執行
});
```

### 偷看抽屜裡有什麼

按 `F12` →「Application（應用程式）」分頁 → 左邊的「Local Storage」，就能看到存了什麼。

## 任務

打開 `start.html`：

1. 打字時存進 localStorage
2. 網頁打開時拿回來（完成後打幾個字，按重新整理試試看！）
3. 顯示字數
4. 清空按鈕

> 💡 第 2 個條件需要你**先打幾個字，再重新整理**，才能檢查。

## 額外挑戰

- 回到第 8 關，讓喝水計數器重新整理後也不會歸零。
  （提示：localStorage 只能存文字，拿出來後要用 `Number(…)` 變回數字）
- 回到魔王關，讓待辦清單也能記住。（這個比較難，可以搜尋「JSON.stringify」）
