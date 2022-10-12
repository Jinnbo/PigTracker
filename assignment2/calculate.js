// TODO:
/* 

    1. Make exceptions for lowerbounds- overlapping bounds
    2. Make histogram dynamic with lowerbounds
    3. Check median stat for when n = even # 

*/

// Selectors for Input Boxes
var max = document.getElementById('max').value = 100;
var aPlus = document.getElementById('a+').value = 95;
var a  = document.getElementById('a').value = 90;
var aMinus = document.getElementById('a-').value = 85;
var bPlus = document.getElementById('b+').value = 80;
var b = document.getElementById('b').value = 75;
var bMinus = document.getElementById('b-').value = 70;
var cPlus = document.getElementById('c+').value = 65;
var c = document.getElementById('c').value = 60;
var cMinus = document.getElementById('c-').value = 55;
var d = document.getElementById('d').value = 50;
var f = document.getElementById('f').value = 0;



// Selector for Stats
var highestStat = document.getElementById('highestStat');
var lowestStat = document.getElementById('lowestStat');
var meanStat = document.getElementById('meanStat');
var medianStat = document.getElementById('medianStat');

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
}

function displayStats(str, delimiter = ","){

    // Split string into headers and rows
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");   

    // Store student name and percent in dataArray where index 0 is name and index 1 is percent
    let dataArray = [];
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

    makeGraph("histogramContainer", "labels");
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
function findMedianGrade(dataArray,length){

    let gradeList = [];

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
        console.log((parseInt(length)+1)/2);
        console.log(gradeList);
        return (gradeList[((parseInt(length)+1)/2)-1]) + "%";
    }
}

function lowerBoundCheck(){
    console.log(aPlus);
}

lowerBoundCheck();

function makeGraph(container, labels)
{
    container = document.getElementById(container);
    labels = document.getElementById(labels)
    var dnl = container.getElementsByTagName("li");
    for(var i = 0; i < dnl.length; i++)
    {
        var item = dnl.item(i);
        var value = item.innerHTML;
        var color = item.style.background=color;
        var content = value.split(":");
        value = content[0];
        item.style.top=(245 - value) + "px";
        item.style.left = (i * 3) + "vw";
        item.style.height = value + "px";
        
        if (value > 5){
            item.innerHTML = value;
        }
        else{
            item.innerHTML = ""
        }
        item.style.visibility="visible";	

        labels.innerHTML = labels.innerHTML + "<span style='margin:12px '>" + content[1] + "</span>";
    }	
}