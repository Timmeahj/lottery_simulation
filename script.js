let rows = document.querySelectorAll('#tBody tr');
for (let i = 0; i < rows.length; i++){
    let number = rows[i].children[0];
    let result = rows[i].children[1];
    number.innerHTML = i+1;
    result.innerHTML = 0;
}
let totalResults = [];

function resetLottery(){
    let lotteryBox = document.getElementById('lotteryBox');
    lotteryBox.innerHTML = "";
    document.getElementById('ballsDrawn').innerHTML = "";
    for(let i = 0; i < 45; i++){
        let ball = document.createElement('div');
        ball.classList.add('ball');
        ball.id = i+1+"";
        ball.innerHTML = i+1+"";
        lotteryBox.appendChild(ball);
    }
}
resetLottery();

document.getElementById('run').addEventListener('click', function () {
    let amount = document.getElementById('amount').value;
    if(amount > 1000000){
        amount = 1000000;
    }
    for(let j = 0; j < amount; j++){
        let draw = lotteryDraw();
        totalResults.push(draw);
    }
    printResults(totalResults);
});

document.getElementById('demo').addEventListener('click', function () {
    resetLottery();
    let numbers = [];
    for (let i = 0; i < 45; i++){
        numbers.push(i+1);
    }
    let resultList = [];
    for(let i = 0; i < 6; i++){
        setTimeout(function () {
            var number = numbers[getRandomInt(0, numbers.length-1)];
            resultList.push(number);
            document.getElementById(number).style.display = "none";
            let index = numbers.indexOf(number);
            if (index > -1) {
                numbers.splice(index, 1);
            }
            let ball = document.createElement('div');
            ball.classList.add('ball');
            ball.innerHTML = number+'';
            document.getElementById("ballsDrawn").appendChild(ball);
        }, (i+1) * 1000);
    }
    setTimeout(function () {
        totalResults.push(resultList);
        printResults(totalResults);
    }, 7000);
});

document.getElementById('findCombo').addEventListener('click', function () {
    let combo = document.getElementById('combo').value.split(" ");
    combo = fixCombo(combo);
    checkForCombination(combo);
});
/*
document.getElementById('goUntilCombo').addEventListener('click', function () {
    let combo = document.getElementById('combo').value.split(" ");
    combo = fixCombo(combo);
    do {
        totalResults.push(lotteryDraw());
    } while (checkUntilFound(combo));
});*/

function fixCombo(combo) {
    let parsedCombo = [];
    for(let i = 0; i < combo.length; i++){
        parsedCombo.push(parseInt(combo[i]));
    }
    return parsedCombo;
}

function lotteryDraw() {
    //Maak een lijst met alle nummers van 1 - 45
    let numbers = [];
    for (let i = 0; i < 45; i++){
        numbers.push(i+1);
    }
    //Maak een lege lijst waar de getrokken nummers in gaan komen
    let resultList = [];
    //Doe dit 6 keer na elkaar, NIET TEGELIJK
    for(let i = 0; i < 6; i++){
        //HET BEGIN
        //in number zit nu een willekeurig balletje van 1 - 45, zonder de vorige getrokken balletjes
        let number = numbers[randrange(0, numbers.length)];
        //In de lijst steken we dit nummer
        resultList.push(number);
        //Dit nummer gaan we nu uit onze glazen bol met alle nummertjes halen
        let index = numbers.indexOf(number);
        if (index > -1) {
            //Hier verdwijnt het balletje
            numbers.splice(index, 1);
        }
        //Nu gaan we terug naar HET BEGIN en doen we het volgende balletje
    }
    //hier steken we de lottotrekking met zijn 6 balletjes in een grote lijst van lottotrekkingen
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
    displayResults();
    showButtons();
    updateAmount();
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
    let timesFound = 0;
    let firstTime;
    for (let i = 0; i < totalResults.length; i++){
        if(arraysEqual(totalResults[i], combo)){
            if(timesFound === 0){
                firstTime = i+1;
            }
            timesFound++;
            document.getElementById('feedback').innerHTML = "The combination  has been found after "+firstTime+" iterations.<br>The result has been found "+timesFound+" time(s)";
            document.getElementById('feedback').style.borderBottomColor = getRandomColor();
            found = true;
        }
    }
    if(!found){
        console.log(combo);
        document.getElementById('feedback').innerHTML = "combination not found";
        document.getElementById('feedback').style.borderBottomColor = getRandomColor();
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

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

let page = 1;

function displayResults(){
    showButtons();
    let allResultsBox = document.getElementById("allResults");
    allResultsBox.innerHTML = "";
    for (let i = (page-1)*100; i < page*100; i++) {
        let drawing = document.createElement("li");
        drawing.innerHTML = i+1+". ";
        for(let j = 0; j < totalResults[i].length; j++){
            drawing.innerHTML += "<div class='ball2'>"+totalResults[i][j]+"</div>";
        }
        allResultsBox.appendChild(drawing);
    }
}

document.getElementById('next').addEventListener('click', function () {
    next();
});

document.getElementById('previous').addEventListener('click', function () {
    previous();
});

function next(){
    if(page < totalResults.length/100){
        page++;
    }
    displayResults();
}

function previous() {
    if(page > 1){
        page--;
    }
    displayResults();
}

function showButtons() {
    document.getElementById('next').style.display = "block";
    document.getElementById('previous').style.display = "block";
}

function randrange(min, max) {
    var range = max - min;
    if (range <= 0) {
        throw new Exception('max must be larger than min');
    }
    var requestBytes = Math.ceil(Math.log2(range) / 8);
    if (!requestBytes) { // No randomness required
        return min;
    }
    var maxNum = Math.pow(256, requestBytes);
    var ar = new Uint8Array(requestBytes);

    while (true) {
        window.crypto.getRandomValues(ar);

        var val = 0;
        for (var i = 0;i < requestBytes;i++) {
            val = (val << 8) + ar[i];
        }

        if (val < maxNum - maxNum % range) {
            return min + (val % range);
        }
    }
}

function updateAmount() {
    document.getElementById('amountSpan').innerHTML = totalResults.length+"";
}
