
//NUTRITION

//Set total calories for each meal to 0
let totalCaloriesBreakfast = 0;
let totalCaloriesLunch = 0;
let totalCaloriesDinner = 0;

//When the user clicks a different meal tab
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


// Update the total calories per meal
function updateDay() {

  // Everyday, calories restart at 0
  totalCaloriesBreakfast = 0;
  totalCaloriesLunch = 0;
  totalCaloriesDinner = 0;
  update('breakfast');
  update('lunch');
  update('dinner');
  changeTab('breakfast'); 

}


// Function for when the user want to add a meal with its number of calories
function addFood(meal) {

  const foodName = document.getElementById(`${meal}FoodName`).value;
  const calories = parseFloat(document.getElementById(`${meal}Calories`).value);

  // If the food entered is a valid word and the calories entered are more than 0, add the food name
  if (foodName && !isNaN(calories) && calories > 0) {
    const foodList = document.getElementById(`${meal}List`);
    const listItem = document.createElement("tr");
    listItem.innerHTML = `<td>${foodName}</td><td>${calories}</td>`;
    foodList.appendChild(listItem);

    // Update meal calories
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
  } 

  // Give the user an alert if food name and calories are invalid
  else {
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

//text selector
function contains(selector, text) {
  const elements = document.querySelectorAll(selector);
  return Array.from(elements).find(el => el.textContent.includes(text));
}

changeTab('breakfast');

//Calculates the ideal recommended calories per day using the data the user has provided.
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
  
// Switch statement which displays all the different options and calculations based on activity level (calculated using BMR formulas)
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

//PLANNER

var rIndex, table = document.getElementById("table"); 
//rIndex is the variable that stores which row of the table the user clicked on
//the table variable gets the data from the html table.


let arr= [ ]; 
//This 2 dimensional array is for mirroring the data on the planner table and then save it into the database.


//removeSelectedRow() deletes the selected row from the html table and then initiates deleteRow().

function removeSelectedRow()//from table
{
                    
    table.deleteRow(rIndex);

    document.getElementById("exercise").value = "";
    document.getElementById("sets").value = "";
    document.getElementById("reps").value = "";
    
    arr=deleteRow(arr,rIndex); 
}


//deleteRow() allows us to delete a row from the 2d array when that same row is deleted on the html.

function deleteRow(array1, row) //from array
{
    array1 = array1.slice(0); // makes copy
    array1.splice(row - 1, 1);
    return array1;
}


//inputCheck() checks the user input in the three input boxes(exercise, sets reps) before adding it to the html table. It ensures nothing is empty, and also that sets and reps are more than 0.
    
function inputCheck()
{
    var isEmpty = false,
                        
    exercise = document.getElementById("exercise").value,              
    sets = document.getElementById("sets").value,     
    reps = document.getElementById("reps").value;
            
                    
    if(exercise === ""){
                        
        alert("Please enter 'Exercise'.");
        isEmpty = true;
    }
                    
    else if(sets === ""|| sets<1){
        alert("Please enter 'Sets'.");
        isEmpty = true;
    }
                    
    else if(reps === ""|| reps<1){
        alert("Please enter 'Reps'.");
        isEmpty = true;
        }
        
        return isEmpty;
}
            
             
//addRow() first checks with inputCheck. If every input is correct, it adds the values to the html table to each of their designated columns of the row and pushes the values to the 2d array. Lastly, it calls selectedRowToInput() to call the function to set the event to the new row.

function addRow()
{
    if(!inputCheck()){
                    
        var newRow = table.insertRow(table.length),
                        
        cell1 = newRow.insertCell(0),
        cell2 = newRow.insertCell(1),
        cell3 = newRow.insertCell(2),
                        
        exercise = document.getElementById("exercise").value,
        sets = document.getElementById("sets").value,
        reps = document.getElementById("reps").value;
                
        cell1.innerHTML = exercise;
        cell2.innerHTML = sets;
        cell3.innerHTML = reps;
    
        let tempArr = [exercise,sets,reps];
        arr.push(tempArr);
        
        //call the function to set the event to the new row
        selectedRowToInput();
    }
             
}
    
//selectedRowToInput() call the function to set the event to the selected row so that the user might decide to delete or edit that selected row.

function selectedRowToInput() 
{
                    
    for(var i = 1; i < table.rows.length; i++)                
    {

        table.rows[i].onclick = function()
        {
            // get the index of the selected row
            rIndex = this.rowIndex;
                          
            document.getElementById("exercise").value = this.cells[0].innerHTML;
            document.getElementById("sets").value = this.cells[1].innerHTML;
            document.getElementById("reps").value = this.cells[2].innerHTML;
        };
                    
    }
    
    console.log(rIndex);

}
    

//editSelectedRow() is initiated when the edit button is clicked. It edits the html table by changing the values of the row to the new user input values.

function editSelectedRow()
{
    var exercise = document.getElementById("exercise").value,
    sets = document.getElementById("sets").value,
    reps = document.getElementById("reps").value;
                   
    if(!inputCheck()){

    table.rows[rIndex].cells[0].innerHTML = exercise;
    table.rows[rIndex].cells[1].innerHTML = sets;
    table.rows[rIndex].cells[2].innerHTML = reps;
    
    }

}

