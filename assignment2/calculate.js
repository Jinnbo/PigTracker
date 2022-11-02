
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

// Initialize Initial lowerBounds
var lowerBound_List = [100,95,90,85,80,75,70,65,60,55,50,0];

// Event listeners for Input Boxes
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

// Flags
overlapFlag = false;
fileFlag = false;

// Check for valid lower bounds
function checkBounds(){

    // Check for overlap
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
    if (!overlapFlag && fileFlag) generateHistogram(); 
    
    // If grades are overlapping, clear histogram
    if (overlapFlag) clearHistogram();
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
    reader.readAsText(event.target.files[0]);
}

function handFileLoad(event){
    console.log(event.target.result.split(", ")[0])
    displayStats(event.target.result,',');
    fileFlag = true;
}

function displayStats(str, delimiter = ","){

    // Split string into headers and rows
    var headers = str.slice(0, str.indexOf("\n")).split(delimiter);
    var rows = str.slice(str.indexOf("\n") + 1).split("\n");   

    let arraySize = rows.length;
    
    // Split rows in dataArray with name and grade
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

    //Call Generate Histogram
    generateHistogram();
}   

// Function for finding highest Stat
function findHighest(dataArray, length){
    var maxGrade = parseFloat(dataArray[0][1]);
    var maxStudent = dataArray[0][0];

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
    let minStudent = dataArray[0][0];

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
        return ((gradeList[(parseInt(length)/2)-1] + gradeList[ (parseInt(length)/2)])/2) + "%";
    }
    // If length is odd
    else{
        return (gradeList[((parseInt(length)+1)/2)-1]) + "%";
    }
}

// Selectors for Histogram
var box1 = document.getElementById("boxContainerEleven");      // F
var box2 = document.getElementById("boxContainerTen");         // D
var box3 = document.getElementById("boxContainerNine");        // C-
var box4 = document.getElementById("boxContainerEight");       // C
var box5 = document.getElementById("boxContainerSeven");       // C+
var box6 = document.getElementById("boxContainerSix");         // B-
var box7 = document.getElementById("boxContainerFive");        // B
var box8= document.getElementById("boxContainerFour");         // B+
var box9 = document.getElementById("boxContainerThree");       // A-
var box10 = document.getElementById("boxContainerTwo");        // A
var box11 = document.getElementById("boxContainerOne");        // A+

// Selectors for number Label
var num1 = document.getElementById("number Eleven");
var num2 = document.getElementById("number Ten");
var num3 = document.getElementById("number Nine");
var num4 = document.getElementById("number Eight");
var num5 = document.getElementById("number Seven");
var num6 = document.getElementById("number Six");
var num7 = document.getElementById("number Five");
var num8 = document.getElementById("number Four");
var num9 = document.getElementById("number Three");
var num10 = document.getElementById("number Two");
var num11 = document.getElementById("number One");

// Set max box_height = 25vh
var MAX_BOX_HEIGHT = 25;

// Generate Histogram
function generateHistogram(){
    
    // Init list where numInBounds[0] = # of a+, numInBounds[1] = # of a, ...
    var numInBounds = new Array(11).fill(0);

    // Get list of key:pair values for grade : number of students in that grade range
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

    /*
    Dynamically display Histogram
        1. Get the letter grade with the highest frequency
        2. 25/ (highest freq grade) = scale ratio
        3. freq * scale ratio = view height for that letter grade
    */
    var maxFreq = 0;

    // Find max frequency
    for (let i = 0;i<numInBounds.length;i++){
        if (numInBounds[i] > maxFreq) maxFreq = numInBounds[i];
    }

    // Set div box width, backgroundcolor, and value
    for (let i = 1;i<=11;i++){
        window[`box${i}`].style.width = "3.2vw";
        window[`box${i}`].style.backgroundColor = "rgb(153,30,46)";

        if (numInBounds[i-1] != 0){
            window[`num${i}`].innerHTML = `${numInBounds[i-1]}`;
        }
        else{
            window[`num${i}`].innerHTML = '';
        }
    }

    var scaleFactor = MAX_BOX_HEIGHT/maxFreq;

    // Set div box height
    for (let i = 1;i<=11;i++){
        window[`box${i}`].style.height = `${numInBounds[i-1]*scaleFactor}vh`;
    }
}

// Clear Histogram function
function clearHistogram(){
    for (let i = 1;i<=11;i++){
        window[`box${i}`].style.height = "0vh";
        window[`box${i}`].style.width = "0vw";
        window[`num${i}`].innerHTML = '';
    }
}