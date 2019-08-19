var searchbar, suggbar, sugglist, errspan

var symbol = "/"
var queryurl = "https://duckduckgo.com/?q="
var line = { prefix: "", data: "" }
var error = ""

var savedsites = []
var suggestions = []
var hist = []

var allowkeys = "Backspace" || "Delete" || "ArrowLeft" || "ArrowRight" || "ArrowUp" || "ArrowDown"

var commands = [
    {
        name: "scheme",
        action: string => {
            
        },
        help: ""
    },
    {
        name: "add",
        action: string => {

        },
        help: ""
    },
    {
        name: "remove",
        action: string => {

        },
        help: "",
        aliases: ["rm"]
    },
    {
        name: "duckduckgo",
        action: string => {

        },
        aliases: ["ddg"]
    },
    {
        name: "google",
        action: string => {
            window.location.href = "https://www.google.nl/search?q=" + string
        },
        aliases: ["ggl"]
    },
    {
        name: "queryurl",
        action: string => {
            queryurl = string
        }
    }
]

window.addEventListener('DOMContentLoaded', init)

function init() {
    searchbar = document.getElementById("searchbar")
    suggbar = document.getElementById("suggbar")
    sugglist = document.getElementById("suggs")
    errspan = document.getElementById("err")

    window.addEventListener('keydown', handleKeyActions)
    window.addEventListener('mousedown', event => { event.preventDefault(); searchbar.focus() })
    searchbar.addEventListener('input', update)
}

function update(event) {
    event = (event || window.event)
    var target = event.target || event.srcElement
    echo(event)
    var input = target.value.trim()
    var dsi = 0 // data start index
    if (input.startsWith(symbol)) {
        var wsi = input.indexOf(" ") // whitespace index
        line.prefix = (wsi != -1 ? input.substring(1, wsi) : input.substring(1))
    }
    line.data = input.substring(wsi != -1 ? wsi + 1 : 0)

    err ("prefix: " + line.prefix + " data: " + line.data)
}

function handleKeyActions(event) {
    switch (event.key) {
        case "Tab":
            event.preventDefault()
            break;
        case "Enter":
            if (line.prefix == "") {
                search(line.data)
            } 
            break;
        default:
            break;
    }
}

function suggestCommand(cmd) {

}

function exec(cmd) {

}

function search(query) {
    window.location.href = queryurl + query
}

function err(str) { errspan.innerHTML = str }
function echo(str) { console.log(str) }