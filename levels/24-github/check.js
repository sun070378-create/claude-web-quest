/* 第 24 關的過關條件（裁判用，不需要修改） */
/* 裁判會連到 GitHub 的公開資料（API）檢查你的專案，需要連上網路 */
/* 包在函式裡，避免和你寫的變數名稱撞名 */
(function () {
  var BRANCH = "my-first-branch";
  var GUESTBOOK = "levels/24-github/guestbook.md";
  var API = "https://api.github.com/repos/";

  /* 讀取你填的 MY_REPO，也接受整個網址（https://github.com/帳號/專案） */
  function repoName() {
    var value;
    try { value = MY_REPO; } catch (e) { return ""; }
    return String(value || "").trim()
      .replace(/^https?:\/\/github\.com\//, "")
      .replace(/\.git$/, "")
      .replace(/\/+$/, "");
  }

  /* 查不到資料時，分成三種情況，給不一樣的說明：
     notfound：GitHub 說沒有這個專案（MY_REPO 填錯，或專案不是公開的）
     ratelimit：查太多次了。沒登入的查詢每小時只有 60 次，每檢查一次會用掉 3 次
     offline：根本連不上 GitHub（沒網路） */
  var PROBLEM_HINTS = {
    ratelimit: "GitHub 查太多次了（每小時有次數限制），不是你填錯。大約一小時後再按「重新檢查」",
    offline: "連不上 GitHub，請確認電腦有連上網路，再按「重新檢查」"
  };

  /* 送出查詢；被限制或沒網路時，丟出 { problem: … } */
  function request(url, options) {
    return fetch(url, options).then(function (response) {
      var remaining = response.headers.get("x-ratelimit-remaining");
      if (response.status === 403 || response.status === 429 || (remaining === "0" && !response.ok)) {
        throw { problem: "ratelimit" };
      }
      return response;
    }, function () {
      throw { problem: "offline" };
    });
  }

  /* 一次把需要的資料都抓回來，四個檢查共用 */
  var dataPromise = null;
  function data() {
    if (dataPromise) return dataPromise;
    var repo = repoName();
    if (!/^[\w.-]+\/[\w.-]+$/.test(repo)) {
      dataPromise = Promise.resolve({ repo: null, problem: "notfound" });
      return dataPromise;
    }
    dataPromise = request(API + repo).then(function (response) {
      if (!response.ok) return { repo: null, problem: "notfound" };
      return response.json().then(function (info) {
        return Promise.all([
          request(API + repo + "/pulls?state=all&per_page=100").then(function (r) {
            return r.ok ? r.json() : [];
          }),
          request(API + repo + "/contents/" + GUESTBOOK + "?ref=" + info.default_branch, {
            headers: { Accept: "application/vnd.github.raw" }
          }).then(function (r) {
            return r.ok ? r.text() : "";
          })
        ]).then(function (results) {
          return { repo: info, pulls: results[0], guestbook: results[1] };
        });
      });
    }).catch(function (error) {
      return { repo: null, problem: (error && error.problem) || "offline" };
    });
    return dataPromise;
  }

  /* 拿到資料後才檢查；被限制或沒網路時，直接換成說明情況的提示 */
  function withData(check) {
    return function () {
      return data().then(function (d) {
        if (PROBLEM_HINTS[d.problem]) return { ok: false, hint: PROBLEM_HINTS[d.problem] };
        return check(d);
      });
    };
  }

  function myPulls(d) {
    return (d.pulls || []).filter(function (p) { return p.head && p.head.ref === BRANCH; });
  }

  Level.define({
    level: 24,
    title: "我的第一個 Pull Request",
    next: "../25-final-project/start.html",
    checks: [
      {
        text: "填好 MY_REPO，而且在 GitHub 上找得到這個專案",
        hint: "格式是「帳號/專案名稱」，例如 \"sun070378-create/claude-web-quest\"。專案要是公開的，電腦也要連上網路",
        test: function () {
          dataPromise = null;   /* 每次檢查都重新抓最新的資料 */
          return withData(function (d) { return Boolean(d.repo); })();
        }
      },
      {
        text: "有一個從 my-first-branch 分支開出來的 Pull Request",
        hint: "在 GitHub 上修改 guestbook.md，按「Commit changes…」時選「Create a new branch」，分支名稱填 my-first-branch",
        test: withData(function (d) { return myPulls(d).length > 0; })
      },
      {
        text: "這個 Pull Request 已經合併（Merged）",
        hint: "打開那個 Pull Request，按綠色的「Merge pull request」→「Confirm merge」",
        test: withData(function (d) {
          return myPulls(d).some(function (p) { return Boolean(p.merged_at); });
        })
      },
      {
        text: "main 上的 guestbook.md 有你的留言",
        hint: "在 guestbook.md 最下面加一行「- 你的留言」（減號後面有空格），合併之後就會出現在 main 上",
        test: withData(function (d) {
          var lines = String(d.guestbook || "").split("\n").filter(function (line) {
            return /^\s*-\s+\S/.test(line);
          });
          return lines.length >= 2;   /* 範例一行 + 你的留言 */
        })
      }
    ]
  });
})();
