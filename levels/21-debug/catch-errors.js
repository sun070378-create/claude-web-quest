/* 裁判的耳朵（不需要修改）：把網頁上發生的錯誤記下來，讓檢查面板知道有沒有出錯 */
window.__pageErrors = [];
window.addEventListener("error", function (event) {
  window.__pageErrors.push(event.message);
});
