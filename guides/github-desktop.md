# GitHub Desktop 新手教學 🖥️

> 建議**玩完第 24 關**再看這份教學。第 24 關教的名詞（commit、branch、Pull Request、merge），這裡會一直用到。

## GitHub Desktop 是什麼？

第 24 關是在 **GitHub 網站**上改檔案。網站很方便，但有兩個限制：

- 一次只能改**一個檔案**
- 不能用 VS Code 寫程式、存檔、馬上在瀏覽器看結果

**GitHub Desktop** 是 GitHub 官方的免費程式，裝在你的電腦上。有了它，流程會變成：

```
在 VS Code 改好幾個檔案 → 在 GitHub Desktop 按幾個按鈕 → 送上 GitHub → 網站自動更新
```

全部都是用滑鼠按按鈕，不用打指令。

> GitHub Desktop 只有英文介面，下面會寫出每個按鈕的英文名稱。不同版本的按鈕位置可能稍微不一樣，找不到的時候截圖問 Claude 就好。

---

## 一、第一次設定（只要做一次）

### 1. 安裝

1. 到 <https://desktop.github.com/> 下載（有 Windows 和 Mac 版）
2. 安裝完打開它

### 2. 登入 GitHub

1. 按 **Sign in to GitHub.com**
2. 瀏覽器會打開 GitHub 的網頁，按 **Authorize desktop** 允許
3. 回到 GitHub Desktop，就登入好了

### 3. 設定名字和 Email

接著它會問你 **Configure Git**（設定你的名字和 Email），這是每次 commit 時會記錄的「作者」。

- **Name**：填你想顯示的名字
- **Email**：建議選結尾是 **`@users.noreply.github.com`** 的那一個

> ⚠️ 為什麼要選 noreply 的 Email？你的專案是公開的，每個 commit 上的 Email **所有人都看得到**。用 GitHub 提供的 noreply 信箱，就不會把你真正的 Email 公開出去。
>
> 清單裡沒有 noreply 的選項？到 GitHub 網站右上角的頭像 → **Settings** → **Emails**，勾選 **Keep my email addresses private**，下面就會顯示你的 noreply 信箱。之後也可以在 GitHub Desktop 的選單 **File** → **Options**（Mac 是 **GitHub Desktop** → **Settings**）→ **Git** 裡修改。

### 4. 把專案「Clone」到電腦

**Clone**（複製）就是把 GitHub 上的專案，完整地複製一份到你的電腦。跟下載 ZIP 不一樣的是：clone 下來的資料夾**跟 GitHub 是連在一起的**，之後改了什麼，都能送回 GitHub。

1. 選單 **File** → **Clone repository...**
2. 選 **GitHub.com** 分頁，在清單裡點 `sun070378-create/claude-web-quest`
3. **Local path** 是要放在電腦的哪裡，用預設的就可以（Windows 通常是「文件\GitHub\claude-web-quest」）
4. 按 **Clone**

### 5. 之前下載的 ZIP 資料夾怎麼辦？

ZIP 下載的資料夾**沒有跟 GitHub 連在一起**，以後請改用剛剛 clone 下來的資料夾。

如果你在 ZIP 資料夾裡已經玩了幾關，想保留進度：把你改過的 `start.html`，複製到 clone 資料夾裡**同樣的位置**、蓋掉原本的檔案就好（例如 `levels/01-hello-html/start.html`）。

> 💡 闖關的「過關紀錄」（關卡地圖上的 ⭐）是存在瀏覽器裡的，跟資料夾無關。換資料夾後，只要用同一個瀏覽器打開，⭐ 可能會不見，但你寫的程式都還在，重新打開那一關就會再過關一次。

---

## 二、每次要改東西的流程

這就是第 24 關學的「分支 → commit → PR → 合併」，只是換成在自己的電腦上做。

### 步驟 0：先把電腦上的版本更新到最新

如果你在 GitHub 網站上合併過 PR，電腦上的版本就舊了，要先更新：

1. 上方的 **Current branch** 確認是 `main`
2. 按上方的 **Fetch origin**（去 GitHub 看看有沒有新東西）
3. 如果按鈕變成 **Pull origin**，再按一次（把新東西拉下來）

> 養成習慣：**每次開始改東西之前，先 Fetch / Pull。**

### 步驟 1：開一個新分支

1. 點上方的 **Current branch** → **New branch**
2. 取一個名字，說明這次要做什麼，例如 `add-new-work`（新增作品）
3. 按 **Create branch**

### 步驟 2：用 VS Code 修改

1. 選單 **Repository** → **Open in Visual Studio Code**
2. 照平常的方式修改、存檔，在瀏覽器裡確認結果

### 步驟 3：在 GitHub Desktop 看改了什麼

回到 GitHub Desktop，左邊的 **Changes** 分頁會列出改過的檔案：

- 點一個檔案，右邊會顯示改了哪幾行：**綠色**是新增、**紅色**是刪除
- 檔案前面的勾勾代表「這次 commit 要包含這個檔案」，不想包含的就取消勾選

### 步驟 4：Commit

在左下角：

1. **Summary**（必填）：用一句話說明改了什麼，例如「新增通勤網站到作品清單」
2. **Description**（可以不填）：想補充的細節
3. 按藍色的 **Commit to add-new-work**（按鈕上會寫你的分支名稱）

> 💡 commit 只是「存在你的電腦裡」，GitHub 上還看不到。一個分支上可以 commit 好幾次。

### 步驟 5：送上 GitHub

按上方的 **Publish branch**（第一次送這個分支時）。之後在同一個分支又 commit 的話，按鈕會變成 **Push origin**。

### 步驟 6：開 Pull Request、合併

1. 送上去之後，畫面上會出現 **Preview Pull Request** 或 **Create Pull Request** 按鈕，按下去
2. 瀏覽器會打開 GitHub 的「Open a pull request」頁面，接下來跟第 24 關一模一樣：
   **Create pull request** → 看 **Files changed** → **Merge pull request** → **Confirm merge**
3. 等 1～2 分鐘，網站就會更新

### 步驟 7：回到 main

1. 回到 GitHub Desktop，**Current branch** 切回 `main`
2. 按 **Fetch origin** → **Pull origin**，把剛剛合併的內容拉下來
3. 用完的分支可以刪掉：在 **Current branch** 的清單裡，對那個分支按右鍵 → **Delete...**

完成！下次要改東西，再從步驟 0 開始。

---

## 三、名詞對照表

| GitHub Desktop 的按鈕 | 意思 |
|------|------|
| **Clone** | 把 GitHub 上的專案複製一份到電腦（只做一次） |
| **Fetch origin** | 去 GitHub 看看有沒有新東西（只是看，還沒拿） |
| **Pull origin** | 把 GitHub 上的新東西拉到電腦 |
| **Commit** | 在電腦上存一個版本 |
| **Publish branch** / **Push origin** | 把電腦上的 commit 送上 GitHub |
| **Current branch** | 現在在哪個分支上工作 |

`origin` 指的就是「GitHub 上的那一份」。

---

## 四、改壞了怎麼辦？

| 情況 | 怎麼做 |
|------|------|
| 還沒 commit，想放棄修改 | 在 **Changes** 裡對那個檔案按右鍵 → **Discard changes...** |
| 已經 commit，但還沒送上 GitHub | commit 完之後，左下角會出現 **Undo** 按鈕，按下去就能復原最後一次 commit（改的內容會回到 Changes，不會不見） |
| 已經合併到 main 了 | 跟第 24 關說的一樣：在 GitHub 網站上找到那個 PR，按 **Revert** |
| 想看以前改過什麼 | 點左邊的 **History** 分頁，每一次 commit 都在這裡 |

### 出現 conflict（衝突）？

如果你在 GitHub 網站上改了一個檔案，又在電腦上改了**同一個檔案的同一個地方**，GitHub Desktop 可能會說有 **conflict**，因為它不知道要用哪一個版本。

避免的方法：**每次開始改東西之前，先做步驟 0（Fetch / Pull）**。真的遇到了，不要慌，截圖問 Claude。

---

## 五、下一步

熟悉 GitHub Desktop 之後，有興趣的話可以再學 **git 指令**：在終端機打字操作，工程師最常用的方式。GitHub Desktop 的每個按鈕，背後其實都是在幫你打這些指令：

| 按鈕 | 指令 |
|------|------|
| Fetch origin | `git fetch` |
| Pull origin | `git pull` |
| Commit | `git commit` |
| Push origin | `git push` |
| New branch | `git switch -c 分支名稱` |

不急，等哪天想學了，跟 Claude 說一聲就可以。
