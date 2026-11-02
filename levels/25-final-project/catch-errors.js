/* 裁判的耳朵（不需要修改）：記錄網頁的錯誤，以及載入失敗的檔案（例如 style.css、script.js 檔名打錯） */
window.__pageErrors = [];
window.__failedFiles = [];
window.addEventListener("error", function (event) {
  var target = event.target;
  if (target && target !== window && (target.src || target.href)) {
    window.__failedFiles.push(target.src || target.href);   /* 檔案載入失敗 */
  } else {
    window.__pageErrors.push(event.message);                 /* 程式執行錯誤 */
  }
}, true);
