import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://we-are-the-champions-a8e95-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsListInDB = ref(database, "endorsementsList")
const endorsementInputEl = document.getElementById("endorsement-input")
const publishBtnEl = document.getElementById("publish-btn")
const endorsementListEl = document.getElementById("endorsement-list")

publishBtnEl.addEventListener("click", function() {
    let inputValue = endorsementInputEl.value
    console.log(inputValue)
    push(endorsementsListInDB, inputValue)
    clearEndorsementInputEl()
})

onValue(endorsementsListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let endorsementArray = Object.entries(snapshot.val())
        clearEndorsementListEl()
        for (let i = 0; i< endorsementArray.length; i++) {
            let currentEndorsement = endorsementArray[i]
            let currentEndorsementID = endorsementArray[0]
            let currentEndorsementValue = endorsementArray[1]
            appendEndorsementContainerEl(currentEndorsement)
        }
    } else {
        endorsementListEl.innerHTML = "No endorsements here... yet"
    }
})

function clearEndorsementInputEl() {
    endorsementInputEl.value = ""
}

function clearEndorsementListEl() {
    endorsementListEl.innerHTML = ""
}

function appendEndorsementContainerEl(endorsement) {
    let endorsementValue = endorsement[1]
    let newEl = document.createElement("li")

    newEl.textContent = endorsementValue
    endorsementListEl.append(newEl)
}