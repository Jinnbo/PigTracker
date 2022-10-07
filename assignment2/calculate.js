

// Selectors for Input Boxes
const max = document.getElementById('max');
const aPlus = document.getElementById('a+');
const a  = document.getElementById('a');
const aMinus = document.getElementById('a-');
const bPlus = document.getElementById('b+');
const b = document.getElementById('b');
const bMinus = document.getElementById('b-');
const cPlus = document.getElementById('c+');
const c = document.getElementById('c');
const cMinus = document.getElementById('c-');
const d = document.getElementById('d');
const f = document.getElementById('f');


// Functions for reading file input
function init(){
    document.getElementById('fileInput').addEventListener('change',handFileSelect,false);
}

function handFileSelect(event){
    const reader = new FileReader();
    reader.onload = handFileLoad;
    reader.readAsText(event.target.files[0]);
}

function handFileLoad(event){
    console.log(event);
    document.getElementById('fileContent').textContent = event.target.result;
}



// Read and Parse input from .txt file 

// Have 4 functions that generate stats

