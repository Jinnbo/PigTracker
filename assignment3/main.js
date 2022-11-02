System.register([], function (exports_1, context_1) {
    "use strict";
    var addTable;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            addTable = document.getElementById("addTable");
            document.getElementById("addBTN").addEventListener('click', function () {
                // Open up the add new pig menu to the right of Pig collection table 
                addTable.style.visibility = "visible";
                // Get all the Info (name, weight, height, category, ...) 
                console.log(document.getElementById("name").innerHTML);
                // Create new pig with pig constructor with all the info above
                // Add new pig to pig controller
            });
        }
    };
});
