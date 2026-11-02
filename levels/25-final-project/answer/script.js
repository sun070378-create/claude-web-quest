// ========== 作品資料（第 15 關：陣列和物件） ==========
const works = [
  { title: "午後的巷口", category: "攝影", emoji: "🌅", note: "住家附近巷子裡，下午三點的光線" },
  { title: "寫給十年後的自己", category: "寫作", emoji: "✉️", note: "寫下現在的煩惱和願望" },
  { title: "城市裡的小綠地", category: "繪圖", emoji: "🗺️", note: "把不起眼的小公園一個一個畫下來" },
  { title: "雨天的公車站", category: "攝影", emoji: "🚏", note: "等車的人和他們的傘" },
  { title: "散步筆記", category: "寫作", emoji: "🚶", note: "每天走路時想到的小事" },
  { title: "貓咪地圖", category: "繪圖", emoji: "🐈", note: "社區裡每隻貓最常出現的地方" }
];

const workList = document.querySelector("#work-list");
const filterButtons = document.querySelectorAll(".filter");

// 把作品顯示成卡片（第 10、15 關：createElement、forEach）
function showWorks(list) {
  workList.innerHTML = "";
  list.forEach(function (work) {
    const card = document.createElement("article");
    card.className = "work";

    const emoji = document.createElement("div");
    emoji.className = "emoji";
    emoji.textContent = work.emoji;
    emoji.setAttribute("aria-hidden", "true");   // 表情符號只是裝飾，報讀軟體跳過

    const title = document.createElement("h3");
    title.textContent = work.title;

    const note = document.createElement("p");
    note.textContent = work.category + "・" + work.note;

    card.appendChild(emoji);
    card.appendChild(title);
    card.appendChild(note);
    workList.appendChild(card);
  });
}

// 篩選按鈕（第 15 關：filter）
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const category = button.dataset.category;

    filterButtons.forEach(function (b) { b.classList.remove("is-active"); });
    button.classList.add("is-active");

    if (category === "全部") {
      showWorks(works);
    } else {
      showWorks(works.filter(function (work) { return work.category === category; }));
    }
  });
});

showWorks(works);

// ========== 夜間模式，並用 localStorage 記住（第 9、14 關） ==========
const themeButton = document.querySelector("#theme-toggle");

function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  themeButton.textContent = isDark ? "☀️" : "🌙";
}

themeButton.addEventListener("click", function () {
  const isDark = !document.body.classList.contains("dark");   // ! = 相反
  applyTheme(isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

applyTheme(localStorage.getItem("theme") === "dark");

// ========== 聯絡表單（第 11 關） ==========
const form = document.querySelector("#contact-form");
const formResult = document.querySelector("#form-result");

form.addEventListener("submit", function (event) {
  event.preventDefault();   // 不要讓網頁重新整理（這個網站沒有後端，訊息不會真的寄出）
  const name = document.querySelector("#name").value.trim();
  formResult.textContent = "謝謝你，" + name + "！（這是練習用的表單，訊息不會真的寄出）";
  form.reset();
});
