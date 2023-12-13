let totalCaloriesBreakfast = 0;
let totalCaloriesLunch = 0;
let totalCaloriesDinner = 0;

function changeTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });

  document.querySelectorAll('.tabs button').forEach(tabButton => {
    tabButton.classList.remove('active');
  });

  document.getElementById(`${tabName}Tab`).classList.add('active');
  document.querySelector(`.tabs button:contains('${tabName.charAt(0).toUpperCase() + tabName.slice(1)}')`).classList.add('active');
}

function changeDay() {
  totalCaloriesBreakfast = 0;
  totalCaloriesLunch = 0;
  totalCaloriesDinner = 0;
  updateTotalCalories('breakfast');
  updateTotalCalories('lunch');
  updateTotalCalories('dinner');
  changeTab('breakfast');
}

function addFood(meal) {
  const foodName = document.getElementById(`${meal}FoodName`).value;
  const calories = parseFloat(document.getElementById(`${meal}Calories`).value);

  if (foodName && !isNaN(calories) && calories > 0) {
    const foodList = document.getElementById(`${meal}List`);
    const listItem = document.createElement("tr");
    listItem.innerHTML = `<td>${foodName}</td><td>${calories}</td>`;
    foodList.appendChild(listItem);

    if (meal === 'breakfast') {
      totalCaloriesBreakfast += calories;
      updateTotalCalories('breakfast');
    } else if (meal === 'lunch') {
      totalCaloriesLunch += calories;
      updateTotalCalories('lunch');
    } else if (meal === 'dinner') {
      totalCaloriesDinner += calories;
      updateTotalCalories('dinner');
    }

    document.getElementById(`${meal}FoodName`).value = "";
    document.getElementById(`${meal}Calories`).value = "";
  } else {
    alert("Please enter valid values for food name and calories.");
  }
}

function updateTotalCalories(meal) {
  const totalCaloriesElement = document.getElementById(`${meal}TotalCalories`);
  let totalCalories = 0;

  if (meal === 'breakfast') {
    totalCalories = totalCaloriesBreakfast;
  } else if (meal === 'lunch') {
    totalCalories = totalCaloriesLunch;
  } else if (meal === 'dinner') {
    totalCalories = totalCaloriesDinner;
  }

  totalCaloriesElement.textContent = totalCalories;
}

function contains(selector, text) {
  const elements = document.querySelectorAll(selector);
  return Array.from(elements).find(el => el.textContent.includes(text));
}

changeTab('breakfast');