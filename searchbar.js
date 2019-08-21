var searchbar, suggbar, sugglist, errspan

var line = { prefix: "", data: "" }
var error = ""

var data = {
    placeholder: "",
    symbol: "",
    queryurl: "",
    savedsites: [],
    suggestions: [],
    hist: []
}

var defaults = {
    placeholder: "what can I do for you?",
    symbol: "/",
    queryurl: "https://duckduckgo.com/?q=",
    savedsites: [],
    suggestions: [],
    hist: []
}


var commands = [
    {
        aliases: ["scheme"],
        action: string => {
            
        }
    },
    {
        aliases: ["add"],
        action: string => {

        }
    },
    {
        aliases: ["remove", "rm"],
        action: string => {

        }
    },
    {
        aliases: ["duckduckgo", "ddg"],
        action: string => {
            window.location.href = "https://duckduckgo.com/?q=" + string
        }
    },
    {
        aliases: ["google", "ggl"],
        action: string => {
            window.location.href = "https://www.google.nl/search?q=" + string
        },
    }
]

window.addEventListener('DOMContentLoaded', init)

function init() {
    searchbar = document.querySelector("#searchbar")
    suggbar = document.querySelector("#suggbar")
    sugglist = document.querySelector("#suggs")
    errspan = document.querySelector("#err")

    loadDataOrGetDefault()
    commands.sort(compareCmds)

    window.addEventListener('keydown', handleKeyActions)
    window.addEventListener('mousedown', event => { event.preventDefault(); searchbar.focus() })
    searchbar.addEventListener('input', update)
    searchbar.focus()
}

function update(event) {
    event = (event || window.event)
    var target = event.target || event.srcElement
    //echo(event)
    var input = target.value
    var dsi = 0 // data start index
    suggbar.placeholder = ""
    if (input.startsWith(data.symbol)) {
        var wsi = input.indexOf(" ") // whitespace index
        line.prefix = (wsi != -1 ? input.substring(1, wsi) : input.substring(1))
        if (wsi == -1) suggestCommand(line.prefix)
    } else line.prefix = ""
    
    line.data = wsi != -1 ? input.substring(wsi + 1) : ""

    err("prefix: " + line.prefix + " data: " + line.data)
}

function handleKeyActions(event) {
    switch (event.key) {
        case "Tab":
            event.preventDefault()
            searchbar.focus()
            if (suggbar.placeholder != "" && line.data == "") {
                searchbar.value = suggbar.placeholder
                suggbar.placeholder = ""
            }
            break;
        case "Enter":
            if (line.prefix == "") search(line.data)
            else {
                exec()
            }
            break;
        default:
            break;
    }
}


// possible change to get command suggestion and used returned value in update function rather than modifying here
function suggestCommand(prefix) {
    if (prefix == "") return

    commands.forEach(cmd => {
        cmd.aliases.forEach(alias => {
            if (alias.startsWith(prefix)) {
                suggbar.placeholder = data.symbol + alias
                return
            }
        })
    });
}

function exec() {
    commands.forEach(cmd => { 
        if (cmd.aliases.includes(line.prefix)) { 
            echo(cmd)
            cmd.action(line.data)
            return
        }
    });
}

function search(query) {
    window.location.href = data.queryurl + query
}

// load data from localStorage or fill with default value if it is not stored
function loadDataOrGetDefault() {
    for (const key in defaults) data[key] = localStorage.getItem(key) || defaults[key]

    searchbar.placeholder = data.placeholder
}

function compareCmds(a, b) {
    if (a.aliases[0] < b.aliases[0]) return -1
    if (a.aliases[0] > b.aliases[0]) return 1
    return 0
}

function err(str) { errspan.innerHTML = str }
function echo(str) { console.log(str) }