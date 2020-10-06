var rows = document.querySelectorAll('#tBody tr');
for (let i = 0; i < rows.length; i++){
    let number = rows[i].children[0];
    let result = rows[i].children[1];
    number.innerHTML = i+1;
    result.innerHTML = 0;
}
var totalResults = [];

document.getElementById('run').addEventListener('click', function () {
    let amount = document.getElementById('amount').value;
    if(amount > 1000000){
        amount = 1000000;
    }
    for(let j = 0; j < amount; j++){
        let draw = lotteryDraw();
        /*for(let i =0; i < draw.length; i++){
            totalResults.push(draw[i]);
        }
         */
        totalResults.push(draw);
    }
    printResults(totalResults);
});

document.getElementById('findCombo').addEventListener('click', function () {
    let combo = document.getElementById('combo').value.split(" ");
    combo = fixCombo(combo);
    checkForCombination(combo);
});

document.getElementById('goUntilCombo').addEventListener('click', function () {
    let combo = document.getElementById('combo').value.split(" ");
    combo = fixCombo(combo);
    do {
        totalResults.push(lotteryDraw());
    } while (checkUntilFound(combo));
});

function fixCombo(combo) {
    let parsedCombo = [];
    for(let i = 0; i < combo.length; i++){
        parsedCombo.push(parseInt(combo[i]));
    }
    return parsedCombo;
}

function lotteryDraw() {
    let numbers = [];
    for (let i = 0; i < 45; i++){
        numbers.push(i+1);
    }
    let resultList = [];
    for(let i = 0; i < 6; i++){
        number = numbers[getRandomInt(0, numbers.length-1)];
        resultList.push(number);
        let index = numbers.indexOf(number);
        if (index > -1) {
            numbers.splice(index, 1);
        }
    }
    return resultList;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function printResults(results) {
    console.log(results);
    for(let i = 1; i < 46; i++){
        rows[i-1].children[1].innerHTML = getOccurrence(results, i);
    }
}

function getOccurrence(arr, value) {
    var count = 0;
    for(let i = 0; i < arr.length; i++){
        arr[i].forEach((v) => (v === value && count++));
    }
    return count;
}

function checkForCombination(combo){
    let found = false;
    for (let i = 0; i < totalResults.length; i++){
        if(arraysEqual(totalResults[i], combo)){
            document.getElementById('feedback').innerHTML = "combination found after "+i+" iterations";
            found = true;
        }
    }
    if(!found){
        console.log(combo);
        document.getElementById('feedback').innerHTML = "combination not found";
    }
}

function checkUntilFound(combo) {
    let notFound = true;
    for (let i = 0; i < totalResults.length; i++){
        if(arraysEqual(totalResults[i], combo)){
            console.log("combination found on position "+i);
            notFound = false;
        }
    }
    return notFound;
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    a.sort();
    b.sort();

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}
