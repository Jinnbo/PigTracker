
import {Pig} from './Pigmodel'

var addTable = document.getElementById("addTable")!
var name = document.getElementById("name")!

name.oninput = () => {console.log(name.value)}

document.getElementById("addBTN")!.addEventListener('click', function(){

    // Open up the add new pig menu to the right of Pig collection table 
    addTable.style.visibility = "visible";

    // Get all the Info (name, weight, height, category, ...)

    // Create new pig with pig constructor with all the info above

    // Add new pig to pig controller
})
