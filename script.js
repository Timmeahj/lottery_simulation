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
    for(let j = 0; j < amount; j++){
        let draw = lotteryDraw();
        for(let i =0; i < draw.length; i++){
            totalResults.push(draw[i]);
        }
    }
    printResults(totalResults);
});

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

function getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}
