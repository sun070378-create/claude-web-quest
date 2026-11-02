# 第 17 關：今天吃什麼？ 🍜

> 選擇困難的救星！讓程式幫你擲骰子。

## 這關會學到

- `Math.random()` 產生隨機數
- `Math.floor()` 去掉小數
- 用**索引**（index）從陣列拿東西
- `push` 把東西加進陣列

## 觀念小抄

### 隨機選一個

```js
Math.random();                 // 0.7342…（0 到 1 之間，不會剛好是 1）
Math.random() * 6;             // 4.405…（0 到 6 之間）
Math.floor(Math.random() * 6); // 4（0、1、2、3、4、5 其中一個）
```

陣列的索引是從 **0** 開始數的：

```js
const foods = ["牛肉麵", "滷肉飯", "水餃"];
foods[0];        // "牛肉麵"
foods[2];        // "水餃"
foods.length;    // 3
```

所以「隨機選一個」就是：

```js
const index = Math.floor(Math.random() * foods.length);
foods[index];
```

### 加進陣列

```js
foods.push("拉麵");   // 加到最後面，foods.length 變成 4
```

> 💡 `const` 的意思是「這個變數不會換成別的陣列」，但陣列**裡面的東西**還是可以增加、刪除。

## 任務

打開 `start.html`：

1. 寫 `randomItem(array)`
2. 按「幫我選！」顯示隨機結果
3. 寫 `showFoods()` 顯示所有選項
4. 可以加入新的選項

## 額外挑戰

- 讓結果出現前先「跑馬燈」：用 `setTimeout` 快速換幾次名字，最後才停下來。（下一關會學到計時器！）
- 每個選項旁邊加一個 ✕ 按鈕，可以刪除選項。（提示：`foods.splice(索引, 1)`）
- 用第 14 關學到的 `localStorage` 記住你加的選項。
