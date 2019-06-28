const monstBaseUrl = 'http://localhost:3000/monsters'
let currentPage;

document.addEventListener('DOMContentLoaded', function() {
    getFirst50Monsters()
    getMonsterForm().addEventListener('submit', addMonster)
    let button = getForwardButton()
    button.addEventListener('click', advancePage)
    let backButton = getBackButton()
    backButton.addEventListener('click', goBack)
})

function goBack() {
    currentPage--
    getMonsterContainer().innerHTML = ''

    fetch(`${monstBaseUrl}/?_limit=50&_page=${currentPage}`)
    .then(resp => resp.json())
    .then(monsters => monsters.forEach( monster => displayMonster(monster)))
}

function advancePage() {
    currentPage++
    getMonsterContainer().innerHTML = ''

    fetch(`${monstBaseUrl}/?_limit=50&_page=${currentPage}`)
    .then(resp => resp.json())
    .then(monsters => monsters.forEach( monster => displayMonster(monster)))
}

function getFirst50Monsters() {
    currentPage = 1
    fetch(`${monstBaseUrl}/?_limit=50`)
    .then(resp => resp.json())
    .then(monsters => monsters.forEach(monster => displayMonster(monster)))
}

function displayMonster(monster) {

    let monsterDiv = document.createElement('div')
    monsterDiv.id = monster.id
    
    let monsterHeader = document.createElement('h1')
    monsterHeader.innerText = monster.name
    let ageTag = document.createElement('h3')
    ageTag.innerText = `Age: ${Math.floor(monster.age)}`
    let monsterDesc = document.createElement('p')
    monsterDesc.innerText = `Description: ${monster.description}`

    monsterDiv.append(monsterHeader, ageTag, monsterDesc)
    getMonsterContainer().appendChild(monsterDiv)
}

function addMonster(event) {
    event.preventDefault()

    let name = document.getElementById('monster-name').value
    let age = document.getElementById('monster-age').value
    let desc = document.getElementById('monster-desc').value

    newMonster = {
        name: name,
        age: age,
        description: desc
    }

    fetch(`${monstBaseUrl}`, {
        method: 'POST', 
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
        body: JSON.stringify(newMonster)
    }).then(resp => resp.json())
    .then(result => displayMonster(result))
}

////////////////// Functions to grab nodes ////////////////
function getMonsterContainer() {
    return document.querySelector('#monster-container')
}

function getMonsterForm() {
    return document.getElementById('monster-form')
}

function getForwardButton() {
    return document.getElementById('forward')
}

function getBackButton() {
    return document.querySelector('#back')
}

