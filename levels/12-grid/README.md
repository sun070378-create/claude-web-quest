# 第 12 關：照片牆 📷

> Flexbox 擅長排「一排」，Grid 擅長排「一整個格子」。

## 這關會學到

- **CSS Grid** 排版
- `grid-template-columns` 和 `fr` 單位
- 讓一個格子橫跨好幾欄：`grid-column: span 2`

## 觀念小抄

```css
.gallery {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;   /* 3 欄，一樣寬 */
  gap: 12px;                            /* 格子間距 */
}

.featured {
  grid-column: span 2;                  /* 這一格佔 2 欄 */
}
```

### fr 是什麼？

`fr` 的意思是「一份」。`1fr 1fr 1fr` 就是把寬度平分成 3 份。

- `2fr 1fr`：左邊是右邊的兩倍寬
- `200px 1fr`：左邊固定 200px，右邊佔剩下的全部

偷懶寫法：`repeat(3, 1fr)` 等於 `1fr 1fr 1fr`。

### Flexbox 還是 Grid？

| 情況 | 用哪個 |
|------|------|
| 一排按鈕、導覽列、卡片並排 | Flexbox |
| 照片牆、整頁版面、需要「對齊格線」 | Grid |

兩個都很常用，而且可以混著用！

## 任務

打開 `start.html`：

1. `.gallery` 使用 Grid
2. 分成 3 欄
3. 加上空隙
4. `.featured` 橫跨 2 欄
5. 手機版改成 2 欄

> 💡 請在電腦上、視窗夠寬時檢查。

## 額外挑戰

- 試試 `grid-row: span 2;`，讓一張照片變成兩格高。
- 試試魔法寫法：`grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));`，然後把視窗拉寬、拉窄，看看會怎樣。（連 `@media` 都不用寫了！）
