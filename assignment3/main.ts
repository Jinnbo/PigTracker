import {Pig} from './Pigs/Pigmodel'
import { GreyPig } from './Pigs/GreyPig'
import { ChestnutPig } from './Pigs/ChestnutPig'
import { WhitePig } from './Pigs/WhitePig'
import { BlackPig } from './Pigs/BlackPig'
import { PigController } from './PigController'

// Variables from HTML elements
var addTable = document.getElementById('addTable')!
var nameBox = <HTMLInputElement>document.getElementById('name')!
var heightBox = <HTMLInputElement>document.getElementById('height')!
var weightBox = <HTMLInputElement>document.getElementById('weight')!
var personalityBox = <HTMLInputElement>document.getElementById('personality')!
var categoryBox = <HTMLInputElement>document.getElementById('category')!
var dynamicBoxOne = <HTMLInputElement>document.getElementById('dynamic1')!
var dynamicOneLabel = <HTMLInputElement>document.getElementById('dynamic1Label')!
var dynamicBoxTwo = <HTMLInputElement>document.getElementById('dynamic2')!
var dynamicTwoLabel = <HTMLInputElement>document.getElementById('dynamic2label')!
var pigTable = <HTMLInputElement>document.getElementById('pigtable')!

// Pig attributes
var name: string;
var height: string;
var weight: string;
var personality: string;
var category: any;

// Dynamic Pig attributes
var breed: string;
var swimming: number;
var language: string;
var speed: number;
var strength: number;

// Pig Controller
var pigController = new PigController();

// Add Event Listeners to each input box
nameBox.onchange = () =>{name = nameBox.value}
heightBox.onchange = () =>{height = heightBox.value}
weightBox.onchange = () =>{weight = weightBox.value}
personalityBox.onchange = () =>{personality = personalityBox.value}

function init(){
 alert("asd")
}

// When category is chosen, load dynamic boxes
categoryBox.onchange = () =>{
    category = categoryBox.value; 

    switch(categoryBox.value){
        case "Grey":
            dynamicOneLabel.innerHTML = "Swimming";
            dynamicBoxOne.innerHTML = `<input type="number" step="1" min="1" max="100" id="swimming" required>`

            var swimmingInput = <HTMLInputElement>document.getElementById('swimming')!
            swimmingInput.onchange = () => { 
                 swimming =parseInt(swimmingInput.value)
                };

            dynamicTwoLabel.innerHTML = "Breed";
            dynamicBoxTwo.innerHTML = 
            `<select id="breed" required>
                <option value=""disabled selected>Select Breed</option>
                <option>Gottingen</option>
                <option>Tamworth</option>
                <option>Porco</option>
            </select>`

            break;

        case "Chestnut":
            dynamicOneLabel.innerHTML = "Language";
            dynamicBoxOne.innerHTML = `<input type="string" id="language" required>`

            var languageInput = <HTMLInputElement>document.getElementById('language')!
            languageInput.onchange = () => {language = languageInput.value};

            dynamicTwoLabel.innerHTML = "Breed";
            dynamicBoxTwo.innerHTML = 
            `<select id="breed" required>
                <option value=""disabled selected>Select Breed</option>
                <option>Duroc</option>
                <option>Kunekun</option>
                <option>Pietrain</option>
            </select>`
            break;

        case "White":
            dynamicOneLabel.innerHTML = "Speed"
            dynamicBoxOne.innerHTML = `<input type="number" step="1" min="1" max="100" id="speed" required>`

            var speedInput = <HTMLInputElement>document.getElementById('speed')!
            speedInput.onchange = () => {speed =parseInt(speedInput.value)};

            dynamicTwoLabel.innerHTML = "Breed";
            dynamicBoxTwo.innerHTML = 
            `<select id="breed" required>
                <option value=""disabled selected>Select Breed</option>
                <option>Mangalica</option>
                <option>Tamworth</option>
                <option>Choctaw</option>
            </select>`
            break;

        case "Black":
            dynamicOneLabel.innerHTML = "Strength";
            dynamicBoxOne.innerHTML = `<input type="number" min="1" max="10" id="strength" required>`

            var strengthInput = <HTMLInputElement>document.getElementById('strength')!
            strengthInput.onchange = () => {strength =parseInt(strengthInput.value)};

            dynamicTwoLabel.innerHTML = "Breed";
            dynamicBoxTwo.innerHTML = 
            `<select id="breed" required>
                <option value=""disabled selected>Select Breed</option>
                <option>PotBelly</option>
                <option>Berkshire</option>
                <option>Mulefoot</option>
            </select>`
            break;
    }
    var breedInput = <HTMLInputElement>document.getElementById('breed')!
    breedInput.onchange = () => {breed =breedInput.value};
}

// User submits new pig to add
document.getElementById('submitBTN')!.addEventListener('click',function(){

    // Check if user inputed all boxes
    if (name == null || height == null || weight == null || personality == null || category == null || breed == null){
        console.log("No input");
        return;
    } 
    
    // Create new pig with pig constructor  and add pig to pigController
    switch(category){
        case "Grey":
            if (swimming >= 0 && swimming <= 100){
                var greyPig = new GreyPig(name,height,weight,personality,category,breed,swimming);
                pigController.add(greyPig);
            }

            break;
        case "Chestnut":
            if (language != null){
                var chestnutPig = new ChestnutPig(name,height,weight,personality,category,breed,language);
                pigController.add(chestnutPig);
            }
            break;
        case "White":
            if (speed >= 0 && speed <= 100){
                var whitePig = new WhitePig(name,height,weight,personality,category,breed,speed);
                pigController.add(whitePig);
            }
            break;
        case "Black":
            if (strength >= 0 && strength <= 10){
                var blackpig = new BlackPig(name,height,weight,personality,category,breed,strength);
                pigController.add(blackpig);
            }
            break;
    }

    // Hide the add pig table from user
    addTable.style.visibility = "hidden";

    // add the pig to the table
    var pigList = pigController.getAll();
    pigTable.innerHTML = 
    `<tr class="tableRow">
        <th>Name</th>
        <th>Category</th>
        <th>More info</th>
        <th>Delete</th>
    </tr>`
    
    for (var i=0;i<pigList.length;i++){
        pigTable.innerHTML += 
        `<tr>
            <td>${pigList[i].name}</td>
            <td>${pigList[i].category}</td>
            <td id="moreInfo${i}" class="moreInfo">More Info</td>
            <td id="delete${i}" class="delete">Delete</td>
        </tr>`

        // Get id of each more info and delete
        
        
        
        // add event listener to moreinfo and delete
    }
    
    var x = 0;

    for (var i=0;i<pigList.length;i++){
        console.log(`moreInfo${i}`)
        window[`moreInfo${i}`] = <HTMLInputElement>document.getElementById(`moreInfo${i}`)!
        window[`moreInfo${i}`].onclick = ()=>{console.log(x)};
        x++;
    }

})


document.getElementById("addBTN")!.addEventListener('click', function(){
    // Open up the add new pig menu to the right of Pig collection table 
    addTable.style.visibility = "visible";
})

