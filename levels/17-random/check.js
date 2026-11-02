/* 第 17 關的過關條件（裁判用，不需要修改） */
/* 包在函式裡，避免和你寫的變數名稱撞名 */
(function () {
  var TEST_FOOD = "裁判的測試選項";

  function foodData() {
    try { return Array.isArray(foods) ? foods : []; } catch (e) { return []; }
  }

  function listItems() { return document.querySelectorAll("#food-list li"); }

  /* 按很多次「幫我選！」，收集出現過的結果 */
  function pickMany(times) {
    var result = document.querySelector("#result");
    var before = result.textContent;
    var seen = {};
    for (var i = 0; i < times; i++) {
      document.querySelector("#pick-btn").click();
      seen[result.textContent.trim()] = true;
    }
    result.textContent = before;
    return Object.keys(seen);
  }

  Level.define({
    level: 17,
    title: "今天吃什麼？",
    next: "../18-timer/start.html",
    checks: [
      {
        text: "randomItem(array) 會隨機回傳陣列裡的其中一個",
        hint: "const index = Math.floor(Math.random() * array.length); return array[index];",
        test: function () {
          if (typeof randomItem !== "function") return false;
          var seen = {};
          for (var i = 0; i < 60; i++) {
            var item = randomItem(["甲", "乙", "丙"]);
            if (["甲", "乙", "丙"].indexOf(item) === -1) return false;
            seen[item] = true;
          }
          return Object.keys(seen).length >= 2;
        }
      },
      {
        text: "按「幫我選！」，會顯示其中一個選項",
        hint: "pickButton.addEventListener(\"click\", function () { result.textContent = randomItem(foods); });",
        test: function () {
          var picked = pickMany(5);
          return picked.length > 0 && picked.every(function (p) { return foodData().indexOf(p) !== -1; });
        }
      },
      {
        text: "多按幾次，會出現不同的結果",
        hint: "每次按都要重新呼叫 randomItem，不要只在網頁打開時選一次",
        test: function () { return pickMany(40).length >= 2; }
      },
      {
        text: "所有選項都顯示在下方的清單裡",
        hint: "寫 showFoods()：用 foods.forEach 做出 <li>，放進 foodList，網頁打開時呼叫一次",
        test: function () {
          var items = listItems();
          return foodData().length > 0 && items.length === foodData().length &&
            items[0].textContent.indexOf(foodData()[0]) !== -1;
        }
      },
      {
        text: "可以加入新的選項，加入後輸入框會清空",
        hint: "foods.push(newFoodInput.value.trim()); showFoods(); newFoodInput.value = \"\";",
        test: function () {
          var input = document.querySelector("#new-food");
          var before = foodData().length;
          input.value = TEST_FOOD;
          document.querySelector("#add-btn").click();
          var ok = foodData().length === before + 1 && foodData().indexOf(TEST_FOOD) !== -1 &&
            listItems().length === before + 1 && input.value === "";
          /* 把測試選項拿掉 */
          var index = foodData().indexOf(TEST_FOOD);
          if (index !== -1) foodData().splice(index, 1);
          Array.prototype.forEach.call(listItems(), function (li) {
            if (li.textContent.indexOf(TEST_FOOD) !== -1) li.remove();
          });
          input.value = "";
          return ok;
        }
      }
    ]
  });
})();
