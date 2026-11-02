# 第 19 關：天氣小幫手 🌤️

> 到目前為止，網頁上的資料都是你自己打的。這一關，要從網路上「要」真實的資料回來！

## 這關會學到

- `fetch`：向網路上的服務要資料
- `async` / `await`：等待需要時間的事
- `try` / `catch`：出錯時不要整個壞掉
- 什麼是 **API**、什麼是 **JSON**

## 觀念小抄

### API 是什麼？

API 就像餐廳的點餐窗口：你照規定的格式點餐（網址），它就把資料送回來。
這關用的是 [Open-Meteo](https://open-meteo.com/)，免費、不用註冊的天氣服務。

試試看：直接把這個網址貼到瀏覽器打開，就能看到它回傳的資料：

```
https://api.open-meteo.com/v1/forecast?latitude=25.03&longitude=121.56&current=temperature_2m,wind_speed_10m
```

回傳的格式叫 **JSON**，長得很像 JavaScript 的物件：

```json
{
  "current": {
    "temperature_2m": 24.3,
    "wind_speed_10m": 10.2
  }
}
```

### fetch + async / await

```js
async function loadWeather(lat, lon) {
  const response = await fetch(網址);    // 送出請求，「等」它回應
  const data = await response.json();    // 把回應變成物件，也要「等」
  console.log(data.current.temperature_2m);
}
```

- 網路需要時間，所以要用 `await`「等」它。
- 有用到 `await` 的函式，前面要加 `async`。

### try / catch

```js
try {
  // 試著做這些事
} catch (error) {
  // 上面出錯的話（例如沒網路），就改做這裡，網頁不會整個壞掉
}
```

## 任務

打開 `start.html`：

1. 寫 `async function loadWeather(lat, lon)`，用 `fetch` 拿資料
2. 顯示溫度和風速
3. 網頁打開時讀取目前的城市
4. 切換城市時重新讀取
5. 出錯時顯示「讀取失敗」

> 💡 這關需要**連上網路**。裁判會等資料回來才檢查，面板會先顯示 ⏳。
> 想看 fetch 送出了什麼：按 `F12` →「Network（網路）」分頁，切換城市就會看到新的一筆。

## 額外挑戰

- 多顯示一個資料：在網址的 `current=` 後面加上 `,relative_humidity_2m`（濕度）。
- 依溫度換表情：30 度以上顯示 🥵，15 度以下顯示 🥶。
- 加入你住的城市。（用 Google 地圖查經緯度：在地圖上按右鍵，第一行就是）
