const countElem = document.getElementById("count")
var currentCount = eval(document.getElementById("count"))
var countSaved = localStorage.getItem("count");
currentCount.innerHTML = eval(countSaved)

function produce(amount) {
    currentCount = eval(document.getElementById("count").innerHTML)
    countElem.innerHTML = currentCount + amount
}

function save() {
    currentCount = eval(document.getElementById("count").innerHTML)
    localStorage.setItem("count", eval(currentCount))
    alert("Saved, you have " + eval(currentCount) + " rubber bands!")
}