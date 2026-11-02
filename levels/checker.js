/* ==============================================================
   闖關檢查器（checker.js）
   --------------------------------------------------------------
   這個檔案是「裁判」，你不需要修改它，也不需要看懂它。
   它會在網頁右下角放一個面板，自動檢查你有沒有完成每個過關條件。

   每一關的 check.js 會呼叫 Level.define(...) 告訴裁判要檢查什麼。
   ============================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "webquest-progress";

  /* 關卡地圖的位置：跟 checker.js 放在同一個資料夾（levels/） */
  var MAP_URL = new URL("index.html", document.currentScript.src).href;

  /* 讀取 / 儲存闖關進度（存在瀏覽器裡，讀不到也不會壞掉） */
  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function saveProgress(level) {
    try {
      var progress = loadProgress();
      progress[level] = true;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      /* 瀏覽器不讓存就算了，不影響遊戲 */
    }
  }

  /* 每個檢查最多等幾毫秒（給需要「等一下」的檢查用，例如計時器、網路） */
  var ASYNC_TIMEOUT = 10000;

  /* 一個一個執行檢查條件，出錯就當作「還沒完成」。
     有些檢查需要等待（會回傳 Promise），所以要等前一個做完才做下一個，
     每做完一個就呼叫 onUpdate 更新面板。ok 是 null 代表「還在檢查」。 */
  function runChecks(checks, onUpdate) {
    var results = checks.map(function (check) {
      return { text: check.text, hint: check.hint, ok: null };
    });

    function runOne(index) {
      if (index >= checks.length) {
        onUpdate(results, true);
        return;
      }
      var finish = function (ok) {
        results[index].ok = Boolean(ok);
        onUpdate(results, false);
        runOne(index + 1);
      };
      var value;
      try {
        value = checks[index].test();
      } catch (e) {
        finish(false);
        return;
      }
      if (value && typeof value.then === "function") {
        var timer = setTimeout(function () { finish(false); finish = function () {}; }, ASYNC_TIMEOUT);
        value.then(
          function (ok) { clearTimeout(timer); finish(ok); },
          function () { clearTimeout(timer); finish(false); }
        );
      } else {
        finish(value);
      }
    }

    onUpdate(results, false);
    runOne(0);
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /* 面板的樣式：放在 Shadow DOM 裡，不會被你寫的 CSS 影響 */
  var PANEL_CSS = [
    ":host { all: initial; }",
    ".panel { position: fixed; right: 16px; bottom: 16px; z-index: 2147483647;",
    "  width: 320px; max-width: calc(100vw - 32px); max-height: calc(100vh - 32px); overflow: auto;",
    "  background: #fffdf7; color: #2b2b2b; border: 2px solid #2b2b2b; border-radius: 12px;",
    "  box-shadow: 4px 4px 0 #2b2b2b; font: 14px/1.6 'Noto Sans TC','PingFang TC','Microsoft JhengHei',sans-serif; }",
    ".head { display: flex; align-items: center; justify-content: space-between; gap: 8px;",
    "  padding: 10px 14px; border-bottom: 2px solid #2b2b2b; background: #ffe69a; border-radius: 10px 10px 0 0; cursor: pointer; }",
    ".title { font-weight: 700; }",
    ".toggle { font-size: 12px; color: #555; white-space: nowrap; }",
    ".body { padding: 12px 14px; }",
    ".bar { height: 10px; background: #eee; border: 1px solid #2b2b2b; border-radius: 5px; overflow: hidden; margin-bottom: 10px; }",
    ".bar span { display: block; height: 100%; background: #5bb57a; }",
    "ul { list-style: none; margin: 0; padding: 0; }",
    "li { padding: 6px 0; border-bottom: 1px dashed #ddd; }",
    "li:last-child { border-bottom: 0; }",
    ".hint { display: block; margin-top: 2px; font-size: 12px; color: #8a6d00; }",
    ".done { color: #888; }",
    ".win { margin-top: 10px; padding: 10px; background: #e3f6e8; border: 2px solid #2b2b2b; border-radius: 8px; text-align: center; }",
    ".win strong { display: block; font-size: 18px; }",
    ".note { margin-top: 10px; font-size: 12px; color: #666; }",
    "a { color: #1f6feb; }",
    "button { font: inherit; margin-top: 10px; padding: 4px 12px; border: 2px solid #2b2b2b; border-radius: 6px; background: #fff; cursor: pointer; }",
    ".collapsed .body { display: none; }",
    ".collapsed .head { border-bottom: 0; border-radius: 10px; }"
  ].join("\n");

  function render(config, results, finished) {
    var passed = results.filter(function (r) { return r.ok; }).length;
    var total = results.length;
    var allDone = passed === total;
    /* 參考解答：answer.html，或放在 answer/ 資料夾裡的網頁 */
    var isAnswer = /answer(\.html$|\/)/.test(location.pathname);

    if (allDone && !isAnswer) {
      saveProgress(config.level);
    }

    /* 已經有面板就重畫，沒有就建立一個 */
    var host = document.getElementById("webquest-checker");
    var wasCollapsed;
    if (!host) {
      host = document.createElement("div");
      host.id = "webquest-checker";
      host.attachShadow({ mode: "open" });
      document.body.appendChild(host);
      /* 手機螢幕比較小，一開始先收起來 */
      wasCollapsed = window.innerWidth < 600;
    } else {
      wasCollapsed = host.shadowRoot.querySelector(".panel.collapsed") !== null;
    }
    var root = host.shadowRoot;

    var items = results.map(function (r) {
      if (r.ok === null) {
        return "<li>⏳ " + escapeHtml(r.text) + "<span class='hint'>檢查中，請稍等……</span></li>";
      }
      return "<li class='" + (r.ok ? "done" : "") + "'>" +
        (r.ok ? "✅ " : "⬜ ") + escapeHtml(r.text) +
        (!r.ok && r.hint ? "<span class='hint'>💡 " + escapeHtml(r.hint) + "</span>" : "") +
        "</li>";
    }).join("");

    var win = "";
    if (allDone) {
      win = "<div class='win'><strong>🎉 過關！</strong>" +
        (config.next
          ? "<a href='" + config.next + "'>前往下一關 →</a>"
          : "你完成了目前所有的關卡！太厲害了！🏆") +
        "</div>";
    }

    root.innerHTML =
      "<style>" + PANEL_CSS + "</style>" +
      "<div class='panel" + (wasCollapsed ? " collapsed" : "") + "'>" +
      "  <div class='head'><span class='title'>第 " + config.level + " 關：" + escapeHtml(config.title) + "</span>" +
      "  <span class='toggle'>" + passed + " / " + total + " ▾</span></div>" +
      "  <div class='body'>" +
      "    <div class='bar'><span style='width:" + Math.round((passed / total) * 100) + "%'></span></div>" +
      "    <ul>" + items + "</ul>" + win +
      (isAnswer ? "<div class='note'>📖 這是參考解答。自己的作品請寫在 start.html。</div>" : "") +
      "    <button type='button' class='recheck'>重新檢查</button>" +
      "    <div class='note'>改完程式碼記得存檔，再按瀏覽器的「重新整理」。<br><a href='" + MAP_URL + "'>🗺️ 回到關卡地圖</a></div>" +
      "  </div>" +
      "</div>";

    /* 點標題列可以收合面板，免得擋住你的網頁 */
    root.querySelector(".head").addEventListener("click", function () {
      root.querySelector(".panel").classList.toggle("collapsed");
    });
    root.querySelector(".recheck").addEventListener("click", function () {
      if (!running) start(config);
    });

    /* 全部檢查完，才把結果交給自動測試 */
    if (finished) {
      window.__levelResult = { passed: passed, total: total, results: results };
    }
  }

  var running = false;

  function start(config) {
    running = true;
    window.__levelResult = undefined;
    runChecks(config.checks, function (results, finished) {
      if (finished) running = false;
      render(config, results, finished);
    });
  }

  window.Level = {
    define: function (config) {
      /* 「下一關」的路徑是相對於 check.js 寫的，換成完整網址，放在子資料夾的網頁也能用 */
      if (config.next && document.currentScript) {
        config.next = new URL(config.next, document.currentScript.src).href;
      }
      if (document.readyState === "complete") {
        start(config);
      } else {
        window.addEventListener("load", function () { start(config); });
      }
    }
  };

  /* ---------- 給各關 check.js 使用的小工具 ---------- */
  window.LevelHelpers = {
    /* 等待幾毫秒 */
    wait: function (ms) {
      return new Promise(function (resolve) { setTimeout(resolve, ms); });
    },
    /* 每隔一下檢查 condition()，變成 true 就成功；超過 timeout 毫秒就失敗 */
    waitFor: function (condition, timeout) {
      var deadline = Date.now() + (timeout || 5000);
      return new Promise(function (resolve) {
        (function poll() {
          var ok = false;
          try { ok = condition(); } catch (e) { ok = false; }
          if (ok) resolve(true);
          else if (Date.now() > deadline) resolve(false);
          else setTimeout(poll, 100);
        })();
      });
    },
    /* 取得元素的計算後樣式 */
    css: function (el, prop) {
      return getComputedStyle(el).getPropertyValue(prop).trim();
    },
    /* 顏色是不是「沒有設定」（透明） */
    isTransparent: function (color) {
      return color === "transparent" || color === "rgba(0, 0, 0, 0)";
    },
    /* 找出所有 @media 規則（只看寫在網頁裡的 <style>） */
    mediaRules: function () {
      var found = [];
      Array.prototype.forEach.call(document.styleSheets, function (sheet) {
        var rules;
        try { rules = sheet.cssRules; } catch (e) { return; }
        Array.prototype.forEach.call(rules || [], function (rule) {
          if (rule.type === 4) found.push(rule); /* 4 = CSSMediaRule */
        });
      });
      return found;
    },
    /* 你自己寫的 <script>（不含裁判的檔案） */
    userScripts: function () {
      return Array.prototype.filter.call(document.scripts, function (s) {
        return !s.src && s.textContent.trim().length > 0;
      });
    }
  };
})();
