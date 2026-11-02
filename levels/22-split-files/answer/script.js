// 每日一句的程式（從 index.html 的 <script> 搬過來，<script> 標籤本身不用搬）

const quotes = [
  "慢慢來，比較快。",
  "今天的努力，是明天的底氣。",
  "做完比做好更重要。",
  "休息不是偷懶，是為了走更遠的路。",
  "每個專家，都曾經是新手。"
];

const quoteText = document.querySelector("#quote");
const quoteButton = document.querySelector("#quote-btn");

function showRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  quoteText.textContent = "「" + quotes[index] + "」";
}

quoteButton.addEventListener("click", showRandomQuote);
