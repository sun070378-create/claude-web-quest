# 第 5 關：並排的魔法 🧲

> 一般情況下，區塊會一個疊一個往下排。想讓它們並排？需要一點魔法。

## 這關會學到

- **Flexbox**：最常用的排版方法
- `display: flex`、`gap`、`flex: 1`
- 「容器」和「子元素」的關係

## 觀念小抄

Flexbox 要設定在**容器**（外面那一層）上，裡面的**子元素**就會乖乖並排：

```html
<div class="cards">        ← 容器
  <div class="card">…</div>  ← 子元素
  <div class="card">…</div>
  <div class="card">…</div>
</div>
```

```css
.cards {
  display: flex;   /* 子元素橫向排成一排 */
  gap: 16px;       /* 子元素之間的距離 */
}

.card {
  flex: 1;         /* 每個子元素平分空間 → 一樣寬 */
}
```

### 其他常用的 flex 設定（寫在容器上）

| 寫法 | 效果 |
|------|------|
| `justify-content: center;` | 水平置中 |
| `justify-content: space-between;` | 平均分散，頭尾貼齊 |
| `align-items: center;` | 垂直置中 |
| `flex-direction: column;` | 改成直的排（下一關會用到！） |

## 任務

打開 `start.html`：

1. `.cards` 加上 `display: flex`
2. `.cards` 加上 `gap`
3. `.card` 加上 `flex: 1`

> 💡 這關要在**電腦**上、視窗夠寬時檢查。

## 額外挑戰

- 把 `flex: 1` 拿掉，看看會發生什麼事。
- 試試 `align-items: flex-start;`，看看卡片高度的變化。
