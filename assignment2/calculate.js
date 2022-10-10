

// Selectors for Input Boxes
var max = document.getElementById('max');
var aPlus = document.getElementById('a+');
var a  = document.getElementById('a');
var aMinus = document.getElementById('a-');
var bPlus = document.getElementById('b+');
var b = document.getElementById('b');
var bMinus = document.getElementById('b-');
var cPlus = document.getElementById('c+');
var c = document.getElementById('c');
var cMinus = document.getElementById('c-');
var d = document.getElementById('d');
var f = document.getElementById('f');


// Functions for reading file input
function init(){
    document.getElementById('fileInput').addEventListener('change',handFileSelect,false);
}

function handFileSelect(event){
    var reader = new FileReader();
    reader.onload = handFileLoad;
    reader.readAsText(event.target.files[0]);
}

function handFileLoad(event){
    console.log(event.target.result.split(", ")[0]);

    //document.getElementById('fileContent').textContent = event.target.result;
}



// Read and Parse input from .txt file 

// Have 4 functions that generate stats

