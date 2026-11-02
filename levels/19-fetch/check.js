/* 第 19 關的過關條件（裁判用，不需要修改） */
/* 這關需要連上網路。裁判會幫你切換城市、假裝斷網來測試，最後會切回原本的城市 */
/* 包在函式裡，避免和你寫的變數名稱撞名 */
(function () {
  var H = LevelHelpers;

  function select() { return document.querySelector("#city"); }
  function hasNumber(selector) { return /\d/.test(document.querySelector(selector).textContent); }

  /* 切換下拉選單，就像使用者自己選的一樣 */
  function chooseCity(value) {
    select().value = value;
    select().dispatchEvent(new Event("change", { bubbles: true }));
  }

  /* 找一個跟現在不一樣的城市 */
  function anotherCity() {
    var options = Array.prototype.map.call(select().options, function (o) { return o.value; });
    return options.filter(function (v) { return v !== select().value; })[0];
  }

  Level.define({
    level: 19,
    title: "天氣小幫手",
    next: "../20-boss-memory/start.html",
    checks: [
      {
        text: "在 <script> 裡使用 fetch",
        hint: "const response = await fetch(url);",
        test: function () {
          return H.userScripts().some(function (s) {
            return /^(?!\s*\/\/).*\bfetch\s*\(/m.test(s.textContent);
          });
        }
      },
      {
        text: "網頁打開後，會顯示現在溫度",
        hint: "temperatureText.textContent = data.current.temperature_2m + \"°C\";（也請確認電腦有連上網路）",
        test: function () { return H.waitFor(function () { return hasNumber("#temperature"); }, 8000); }
      },
      {
        text: "會顯示風速",
        hint: "windText.textContent = data.current.wind_speed_10m + \" km/h\";",
        test: function () { return H.waitFor(function () { return hasNumber("#wind"); }, 8000); }
      },
      {
        text: "切換城市時，會重新讀取那個城市的天氣",
        hint: "citySelect.addEventListener(\"change\", function () { …拆出緯度經度，再呼叫 loadWeather… });",
        test: function () {
          var original = select().value;
          var target = anotherCity();
          var realFetch = window.fetch;
          var askedFor = [];
          window.fetch = function (url) {
            askedFor.push(String(url));
            return realFetch.apply(this, arguments);
          };
          chooseCity(target);
          var lat = target.split(",")[0];
          return H.waitFor(function () {
            return askedFor.some(function (u) { return u.indexOf(lat) !== -1; });
          }, 3000).then(function (ok) {
            window.fetch = realFetch;
            chooseCity(original);
            return ok;
          });
        }
      },
      {
        text: "網路出問題時，會顯示「讀取失敗」",
        hint: "把 fetch 那段包在 try { … } catch (error) { statusText.textContent = \"讀取失敗\"; } 裡",
        test: function () {
          var original = select().value;
          var realFetch = window.fetch;
          var status = document.querySelector("#status");
          /* 只要「讀取失敗」出現過就算數（之前還沒回來的請求，可能會再把文字蓋掉） */
          var sawFailure = false;
          var watcher = new MutationObserver(function () {
            if (status.textContent.indexOf("失敗") !== -1) sawFailure = true;
          });
          watcher.observe(status, { childList: true, characterData: true, subtree: true });
          /* 假裝斷網：fetch 一律失敗 */
          window.fetch = function () { return Promise.reject(new TypeError("Failed to fetch")); };
          chooseCity(anotherCity());
          return H.waitFor(function () { return sawFailure; }, 3000).then(function (ok) {
            watcher.disconnect();
            window.fetch = realFetch;
            chooseCity(original);
            return ok;
          });
        }
      }
    ]
  });
})();
