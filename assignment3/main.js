System.register([], function (exports_1, context_1) {
    "use strict";
    var addTable, nameBox, heightBox, weightBox, personalityBox, categoryBox, dynamicBoxOne, dynamicBoxTwo, name, height, weight, personality, category;
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
            dynamicBoxTwo = document.getElementById('dynamic2');
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
                        console.log("grey");
                        dynamicBoxOne.innerHTML = "";
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
            });
            document.getElementById("addBTN").addEventListener('click', function () {
                // Open up the add new pig menu to the right of Pig collection table 
                addTable.style.visibility = "visible";
            });
        }
    };
});
