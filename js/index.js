const monstersURL = 'http://localhost:3000/monsters/?_limit=50'
const baseURL = 'http://localhost:3000/monsters'

let currentPage = 1
//I know that this variable is going to change, so I am using let rather than const

document.addEventListener('DOMContentLoaded', function() {
    fetchMonsters()
    
    // const formDiv = document.getElementById('create-monster')

    // let monsterForm = document.createElement('form')
    // let monsterNameInput = document.createElement('input')
    // monsterNameInput.name = "name"
    // monsterForm.appendChild(monsterNameInput)
    // formDiv.appendChild(monsterForm)

    const monsterForm = document.getElementById('monster-form')
    monsterForm.addEventListener('submit', createMonster)

    let forwardButton = document.getElementById('forward')
    forwardButton.addEventListener('click', advancePage)

    let backButton = document.getElementById('back')
    backButton.addEventListener('click', goBack)
})

function goBack() {
    console.log('going back...')
    currentPage--

    const monsterContainer = document.getElementById('monster-container')
    monsterContainer.innerHTML = ''
    fetchMonsters()
}

function advancePage() {
    console.log('advancing the page!!!')
    currentPage++
    
    const monsterContainer = document.getElementById('monster-container')
    monsterContainer.innerHTML = ''
    fetchMonsters()
}

function fetchMonsters() {
    fetch(`${monstersURL}&_page=${currentPage}`)
        .then(resp => resp.json())
        .then(monstersArray => monstersArray.forEach(monster => displayMonster(monster)))
}

function displayMonster(monster) {
    const monsterContainer = document.getElementById('monster-container')

    let monsterDiv = document.createElement('div')
    monsterDiv.id = monster.id
    monsterContainer.appendChild(monsterDiv)

    let monsterHeader = document.createElement('h1')
    monsterHeader.innerText = monster.name
    let ageHeader = document.createElement('h3')
    ageHeader.innerText = `Age: ${monster.age}`
    let descPara = document.createElement('p')
    descPara.innerText = `Description: ${monster.description}`

    monsterDiv.appendChild(monsterHeader)
    monsterDiv.appendChild(ageHeader)
    monsterDiv.appendChild(descPara)
}

function createMonster(event) {
    event.preventDefault()

    //get information from the form
    let name = document.getElementById('monster-name').value
    let age = document.getElementById('monster-age').value
    let desc = document.getElementById('monster-desc').value

    //Format this information to be passed to the fetch request
    let newMonster = {
        name: name,
        age: age,
        description: desc
    }

    //Save this monster to the API
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newMonster)
    }).then(resp => resp.json())
    .then(res => displayMonster(res))
    //Display this monster on the page
    //Do we want to display this monster on the first page, or in his proper order?
    //This code displays my monster on the DOM when it's created, if I hit refresh
    //my monster disappears b/c I'm making a new fetch call and returning only the first 50
}