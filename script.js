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

function updateDay() {
  totalCaloriesBreakfast = 0;
  totalCaloriesLunch = 0;
  totalCaloriesDinner = 0;
  update('breakfast');
  update('lunch');
  update('dinner');
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
      update('breakfast');
    } else if (meal === 'lunch') {
      totalCaloriesLunch += calories;
      update('lunch');
    } else if (meal === 'dinner') {
      totalCaloriesDinner += calories;
      update('dinner');
    }

    document.getElementById(`${meal}FoodName`).value = "";
    document.getElementById(`${meal}Calories`).value = "";
  } else {
    alert("Please enter valid values for food name and calories.");
  }
}

function update(meal) {
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

function calculateRecommendedCalories() {
  // Retrieve user input values
  const age = document.getElementById('age').value;
  const weight = document.getElementById('weight').value;
  const height = document.getElementById('height').value;
  const gender = document.getElementById('gender').value;
  const activity = document.getElementById('activity').value;

  // Perform calculation (you may use a more sophisticated formula based on your requirements)
  let basalMetabolicRate;

  if (gender === 'male') {
    basalMetabolicRate = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    basalMetabolicRate = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Adjust for activity level
  let recommendedCalories;

  switch (activity) {
    case 'sedentary':
      recommendedCalories = basalMetabolicRate * 1.2;
      break;
    case 'lightlyActive':
      recommendedCalories = basalMetabolicRate * 1.375;
      break;
    case 'moderatelyActive':
      recommendedCalories = basalMetabolicRate * 1.55;
      break;
    case 'veryActive':
      recommendedCalories = basalMetabolicRate * 1.725;
      break;
    case 'superActive':
      recommendedCalories = basalMetabolicRate * 1.9;
      break;
    default:
      recommendedCalories = basalMetabolicRate;
  }

  // Display the result
  const resultElement = document.getElementById('recommendedCalories');
  resultElement.textContent = `Your recommended daily calories: ${recommendedCalories.toFixed(2)} calories`;
}
