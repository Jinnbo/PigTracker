import {Pig} from './Pigs/Pigmodel'
import { GreyPig } from './Pigs/GreyPig'
import { ChestnutPig } from './Pigs/ChestnutPig'
import { WhitePig } from './Pigs/WhitePig'
import { BlackPig } from './Pigs/BlackPig'
import { PigController } from './PigController'

// Variables from HTML elements
var addTable = document.getElementById('addTable')!
var infoTable = document.getElementById('infoTable')!
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
var overlay = <HTMLInputElement>document.getElementById('overlay')!
var confirmDelete = <HTMLInputElement>document.getElementById('confirmDelete')!
var cancelDelete = <HTMLInputElement>document.getElementById('cancelDelete')!

// Pig attributes
var name: string = "null";
var height: string = "null";
var weight: string = "null";
var personality: string = "null";
var category: any = "null";

// Dynamic Pig attributes
var breed: string = "null";
var swimming: number = -1;
var language: string = "null";
var speed: number = -1;
var strength: number = -1;

// Pig Controller
var pigController = new PigController();


// Add Event Listeners to each input box
nameBox.onchange = () =>{name = nameBox.value}
heightBox.onchange = () =>{height = heightBox.value}
weightBox.onchange = () =>{weight = weightBox.value}
personalityBox.onchange = () =>{personality = personalityBox.value}


// When category is chosen, load dynamic boxes
categoryBox.onchange = () =>{
    category = categoryBox.value; 

    switch(categoryBox.value){
        case "Grey":
            dynamicOneLabel.innerHTML = "Swimming(1-100)";
            dynamicBoxOne.innerHTML = `<input type="number" step="1" min="1" max="100" id="swimming" required>`

            var swimmingInput = <HTMLInputElement>document.getElementById('swimming')!
            swimmingInput.onchange = () => { swimming =parseInt(swimmingInput.value)};

            function resetSwimmingInput(){ swimmingInput.value = "";}

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
            dynamicOneLabel.innerHTML = "Speed(1-100)"
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
            dynamicOneLabel.innerHTML = "Strength(1-10)";
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
    if (name == "null" || height == "null" || weight == "null" || personality == "null" || category == "null" || breed == "null"){
        console.log("No input");
        return;
    } 
    
    // Create new pig with pig constructor  and add pig to pigController
    switch(category){
        case "Grey":
            if (swimming == -1) return;
            if (swimming >= 0 && swimming <= 100){
                var greyPig = new GreyPig(name,height,weight,personality,category,breed,swimming);
                pigController.add(greyPig);
            }

            break;
        case "Chestnut":
            if (language == "null") return;
            if (language != null){
                var chestnutPig = new ChestnutPig(name,height,weight,personality,category,breed,language);
                pigController.add(chestnutPig);
            }
            break;
        case "White":
            if (speed == -1) return;
            if (speed >= 0 && speed <= 100){
                var whitePig = new WhitePig(name,height,weight,personality,category,breed,speed);
                pigController.add(whitePig);
            }
            break;
        case "Black":
            if (strength == -1) return;
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
    }
    
    // add event listeners to moreInfo and delete BTN
    for (var i=0;i<pigList.length;i++){
        const x = i;
        window[`moreInfo${i}`] = <HTMLInputElement>document.getElementById(`moreInfo${i}`)!
        window[`moreInfo${i}`].onclick = ()=>{moreInfo(x,pigList)};

        window[`delete${i}`] = <HTMLInputElement>document.getElementById(`delete${i}`)!
        window[`delete${i}`].onclick = ()=>{deletePig(x,pigList)};
        
    }

    // reset input boxes
    resetInputBox();
})

function resetInputBox(){
    nameBox.value = "";
    name = "null";
    
    heightBox.value = "";
    height  = "null";

    weightBox.value = "";
    weight  = "null";

    personalityBox.value = "";
    personality  = "null";

    categoryBox.value = "";
    category  = "null";

    // reset dynamic boxes
    dynamicOneLabel.innerHTML = "Dynamic";
    dynamicTwoLabel.innerHTML = "Dynamic";
    dynamicBoxOne.innerHTML = "";
    dynamicBoxTwo.innerHTML = "";

    breed = "null";
    swimming = -1;
    language = "null";
    speed = -1;
    strength = -1;
}

function moreInfo(n:number, pigList:any[]){
    console.log(n);
    console.log(pigList[n]);
    infoTable.innerHTML = "";
    infoTable.innerHTML = `
    <tr><th colspan="2">${pigList[n].name} Info</th></tr>
        <tr>
            <td>Name</td>
            <td>${pigList[n].name}</td>
        </tr>
        <tr>
            <td>Breed</td>
            <td>${pigList[n].breed}</td>
        </tr>
        <tr>
            <td>Height</td>
            <td>${pigList[n].height}</td>
        </tr>
        <tr>
            <td>Weight</td>
            <td>${pigList[n].weight}</td>
        </tr>
        <tr>
            <td>Personality</td>
            <td>${pigList[n].personality}</td>
        </tr>
    `
    switch(pigList[n].category){
        case "Grey":
            infoTable.innerHTML += `
            <tr>
                <td>Swimming</td>
                <td>${pigList[n].swimming}</td>
            </tr>`
            break;
        case "Chestnut":
            infoTable.innerHTML += `
            <tr>
                <td>Language</td>
                <td>${pigList[n].language}</td>
            </tr>`
            break;
        case "White":
            infoTable.innerHTML += `
            <tr>
                <td>Speeed</td>
                <td>${pigList[n].speed}</td>
            </tr>`
            break;
        case "Black":
            infoTable.innerHTML += `
            <tr>
                <td>Strength</td>
                <td>${pigList[n].strength}</td>
            </tr>`
            break;
    }
    
    infoTable.style.visibility = "visible";
}

var deleteFlag: boolean = false;
confirmDelete.onclick=()=>{deleteFlag=true;}

function deletePig(n:number, pigList:any[]){
    overlay.style.visibility = "visible";
    if (deleteFlag == true){
        console.log("Deleting"+ pigList[n].name);
    }
}

document.getElementById("addBTN")!.addEventListener('click', function(){
    // Open up the add new pig menu to the right of Pig collection table 
    addTable.style.visibility = "visible";
})





/*
TODO
- keep pig display when refresh
- prevent refresh from overriding the local storage

- delete BTN
 */