let totalCalories = 0;

function addFood() {
  const foodName = document.getElementById("foodName").value;
  const calories = parseFloat(document.getElementById("calories").value);

  if (foodName && !isNaN(calories) && calories > 0) {
    const foodList = document.getElementById("foodList");
    const listItem = document.createElement("li");
    listItem.textContent = `${foodName}: ${calories} calories`;
    foodList.appendChild(listItem);

    totalCalories += calories;
    updateTotalCalories();
    
    // Clear input fields
    document.getElementById("foodName").value = "";
    document.getElementById("calories").value = "";
  } else {
    alert("Please enter valid values for food name and calories.");
  }
}

function updateTotalCalories() {
  const totalCaloriesElement = document.getElementById("totalCalories");
  totalCaloriesElement.textContent = `Total Calories: ${totalCalories}`;
}
