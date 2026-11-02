# 第 24 關：我的第一個 Pull Request 🐙

> 你已經用過好幾次 GitHub 了：每次我（Claude）做完東西，你都按了「Merge pull request」。
> 這一關，換**你自己**走一遍完整的流程。學會之後，就能自己修改網站、自己讓網站更新了！

這關不用寫程式，全部在 **GitHub 網站**上用滑鼠完成。

## 這關會學到

- GitHub 的幾個重要名詞：repository、commit、branch、pull request、merge
- 在 GitHub 網站上直接修改檔案
- 完整走一遍：**建立分支 → commit → 開 PR → 合併**
- 怎麼看修改紀錄、怎麼回到之前的版本

---

## 觀念小抄：五個名詞

用「寫一本書」來比喻：

| 名詞 | 中文 | 比喻 |
|------|------|------|
| **Repository**（repo） | 專案、儲存庫 | 整本書，包含所有檔案和所有修改紀錄 |
| **Commit** | 提交 | 存一次檔，並寫下「這次改了什麼」。每個 commit 都是一個可以回去的版本 |
| **Branch** | 分支 | 影印一份草稿出來改，改壞了也不會弄髒正本 |
| **Pull Request**（PR） | 合併請求 | 「我改好草稿了，請看看能不能放進正本？」 |
| **Merge** | 合併 | 確認沒問題，把草稿的修改放進正本 |

**`main`** 就是「正本」分支。你的網站（GitHub Pages）就是用 `main` 上的檔案做出來的。

### 為什麼不直接改 main 就好？

可以，但用分支 + PR 有幾個好處：

- 改到一半的東西不會跑到網站上
- 合併前可以在 PR 裡**看清楚改了哪幾行**，確認沒有改錯
- 有人（或 Claude）可以在 PR 裡留言、幫你檢查
- 這是全世界寫程式的人都在用的標準流程

---

## 任務

### 準備：填好 MY_REPO

打開這個資料夾的 `start.html`，把 `MY_REPO` 填成你的專案名稱：

```js
const MY_REPO = "sun070378-create/test-place-for-claude";
```

（就是你 GitHub 專案網址 `github.com/` 後面的那一段）

### 第 1 步：找到要改的檔案

1. 打開你的 GitHub 專案：<https://github.com/sun070378-create/test-place-for-claude>
2. 依序點進資料夾：`levels` → `24-github` → `guestbook.md`
3. 點右上角的 **鉛筆圖示 ✏️**（滑鼠移上去會顯示「Edit this file」）

### 第 2 步：修改內容

在最下面加一行你想說的話，開頭要是 `- `（減號 + 空格），例如：

```
- 我是 Jason，這是我的第一個 Pull Request！
```

### 第 3 步：Commit，並建立新分支

1. 按右上角綠色的 **Commit changes...**
2. 跳出的視窗裡：
   - **Commit message**：寫這次改了什麼，例如「在留言簿加上我的留言」
   - 下面選 **Create a new branch for this commit and start a pull request**
   - 分支名稱改成 **`my-first-branch`**（裁判會找這個名字）
3. 按 **Propose changes**

> 💡 剛剛那一下，你就做了一個 **commit**，而且是做在新的**分支**上，`main` 還完全沒有被動到。

### 第 4 步：開 Pull Request

1. 接著會看到「Open a pull request」的頁面
2. 標題已經自動填好了（就是剛剛的 commit message），也可以在下面的大框框寫說明
3. 按綠色的 **Create pull request**

### 第 5 步：看看改了什麼

在 PR 頁面上方點 **Files changed** 分頁：

- **綠色**、前面有 `+` 的是**新增**的行
- **紅色**、前面有 `-` 的是**刪除**的行

這叫做 **diff**（差異）。合併之前，養成習慣先看一眼，確認改的跟你想的一樣。

### 第 6 步：合併

1. 回到 **Conversation** 分頁
2. 按綠色的 **Merge pull request** → **Confirm merge**
3. 出現紫色的「Merged」就成功了！
4. 可以按 **Delete branch** 把用完的分支刪掉（不刪也沒關係）

### 第 7 步：檢查

- 回到專案首頁，點進 `levels/24-github/guestbook.md`，你的留言已經在 `main` 上了
- 回到 `start.html` 重新整理，看看檢查面板是不是全部打勾 🎉
- 等 1～2 分鐘，網站上的檔案也會更新

---

## 你還應該知道的事

### 看修改紀錄

專案首頁、檔案列表上方有一個 **🕐 Commits**（例如「12 Commits」），點進去可以看到**每一次修改**：誰改的、什麼時候、改了什麼。點任何一個 commit 都能看到那次的 diff。

### 改壞了怎麼辦？

不用怕！所有版本都還在。最簡單的方法：

1. 到 **Pull requests** 分頁 → 點 **Closed** → 找到改壞的那個 PR
2. PR 頁面下面有一個 **Revert** 按鈕，按下去會自動開一個「把這次修改復原」的新 PR
3. 合併它，就回到改之前的樣子了

### 合併之後，網站怎麼更新的？

到專案的 **Actions** 分頁，會看到一筆「pages build and deployment」。它跑完（變成綠色 ✅）之後，網站就更新了。之前我幫你確認網站時，看的就是這裡。

### 想改自己的個人網頁？

用一模一樣的流程！在專案首頁點 `index.html` → 鉛筆圖示 → 修改 → Commit 到新分支 → 開 PR → 合併。幾分鐘後網站就會變成新的樣子。

---

## 下一步（不影響過關）

在 GitHub 網站上改檔案很方便，但一次只能改一個檔案。以後想在自己的電腦上改很多檔案，再一次送上 GitHub，可以學：

- **GitHub Desktop**：有按鈕可以按的 GitHub 程式，最適合新手
- **git 指令**：在終端機打字操作，工程師最常用的方式

等你準備好了，跟 Claude 說「教我用 GitHub Desktop」就可以開始。

## 額外挑戰

- 再做一次：這次修改你的個人網頁 `index.html`，把自我介紹改成你自己的話，走完整個 PR 流程，然後到網站上看看。
- 在 PR 頁面的 Files changed 分頁，點某一行旁邊的 **+** 號，試試在程式碼上留言。
