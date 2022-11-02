System.register([], function (exports_1, context_1) {
    "use strict";
    var addTable, name;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            addTable = document.getElementById("addTable");
            name = document.getElementById("name");
            name.oninput = () => { console.log(name.textContent); };
            document.getElementById("addBTN").addEventListener('click', function () {
                // Open up the add new pig menu to the right of Pig collection table 
                addTable.style.visibility = "visible";
                // Get all the Info (name, weight, height, category, ...)
                // Create new pig with pig constructor with all the info above
                // Add new pig to pig controller
            });
        }
    };
});
