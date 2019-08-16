var searchbar, suggbar, sugglist

var suggestions = []
var commands = []
var history = []
var savedsites = []

var symbol = "/"

window.addEventListener('DOMContentLoaded', init)

function init() {
    searchbar = document.getElementById("searchbar")
    suggbar = document.getElementById("suggbar")
    sugglist = document.getElementById("suggs")

    searchbar.onkeydown = update;
}

function update(event) {
    event = (event || window.event)
    var target = event.target || event.srcElement
    var line = target.value.trim()

    // TODO: spell check
    if (line.startsWith(symbol)) {
        // check/suggest commands
    } else {
        // check/suggest savedsites and history
    }


    if (event.key == "Enter") {
        // save history
        // excute command / perform search
    }

    // echo(line)
}


function err(str) { console.error(str) }
function echo(str) { console.log(str) }