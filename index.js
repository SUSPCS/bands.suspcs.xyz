var botProd = 0.5;
var botPrice = 100;
var blenderProd = 1;
var blenderPrice = 190;

// var declarations
const countElem = document.getElementById("count")
var currentCount = eval(document.getElementById("count"))
var countSaved = localStorage.getItem("count");
currentCount.innerHTML = eval(countSaved) + 0
document.getElementById("rubberStock").innerHTML = eval(localStorage.getItem("rubberStock"))
var i;
var money = eval(localStorage.getItem("money"))

// keeps the upgrades running
setInterval(function () {
    if (localStorage.getItem("rubberStock") < 1000) {
        return;
    } else {
        for (i = 0; i < localStorage.getItem("botCount"); i++) {
            bot()
        }
        for (i = 0; i < localStorage.getItem("blenderCount"); i++) {
            blender()
        }
    }
}, 1000)

// produce rubber bands
function produce(amount) {
    if (eval(localStorage.getItem("rubberStock")) < amount * 2) {
        return stop("Not enough rubber!")
    }
    currentCount = eval(document.getElementById("count").innerHTML)
    countElem.innerHTML = currentCount + amount
    document.getElementById("money").innerHTML = eval(localStorage.getItem("money"))
    subtractRubber(amount * 2)
    save(0)
}

// saving/reseting the game
function save(alertOrNo) {
    currentCount = eval(document.getElementById("count").innerHTML)
    localStorage.setItem("count", eval(currentCount))
    if (alertOrNo == 1) {
        return alert("Saved, you have " + eval(currentCount) + " rubber bands!")
    }
}

function reset() {
    if (confirm('Press OK to clear your progress.')) {
        localStorage.clear()
        window.location = "/"
    } else {
        alert("Nothing was deleted.")
        save(0)
    }
}

// subtract/add/buy rubber
function subtractRubber(inches) {
    localStorage.setItem("rubberStock", eval(localStorage.getItem("rubberStock")) - inches)
    document.getElementById("rubberStock").innerHTML = eval(localStorage.getItem("rubberStock"))
}

function addRubber(inches) {
    localStorage.setItem("rubberStock", eval(localStorage.getItem("rubberStock")) + inches)
    document.getElementById("rubberStock").innerHTML = localStorage.getItem("rubberStock")
}

function buy() {
    var amount = prompt("How much rubber should we buy?")
    addRubber(eval(amount))
}

// bot upgrade
function bot() {
    produce(botProd)
}

function buyBot() {
    money = eval(localStorage.getItem("money"))
    if (money < botPrice) {
        return stop("Not enough money.")
    } else {
        localStorage.setItem("money", money - botPrice)
        localStorage.setItem("botCount", eval(localStorage.getItem("botCount")) + 1)
    }
}

// blender upgrade
function blender() {
    money = eval(localStorage.getItem("money"))
    produce(blenderProd)
}

function buyBlender() {
    money = eval(localStorage.getItem("money"))
    if (money < blenderPrice) {
        return stop("Not enough money.");
    } else {
        localStorage.setItem("money", money - blenderPrice)
        localStorage.setItem("blenderCount", eval(localStorage.getItem("blenderCount")) + 1)
    }
}

// alert() but shortened
function stop(message) {
    alert(message)
}

function sell() {
    var amount = eval(document.getElementById("count").innerHTML)
    localStorage.setItem("money", eval(localStorage.getItem("money")) + amount * 1)
    localStorage.setItem("count", 0)
    document.getElementById("count").innerHTML = localStorage.getItem("count")
}