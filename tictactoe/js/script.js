let isPlayerOneTurn = true
let counter = 0

const box1 = document.getElementById('box1')
const box2 = document.getElementById('box2')
const box3 = document.getElementById('box3')
const box4 = document.getElementById('box4')
const box5 = document.getElementById('box5')
const box6 = document.getElementById('box6')
const box7 = document.getElementById('box7')
const box8 = document.getElementById('box8')
const box9 = document.getElementById('box9')

const boxes = document.getElementsByClassName("div2")

function setup() {
	// box1.onclick = onClickHandler
	// box2.onclick = onClickHandler
	// box3.onclick = onClickHandler
	// box4.onclick = onClickHandler
	// box5.onclick = onClickHandler
	// box6.onclick = onClickHandler
	// box7.onclick = onClickHandler
	// box8.onclick = onClickHandler
	// box9.onclick = onClickHandler
	for(let i = 0; i < boxes.length; i++) {
		boxes[i].onclick = onClickHandler
	}
}

setup()

// Insert Character
function insertCharacter(element, string) {
	if(element.textContent == ""){
		element.innerHTML = string
		counter++
		switchPlayer()
	}
}

// Switching Player
function switchPlayer() {
	isPlayerOneTurn = !isPlayerOneTurn
}

// Checking Winner
function checkWinner() {
	if(box1.textContent == box2.textContent && box1.textContent == box3.textContent && box1.textContent != "") {
		return true
	} else if (box4.textContent == box5.textContent && box4.textContent == box6.textContent && box6.textContent != "") {
		return true
	} else if (box7.textContent == box8.textContent && box7.textContent == box9.textContent && box9.textContent != "") {
		return true
	} else if (box1.textContent == box4.textContent && box1.textContent == box7.textContent && box7.textContent != "") {
		return true
	} else if (box2.textContent == box5.textContent && box2.textContent == box8.textContent && box8.textContent != "") {
		return true
	} else if (box3.textContent == box6.textContent && box3.textContent == box9.textContent && box9.textContent != "") {
		return true
	} else if (box1.textContent == box5.textContent && box1.textContent == box9.textContent && box9.textContent != "") {
		return true
	} else if (box3.textContent == box5.textContent && box3.textContent == box7.textContent && box7.textContent != "") {
		return true
	}
	return false
}

function checkTie() {
	if (counter == 9 && checkWinner() == false) {
		alert("tie")
		stopGame()
	}
}

function giveXO(trueFalse) {
	if (trueFalse) {
		return "X"
	} else {
		return "O"
	}
}

function reset() {
	setup()
	box1.innerHTML = ""
	box2.innerHTML = ""
	box3.innerHTML = ""
	box4.innerHTML = ""
	box5.innerHTML = ""
	box6.innerHTML = ""
	box7.innerHTML = ""
	box8.innerHTML = ""
	box9.innerHTML = ""
}

function stopGame() {
	box1.onclick = null
	box2.onclick = null
	box3.onclick = null
	box4.onclick = null
	box5.onclick = null
	box6.onclick = null
	box7.onclick = null
	box8.onclick = null
	box9.onclick = null
}

function onClickHandler(event) {
	insertCharacter(event.target, giveXO(isPlayerOneTurn))
	if(checkWinner() == true){
		alert("You win")
		stopGame()
	} else {
		checkTie()
	}
}