System.register([], function (exports_1, context_1) {
    "use strict";
    var addTable, nameBox, heightBox, weightBox, personalityBox, categoryBox, dynamicBoxOne, dynamicOneLabel, dynamicBoxTwo, dynamicTwoLabel, name, height, weight, personality, category, breed, swimming, language, speed, strength;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            addTable = document.getElementById('addTable');
            nameBox = document.getElementById('name');
            heightBox = document.getElementById('height');
            weightBox = document.getElementById('weight');
            personalityBox = document.getElementById('personality');
            categoryBox = document.getElementById('category');
            dynamicBoxOne = document.getElementById('dynamic1');
            dynamicOneLabel = document.getElementById('dynamic1Label');
            dynamicBoxTwo = document.getElementById('dynamic2');
            dynamicTwoLabel = document.getElementById('dynamic2label');
            // Add Event Listeners to each input box
            nameBox.onchange = () => { name = nameBox.value; };
            heightBox.onchange = () => { height = heightBox.value; };
            weightBox.onchange = () => { weight = weightBox.value; };
            personalityBox.onchange = () => { personality = personalityBox.value; };
            categoryBox.onchange = () => {
                category = categoryBox.value;
                // LOAD Dynamic Boxes once category is choosen 
                switch (categoryBox.value) {
                    case "Grey":
                        dynamicOneLabel.innerHTML = "Swimming";
                        dynamicBoxOne.innerHTML = `<input type="number" step="1" min="1" max="100" id="swimming">`;
                        var swimmingInput = document.getElementById('swimming');
                        swimmingInput.onchange = () => { swimming = parseInt(swimmingInput.value); };
                        dynamicTwoLabel.innerHTML = "Breed";
                        dynamicBoxTwo.innerHTML =
                            `<select id="breed">
                <option value=""disabled selected>Select Breed</option>
                <option>Gottingen</option>
                <option>Tamworth</option>
                <option>Porco</option>
            </select>`;
                        break;
                    case "Chestnut":
                        dynamicOneLabel.innerHTML = "Language";
                        dynamicBoxOne.innerHTML = `<input type="string" id="language">`;
                        dynamicTwoLabel.innerHTML = "Breed";
                        dynamicBoxTwo.innerHTML =
                            `<select id="breed">
                <option value=""disabled selected>Select Breed</option>
                <option>Duroc</option>
                <option>Kunekun</option>
                <option>Pietrain</option>
            </select>`;
                        break;
                    case "White":
                        dynamicOneLabel.innerHTML = "Speed";
                        dynamicBoxOne.innerHTML = `<input type="number" step="1" min="1" max="100" id="speed" >`;
                        dynamicTwoLabel.innerHTML = "Breed";
                        dynamicBoxTwo.innerHTML =
                            `<select id="breed">
                <option value=""disabled selected>Select Breed</option>
                <option>Mangalica</option>
                <option>Tamworth</option>
                <option>Choctaw</option>
            </select>`;
                        break;
                    case "Black":
                        dynamicOneLabel.innerHTML = "Strength";
                        dynamicBoxOne.innerHTML = `<input type="number" min="1" max="10" id="strength" >`;
                        dynamicTwoLabel.innerHTML = "Breed";
                        dynamicBoxTwo.innerHTML =
                            `<select id="breed">
                <option value=""disabled selected>Select Breed</option>
                <option>PotBelly</option>
                <option>Berkshire</option>
                <option>Mulefoot</option>
            </select>`;
                        break;
                }
                var breedInput = document.getElementById('breed');
                breedInput.onchange = () => { breed = breedInput.value; };
            };
            dynamicBoxOne.onchange = () => { };
            dynamicBoxTwo.onchange = () => {
                console.log(breed);
            };
            document.getElementById('submitBTN').addEventListener('click', function () {
                // Check if user inputed all boxes
                if (name == null || height == null || weight == null || personality == null || category == null) {
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
                console.log(dynamicBoxTwo);
            });
            document.getElementById("addBTN").addEventListener('click', function () {
                // Open up the add new pig menu to the right of Pig collection table 
                addTable.style.visibility = "visible";
            });
        }
    };
});
