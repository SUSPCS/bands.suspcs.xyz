var botProd = 0.5;
var botPrice = 100;
var blenderProd = 1;
var blenderPrice = 190;
var rubberCost = 0.4;

// var declarations
const countElem = document.getElementById("count")
var currentCount = eval(document.getElementById("count").innerHTML)
var i;
var money = eval(localStorage.getItem("money"))

// setup script
setup()
update()

function update() {
    document.getElementById("rubberStock").innerHTML = eval(localStorage.getItem("rubberStock"))
    document.getElementById("money").innerHTML = eval(localStorage.getItem("money"))
    document.getElementById("count").innerHTML = eval(localStorage.getItem("count"))
    document.getElementById("botOwned").innerHTML = eval(localStorage.getItem("botCount"))
    document.getElementById("blenderOwned").innerHTML = eval(localStorage.getItem("blenderCount"))
}

function setup() {
    document.getElementById("botPrice").innerHTML = botPrice
    document.getElementById("blenderPrice").innerHTML = blenderPrice
    if (!localStorage.getItem("newGame")) {
        localStorage.setItem("newGame", "false")
        localStorage.setItem("money", 10)
        return window.location = "/"
    } else if (localStorage.getItem("newGame") == "true") {
        localStorage.setItem("newGame", "false")
        localStorage.setItem("money", 10)
        return window.location = "/"
    } else {
        return;
    }
}

// keeps the upgrades running
setInterval(function () {
    for (i = 0; i < localStorage.getItem("botCount"); i++) {
        bot()
    }
    for (i = 0; i < localStorage.getItem("blenderCount"); i++) {
        blender()
    }
}, 1000)

// produce rubber bands
function produce(amount, alertOrNo) {
    if (isNaN(localStorage.getItem("rubberStock"))) {
        localStorage.setItem("rubberStock", 0)
    }
    if (eval(localStorage.getItem("rubberStock")) < amount * 2) {
        if (alertOrNo == 1) {
            return stop("Not enough rubber!");
        }
    } else {
        localStorage.setItem("count", eval(localStorage.getItem("count")) + 1)
        update()
        subtractRubber(amount * 2)
    }
}

// saving/reseting the game
function save(alertOrNo) {
    update()
}

function reset() {
    if (confirm('Press OK to clear your progress.')) {
        localStorage.clear()
        localStorage.setItem("newGame", "true")
        window.location = "/"
    } else {
        alert("Nothing was deleted.")
        save(0)
    }
}

// subtract/add/buy rubber
function subtractRubber(inches) {
    localStorage.setItem("rubberStock", eval(localStorage.getItem("rubberStock")) - inches)
    update()
}

function addRubber(inches) {
    localStorage.setItem("rubberStock", eval(localStorage.getItem("rubberStock")) + inches)
    update()
}

function buy() {
    var amount = prompt("How much rubber should we buy?")
    if (eval(amount) == "" || !amount || isNaN(amount)) {
        return stop("Please input an amount to buy.");
    } else {
        if (!localStorage.getItem("money") || localStorage.getItem("money") < rubberCost * amount) {
            return alert("Not enough money!")
        } else {
            addRubber(eval(amount))
            localStorage.setItem("money", localStorage.getItem("money") - rubberCost * amount)
            update()
        }
    }
}

// bot upgrade
function bot() {
    produce(botProd)
}

function buyBot() {
    update()
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
    update()
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
    update()
}