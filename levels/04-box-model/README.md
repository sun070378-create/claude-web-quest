# 第 4 關：盒子的秘密 📦

> 在瀏覽器眼中，網頁上的每個東西都是一個「盒子」。

## 這關會學到

- **盒子模型**：內容、內距 padding、邊框 border、外距 margin
- 圓角、陰影、限制寬度、置中

## 觀念小抄

想像一幅裱框的畫：

```
┌─────────── margin（外距：框和牆壁、和其他畫的距離）
│ ┌───────── border（邊框：畫框本身）
│ │ ┌─────── padding（內距：畫框和畫之間的留白）
│ │ │  內容
```

```css
.card {
  padding: 24px;                 /* 四邊都是 24px */
  padding: 24px 28px;            /* 上下 24px、左右 28px */
  border: 1px solid #cccccc;     /* 粗細 樣式 顏色 */
  border-radius: 12px;           /* 圓角 */
  max-width: 400px;              /* 最多 400px 寬 */
  margin: 40px auto;             /* 上下 40px、左右自動 = 置中 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);  /* 陰影 */
}
```

### 小技巧：用開發者工具看盒子

在網頁上按右鍵 →「檢查」（或按 `F12`），點選一個元素，
右邊會出現一個彩色的盒子圖，顯示它的 margin、border、padding。

## 任務

打開 `start.html`，在 `.card { }` 裡完成 6 個任務，把它變成一張名片。

## 額外挑戰

- 把 `border` 改成 `border-left: 6px solid tomato;`，只留左邊框。
- 試試 `border-radius: 50%;` 放在一張正方形圖片上，會變圓形。
