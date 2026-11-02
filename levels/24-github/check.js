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

  function getJson(url) {
    return fetch(url).then(function (response) {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    });
  }

  /* 一次把需要的資料都抓回來，四個檢查共用（GitHub 對沒登入的查詢有次數限制） */
  var dataPromise = null;
  function data() {
    if (dataPromise) return dataPromise;
    var repo = repoName();
    if (!/^[\w.-]+\/[\w.-]+$/.test(repo)) {
      dataPromise = Promise.resolve({ repo: null });
      return dataPromise;
    }
    dataPromise = getJson(API + repo).then(function (info) {
      return Promise.all([
        getJson(API + repo + "/pulls?state=all&per_page=100").catch(function () { return []; }),
        fetch(API + repo + "/contents/" + GUESTBOOK + "?ref=" + info.default_branch, {
          headers: { Accept: "application/vnd.github.raw" }
        }).then(function (r) { return r.ok ? r.text() : ""; }).catch(function () { return ""; })
      ]).then(function (results) {
        return { repo: info, pulls: results[0], guestbook: results[1] };
      });
    }).catch(function () {
      return { repo: null };
    });
    return dataPromise;
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
        hint: "格式是「帳號/專案名稱」，例如 \"sun070378-create/test-place-for-claude\"。專案要是公開的，電腦也要連上網路",
        test: function () {
          dataPromise = null;   /* 每次檢查都重新抓最新的資料 */
          return data().then(function (d) { return Boolean(d.repo); });
        }
      },
      {
        text: "有一個從 my-first-branch 分支開出來的 Pull Request",
        hint: "在 GitHub 上修改 guestbook.md，按「Commit changes…」時選「Create a new branch」，分支名稱填 my-first-branch",
        test: function () {
          return data().then(function (d) { return myPulls(d).length > 0; });
        }
      },
      {
        text: "這個 Pull Request 已經合併（Merged）",
        hint: "打開那個 Pull Request，按綠色的「Merge pull request」→「Confirm merge」",
        test: function () {
          return data().then(function (d) {
            return myPulls(d).some(function (p) { return Boolean(p.merged_at); });
          });
        }
      },
      {
        text: "main 上的 guestbook.md 有你的留言",
        hint: "在 guestbook.md 最下面加一行「- 你的留言」（減號後面有空格），合併之後就會出現在 main 上",
        test: function () {
          return data().then(function (d) {
            var lines = String(d.guestbook || "").split("\n").filter(function (line) {
              return /^\s*-\s+\S/.test(line);
            });
            return lines.length >= 2;   /* 範例一行 + 你的留言 */
          });
        }
      }
    ]
  });
})();
