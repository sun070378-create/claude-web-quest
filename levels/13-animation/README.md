# 第 13 關：讓網頁動起來 🎈

> 一點點動態，就能讓網頁從「能用」變成「好玩」。

## 這關會學到

- `:hover`：滑鼠移上去時的樣式
- `transform`：放大、移動、旋轉
- `transition`：讓變化慢慢發生
- `@keyframes` + `animation`：自己設計動畫

## 觀念小抄

### hover + transition

```css
.cta {
  transition: transform 0.2s;    /* transform 改變時，花 0.2 秒變過去 */
}

.cta:hover {
  transform: scale(1.1);         /* 滑鼠移上去時放大 1.1 倍 */
}
```

沒有 `transition`，按鈕會「啪」一下突然變大；有了它，就會平順地變大。

### transform 常用寫法

| 寫法 | 效果 |
|------|------|
| `scale(1.1)` | 放大 1.1 倍 |
| `translateY(-10px)` | 往上移 10px |
| `rotate(10deg)` | 旋轉 10 度 |

### @keyframes 動畫

```css
/* 1. 定義動畫：從哪裡變到哪裡 */
@keyframes float {
  from { transform: translateY(0); }
  to   { transform: translateY(-16px); }
}

/* 2. 播放動畫 */
.logo {
  animation: float 1s ease-in-out infinite alternate;
  /*         名字  時間  速度曲線   一直重複  來回播放 */
}
```

> 💡 `transform` 對文字這種「inline」元素沒有效果，所以 `.logo` 已經幫你設定成 `display: inline-block`。

### 體貼的小細節

有些人看到一直動的東西會頭暈。參考解答裡用了 `@media (prefers-reduced-motion: reduce)`：使用者在系統設定開了「減少動態效果」時，就不播放動畫。

## 任務

打開 `start.html`，完成 5 個任務，然後把滑鼠移到按鈕上看看！

## 額外挑戰

- 讓按鈕 hover 時也稍微往上移：`transform: scale(1.1) translateY(-2px);`
- 用 `@keyframes` 做一個旋轉動畫：`to { transform: rotate(360deg); }`
- 試試 `0%`、`50%`、`100%` 取代 `from`、`to`，做出三段式的動畫。
