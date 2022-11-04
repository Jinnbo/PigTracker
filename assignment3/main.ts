
import {Pig} from './Pigmodel'

var addTable = document.getElementById('addTable')!
var nameBox = <HTMLInputElement>document.getElementById('name')!
var heightBox = <HTMLInputElement>document.getElementById('height')!
var weightBox = <HTMLInputElement>document.getElementById('weight')!
var personalityBox = <HTMLInputElement>document.getElementById('personality')!
var categoryBox = <HTMLInputElement>document.getElementById('category')!
var dynamicBoxOne = <HTMLInputElement>document.getElementById('dynamic1')!
var dynamicBoxTwo = <HTMLInputElement>document.getElementById('dynamic2')!



// Pig attributes
var name: string;
var height: string;
var weight: string;
var personality: string;
var category: string;

// Add Event Listeners to each input box
nameBox.onchange = () =>{name = nameBox.value}
heightBox.onchange = () =>{height = heightBox.value}
weightBox.onchange = () =>{weight = weightBox.value}
personalityBox.onchange = () =>{personality = personalityBox.value}

categoryBox.onchange = () =>{category = categoryBox.value; 
    // LOAD Dynamic Boxes once category is choosen 
    switch(categoryBox.value){
        case "Grey":
            console.log("grey");
            dynamicBoxOne.innerHTML = ""
            break;
        case "Chestnut":
            console.log("Chestnut");
            break;
        case "White":
            console.log("White");
            break;
        case "Black":
            console.log("Black");
            break;
    }
}




document.getElementById('submitBTN')!.addEventListener('click',function(){

    // Check if user inputed all boxes

    if (name == null || height == null || weight == null || personality == null || category == null){
        console.log("No input");
        return;
    } 

    // Get all the Info (name, weight, height, category, ...)
    // Create new pig with pig constructor with all the info above
    // Add new pig to pig controller
    console.log(name);
    console.log(height);
    console.log(weight);
    console.log(personality);
    console.log(category);
})

document.getElementById("addBTN")!.addEventListener('click', function(){
    // Open up the add new pig menu to the right of Pig collection table 
    addTable.style.visibility = "visible";
})

