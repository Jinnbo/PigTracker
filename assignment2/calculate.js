// TODO:
/* 

    1. Make exceptions for lowerbounds- overlapping bounds
    2. Make histogram dynamic with lowerbounds
    3. Check median stat for when n = even # 

*/

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
var errorMessage = document.getElementById('errorMessage')


// Event listeners for Input Boxes
var lowerBound_List = [100,95,90,85,80,75,70,65,60,55,50,0];

//max.addEventListener("blur", () => { lowerBound_List[0] = parseFloat(max.value); checkBounds() });
max.oninput = () => { lowerBound_List[0] = parseFloat(max.value); checkBounds();} 
aPlus.oninput = () => { lowerBound_List[1] = parseFloat(aPlus.value); checkBounds();} 
a.oninput = () => { lowerBound_List[2] = parseFloat(a.value); checkBounds();} 
aMinus.oninput = () => { lowerBound_List[3] = parseFloat(aMinus.value); checkBounds();} 
bPlus.oninput = () => { lowerBound_List[4] = parseFloat(bPlus.value); checkBounds();} 
b.oninput = () => { lowerBound_List[5] = parseFloat(b.value); checkBounds();} 
bMinus.oninput = () => { lowerBound_List[6] = parseFloat(bMinus.value); checkBounds();} 
cPlus.oninput = () => { lowerBound_List[7] = parseFloat(cPlus.value); checkBounds();} 
c.oninput = () => { lowerBound_List[8] = parseFloat(c.value); checkBounds();} 
cMinus.oninput = () => { lowerBound_List[9] = parseFloat(cMinus.value); checkBounds();} 
d.oninput = () => { lowerBound_List[10] = parseFloat(d.value); checkBounds();} 
f.oninput = () => { lowerBound_List[11] = parseFloat(f.value); checkBounds();} 

function checkBounds(){

    var overlapFlag = false;

    // Check for overlap
    // If lowerBound_List[i] <= lowerBound_List[i+1]  
    for (let i =0;i<lowerBound_List.length-1; i++){
        if (lowerBound_List[i] <= lowerBound_List[i+1]){
            errorMessage.innerHTML = "ERROR: Bounds are overlapping. Please change to continue";
            overlapFlag = true;
            break;
        }
        else if (i == lowerBound_List.length-2 && lowerBound_List[i] > lowerBound_List[i+1]){
            errorMessage.innerHTML = "";
            overlapFlag = false;
        }
    }

    // If grades are not overlapping then call makeHistogram function
    if (!overlapFlag){
        generateHistogram(); 
    }
}

// Selector for Stats
var highestStat = document.getElementById('highestStat');
var lowestStat = document.getElementById('lowestStat');
var meanStat = document.getElementById('meanStat');
var medianStat = document.getElementById('medianStat');


// Store student name and percent in dataArray where index 0 is name and index 1 is percent
dataArray = [];

// Functions for reading file input
function init(){
    document.getElementById('fileInput').addEventListener('change',handFileSelect,false);
}

function handFileSelect(event){
    const reader = new FileReader();
    reader.onload = handFileLoad;

    // event.target selects whatever envoked the event 
    reader.readAsText(event.target.files[0]);
}

function handFileLoad(event){
    console.log(event.target.result.split(", ")[0])
    displayStats(event.target.result,',');
}

function displayStats(str, delimiter = ","){

    // Split string into headers and rows
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");   

    let arraySize = rows.length;
    
    for (let i = 0;i<rows.length;i++){
        dataArray.push(rows[i].slice(0,rows[i].indexOf("\r")).split(delimiter));
    }
    
    // Call functions to get highest, lowest, mean, median stats
    let highestStudent = findHighest(dataArray,arraySize);
    let lowestStudent = findLowest(dataArray,arraySize);
    let meanGrade = findMeanGrade(dataArray,arraySize);
    let medianGrade = findMedianGrade(dataArray,arraySize);

    // Add the stats to the html
    highestStat.innerHTML = highestStudent;
    lowestStat.innerHTML = lowestStudent;
    meanStat.innerHTML = meanGrade;
    medianStat.innerHTML = medianGrade;
}   

// Function for finding highest Stat
function findHighest(dataArray, length){
    let maxGrade = parseFloat(dataArray[0][1]);
    let maxStudent;

    for (let i = 1; i < length;i++ ){
        if (parseFloat(dataArray[i][1]) > parseFloat(maxGrade)){
            maxGrade = dataArray[i][1];
            maxStudent = dataArray[i][0];
        }
    }

    maxStudent = maxStudent.trim();
    let maxStat = maxStudent+" ("+maxGrade+"%)"
    return maxStat;
}   

// Function for finding lowest Stat
function findLowest(dataArray, length){
    let minGrade = parseFloat(dataArray[0][1]);
    let minStudent;

    for (let i = 1;i < length;i++){
        if (parseFloat(dataArray[i][1]) < parseFloat(minGrade)){
            minGrade = dataArray[i][1];
            minStudent = dataArray[i][0];
        }
    }

    minStudent = minStudent.trim();
    let minStat = minStudent+" ("+minGrade+"%)"
    return minStat;
}


// Function for finding mean Stat
function findMeanGrade(dataArray, length){
    let mean = 0;

    for (let i = 0;i <length;i++){
        mean += parseFloat(dataArray[i][1]);
    }

    return (mean/length).toFixed(2) + "%";
}


// Function for finding median Stat
gradeList = [];
function findMedianGrade(dataArray,length){

    for (let i = 0;i<length;i++){
        gradeList.push(parseFloat(dataArray[i][1]));
    }

    gradeList.sort(function(a,b) { return a-b;});


    // If length is even
    if (length%2==0){
        return ((gradeList[(parseInt(length)/2)] + gradeList[ (parseInt(length)/2)+1])/2) + "%";
    }
    // If length is odd
    else{
        //console.log((parseInt(length)+1)/2);
        console.log(gradeList);
        return (gradeList[((parseInt(length)+1)/2)-1]) + "%";
    }
}

// Selectors for Histogram
var boxOne = document.getElementById("boxContainerOne");
var boxTwo = document.getElementById("boxContainerTwo");
var boxThree = document.getElementById("boxContainerThree");
var boxFour = document.getElementById("boxContainerFour");
var boxFive = document.getElementById("boxContainerFive");
var boxSix = document.getElementById("boxContainerSix");
var boxSeven = document.getElementById("boxContainerSeven");
var boxEight = document.getElementById("boxContainerEight");
var boxNine = document.getElementById("boxContainerNine");
var boxTen = document.getElementById("boxContainerTen");
var boxEleven = document.getElementById("boxContainerEleven");

var MAX_BOX_HEIGHT = "230px";

boxOne.style.width = "10px";
boxOne.style.maxHeight = "225px";
boxOne.style.backgroundColor = "green";

// Generate Histogram
function generateHistogram(){
    
    // Init list where numInBounds[0] = # of a+, numInBounds[1] = # of a, ...
    var numInBounds = new Array(11).fill(0);

    // Get list of key:pair values for grade : number of students in that grade range
    console.log(gradeList);
    console.log(lowerBound_List);

    for (let i = 0;i<gradeList.length;i++){
        if (gradeList[i] >= lowerBound_List[1]) numInBounds[0]++;
        if (gradeList[i] >= lowerBound_List[2] && gradeList[i] < lowerBound_List[1]) numInBounds[1]++;
        if (gradeList[i] >= lowerBound_List[3] && gradeList[i] < lowerBound_List[2]) numInBounds[2]++;
        if (gradeList[i] >= lowerBound_List[4] && gradeList[i] < lowerBound_List[3]) numInBounds[3]++;
        if (gradeList[i] >= lowerBound_List[5] && gradeList[i] < lowerBound_List[4]) numInBounds[4]++;
        if (gradeList[i] >= lowerBound_List[6] && gradeList[i] < lowerBound_List[5]) numInBounds[5]++;
        if (gradeList[i] >= lowerBound_List[7] && gradeList[i] < lowerBound_List[6]) numInBounds[6]++;
        if (gradeList[i] >= lowerBound_List[8] && gradeList[i] < lowerBound_List[7]) numInBounds[7]++;
        if (gradeList[i] >= lowerBound_List[9] && gradeList[i] < lowerBound_List[8]) numInBounds[8]++;
        if (gradeList[i] >= lowerBound_List[10] && gradeList[i] < lowerBound_List[9]) numInBounds[9]++;
        if (gradeList[i] >= lowerBound_List[11] && gradeList[i] < lowerBound_List[10]) numInBounds[10]++;
    }
    


    console.log(numInBounds);
}

