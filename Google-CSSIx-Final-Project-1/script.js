/*
Names: Giovanni Rivera, Cesar Rugama, Abdiel Quero 
Project: Escape Room
Team: #11
CSUDH | El Camino 
CSSI Online 2020



Contributions:
Song is from Minecraft OST by Mojang ("Subwoofer Lullaby")



*/

//Global Variables

let greenRectangle

let timeFps, timeInSeconds, timeDisplay 
let boxesLeft
let allBoxesCollected, noBoxes

let userAnswer

let gameIsOver, win, onStartScreen

let enterIsPressed

let gameIsPaused

let enteredWords

let onMainScreen = false

//var song 

let songPlaying = false


let slider 

let incorrectGuess

//change this variable to change both times in setup and restart:
let SETTING_TIME = 7500

// let userAnswer

//Pre-Load Function 
function preload() {

  //song is not working at the moment
  //song = loadSound("Volume Alpha - 03 - Subwoofer Lullaby.mp3");
  
}




//SetUp Function 
function setup() {
  
  // song.play()

  slider = createSlider(0,1,.5,0.1)

  //canvas setup 
  createCanvas(windowWidth - 20, windowHeight - 20)
  background(0, 0, 0)
  colorMode(RGB)
  noStroke()

  //setting variable value
  timeFps = SETTING_TIME
  boxesLeft = 30
  allBoxesCollected = false
  gameIsOver = false
  noBoxes = true
  win = false
  onStartScreen = true
  enterIsPressed = false
  gameIsPaused = false

  
  //calling classes 
  greenRectangle = new ClickRects()

  //writes box
  userAnswer = createInput('')

  //PLEASE DON'T
  //song.play()
  
}

//Loop Function 
function draw() {
  background(0, 0, 0)
  if (onStartScreen && !gameIsOver) {
    startScreen()
  } else if (!gameIsOver) {
    if (!allBoxesCollected) {
      //rect-related mechanics
      greenRectangle.update()
      if (!gameIsPaused) {
        updateTime()
      }

      //rect-related drawing
      onMainScreen = true 
      greenRectangle.draw()
    } else if (noBoxes) {
      //userAnswer = createInput('')
      triviaTextMessage()
      userAnswer.input(checkInput)
      noBoxes = false
    }

    drawTime()
    drawBoxesLeft()
    if (boxesLeft <= 0) {
      allBoxesCollected = true
      triviaTextMessage()
      if (incorrectGuess) {
        tryAgain()
      }
    }
  } else if (gameIsOver && !win) {
    gameOverScreen()
  }

  if (win) {
    winScreen()
  }
//   if (!songPlaying) {
//     song.play()
//     songPlaying = true
//   }

}



//Green Rectangle Class 
class ClickRects {
  constructor() {
    this.reset()
  
  }
  
  //Drawing the green rectangle 
  draw() {
    //coloring the rect as green (In RGB)
    fill(0, this.colorGreen, 0)
    rect(this.x, this.y, 50, 50)
    //reset the rect once the rectangle's RGB green value
    //is 0
    if (this.colorGreen <= 0) {
      this.reset()
    }
    
  }

  //making the rectangle change location randomly
  reset() {
    this.x = random(width - 50)
    this.y = random(height - 50)
    this.colorGreen = 255

    if (boxesLeft <= 0) {
      this.x = 20000
      this.y = 20000
    }
  
  }
  
  //RGB value of green decreases by 1 and draws the rectangle 
  update() {
    this.colorGreen -= 6
    this.draw()
  }
  
  
}

function mouseClicked() {
  
  //when you click the box itll disappear
  hit = collideRectRect(greenRectangle.x, greenRectangle.y, 50, 50, mouseX, mouseY, 20, 20)
  if (hit) {
    if (boxesLeft > 0) {
      greenRectangle.reset()
      updateBoxesLeft()
    }
    
  }
}


//changes the amount of time left by 1 frame (1/60 seconds)
function updateTime() {
 
  timeFps--
  timeInSeconds = timeFps/60
  timeDisplay = roundTime(timeInSeconds)
  if (timeInSeconds <= 0) {
    gameIsOver = true
  }
  
}

//shows the timer
function drawTime() {
  
  textSize(20)
  textFont('Georgia')
  fill(255)
  stroke(255)
  text(`Time: ${timeDisplay}`, 10, 20)
  noStroke()
  
}

//keeps the time in whole numbers by flooring
function roundTime(time) {
  return floor(time)
}



//decrease boxes left counter by 1
function updateBoxesLeft() {

  if (boxesLeft > 0) { 
    boxesLeft--
  }

  if (boxesLeft == 0) {
    console.log("Stop clicking on the boxes sir/ma'am")
  }

}

//show the numer of boxes left to be clicked
function drawBoxesLeft() {
 
  textSize(20)
  textFont('Georgia')
  fill(255)
  stroke(255)
  text(`Boxes Remaining: ${boxesLeft}`, 10, 40) 
  noStroke()
}

//checking the user input inside the text box
function checkInput() {

  //is the answer typed exactly? (Case sensitive)
  // prior boolean: && (this.value().length == 2)

  enteredWords = userAnswer.value()

  if (userAnswer.value() > 0) {
    gameIsPaused = false
  }
 
  //THIS WAS NOT WORKING SO I COMMENTED IT OUT; RIP CODE
  // if (userAnswer.value() == "hi") {
  //   if (enterIsPressed) {
  //     console.log("You escaped")
  //     winScreen()
  //   }
  // } else {
  //   if (enterIsPressed) {
  //     console.log("You are still trapped")
  //     textSize(30)
  //     fill(255)
  //     stroke(255)
  //     text("You are stuck!", 250, 245)
  //     text("Keep Trying", 250, 265)
  //   }
  // }


  if ((enteredWords == "Echo" || enteredWords == "echo") && enterIsPressed && !onStartScreen && !onMainScreen && !gameIsOver) {
    console.log("You escaped")
    winScreen()
  } else if (enterIsPressed && !onStartScreen && !onMainScreen && !gameIsOver) {
    console.log("Keep trying")
    tryAgain()
    // textSize(30)
    // textFont('Georgia')
    // fill(255)
    // stroke(255)
    // text("You are stuck!", windowWidth/2, windowHeight/2 + 100)
    // text("Keep Trying", windowWidth/2, windowHeight/2 + 150)
    // enterIsPressed = false
  }
}


//this function doesn't work at the moment
//I wonder why...

function keyPressed() {
  if (keyCode === ENTER) {
    console.log("Enter has been pushed")
    enterIsPressed = true
    checkInput()
    console.log("checked input")
  }
}


function keyTyped() {
  
  if (key === 's') {
    onStartScreen = false
  }

  if (key === 'r') {
    reset()
  }

  if (key === 'l') {
    gameIsOver = true
  }

  if (key === 'p') {
    if (!gameIsPaused) {
      gameIsPaused = true
      checkInput()
      console.log("paused game")
    } else {
      gameIsPaused = false
    }
  }

  if (key === 'y') {
    boxesLeft = 0
  }

}

function startScreen() {
  background(90)
  textSize(30)
  textFont('Georgia')
  fill(255)
  stroke(255)
  text("Press 'S' to start, and play this game!", 150, windowHeight/2 + 25)

  text("Your goal is to click all the boxes", 150, windowHeight/2 - 120)
  text("as fast a possible!", 150, windowHeight/2 - 70)
  text("After completing that task, you will need to answer a trivia question!", 150, windowHeight/2 - 20)
}

//show the trivia question while still updating the time
function triviaTextMessage() {

  onMainScreen = false
  textSize(30)
  textFont('Georgia')
  fill(255)
  stroke(255)
  text("Now answer this Trivia question!", windowWidth/2 - 250, windowHeight/2 - 200)
  text("(Scroll down to answer)", windowWidth/2 - 200, windowHeight/2 - 150)

  text("I speak without a mouth and hear without ears.", windowWidth/2 - 200, windowHeight/2 - 100)
  text("I have no body, but I come alive with wind.", windowWidth/2 - 200, windowHeight/2 - 50)
  text("What am I?", windowWidth/2 - 200, windowHeight/2)

  if (!gameIsPaused) {
    updateTime()
  }
  drawTime()
    

}


//show the win screen and change the boolean
//to not refresh the background
function winScreen() {
  background(0, 0, 0)
  textSize(30)
  textFont('Georgia')
  fill(255)
  stroke(255)
  text("You ESCAPED", windowWidth/2 - 110, windowHeight/2 - 40)
  text("(Press 'R' to play again)", windowWidth/2 - 110, windowHeight/2 + 10)
  win = true
}

//simply the gameOver screen
function gameOverScreen () {
  textSize(30)
  textFont('Georgia')
  fill(255)
  stroke(255)
  text("Game Over!", windowWidth/2 - 100, windowHeight/2 - 280)
  text("(You did not escape on time!)", windowWidth/2 - 210, windowHeight/2 - 200)
  text("Press 'R' to try again", windowWidth/2 - 150, windowHeight/2 - 120)

}

function reset() {
  //canvas setup 
  background(0, 0, 0)
  colorMode(RGB)
  noStroke()

  //setting variable value
  timeFps = SETTING_TIME
  boxesLeft = 30
  allBoxesCollected = false
  gameIsOver = false
  noBoxes = true
  win = false
  onStartScreen = true
  enterIsPressed = false
  incorrectGuess = false
  gameIsPaused = false

  //reset existing object so there is no need for arrays
  greenRectangle.reset()
}

function tryAgain() {
  textSize(30)
  textFont('Georgia')
  fill(255)
  stroke(255)
  text("You are stuck!", windowWidth/2, windowHeight/2 + 100)
  text("Keep Trying", windowWidth/2, windowHeight/2 + 150)
  enterIsPressed = false
  incorrectGuess = true
}
