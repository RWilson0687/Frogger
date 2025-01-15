/*
This sets up the necessary elements and variables for a grid-based game like "Frogger". 
It captures references to DOM elements for interaction and manages game state through variables that track the player's position and the game's timer. 
This setup prepares the game for further functionality, such as moving the frog, managing obstacles, and determining game outcomes.
*/

const timeLeftDisplay = document.querySelector('#time-left')
const resultLeftDisplay = document.querySelector('#result')
const startPauseButton = document.querySelector('#start-pause-button')
const squares = document.querySelectorAll('.grid div')
const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')

/*
DOM Elements:
    timeLeftDisplay: This variable references the HTML element that will display the remaining time for the game.
    resultLeftDisplay: This element shows the result of the game, such as whether the player won or lost.
    startPauseButton: This button starts or pauses the game when clicked.
    squares: This collects all the div elements in the grid, representing the playable area.
    logsLeft, logsRight, carsLeft, carsRight: These variables collect the elements representing the moving obstacles in the game, specifically logs and cars that move in different directions.
*/

let currentIndex = 76
const width = 9
let timerId
let outcomeTimerId
let currentTime = 20

/*
Game Variables:
    currentIndex: This variable tracks the frog's current position in the grid. It's initialized to 76, indicating a specific square on the grid.
    width: This constant defines the width of the grid (9 squares), which helps in calculating the grid's layout and movements.
    timerId: This variable will hold the identifier for the interval timer that manages game actions over time.
    outcomeTimerId: Similar to timerId, this will track the timer for checking win/lose conditions.
    currentTime: This variable sets the countdown timer for the game, starting at 20 seconds.
*/

//Move Frog Function
function moveFrog(e) {
/*
Function Overview: 
The moveFrog function is designed to move the frog based on user keyboard input. 
It responds to arrow key presses to change the frog's position on the grid.
The moveFrog function enables the player to control the frog's movement using the arrow keys. 
It ensures that the frog remains within the boundaries of the grid while updating the visual representation on the screen. 
This function is critical for the game's interactivity, allowing players to navigate the grid effectively. 
*/
      squares[currentIndex].classList.remove('frog')
      //This line removes the frog class from the current square, effectively "erasing" the frog's visual representation before moving it to a new square.
      switch(e.key) {
      //Switch Statement for Key Input: The function uses a switch statement to determine which arrow key was pressed and update the frog's position accordingly.
      case 'ArrowLeft' :
            if (currentIndex % width !== 0) currentIndex -= 1
            break
            //Moves the frog left by decreasing currentIndex by 1, unless it is already in the leftmost column (checked by currentIndex % width).

      case 'ArrowRight' :
            if (currentIndex % width < width - 1) currentIndex += 1
            break
            //Moves the frog right by increasing currentIndex by 1, unless it's in the rightmost column.

      case 'ArrowUp' :
            if (currentIndex - width >=0) currentIndex -= width
            break
            //Moves the frog up by subtracting the width from currentIndex, provided it doesn’t go out of bounds.

      case 'ArrowDown' :
            if (currentIndex + width < width * width) currentIndex += width
            //Moves the frog down by adding the width to currentIndex, ensuring it doesn't exceed the grid boundaries.
            break
    }

    squares[currentIndex].classList.add('frog')
    //This line adds the frog class back to the new current square, visually representing the frog in its new position.
}

//Move Cars Function
function autoMoveElements () {
/*
The autoMoveElements function automates the movement of logs and cars in the game while simultaneously managing the countdown timer. 
It ensures that game elements are updated frequently, creating dynamic gameplay that challenges the player to navigate effectively while keeping an eye on the timer. 
This function is likely called at regular intervals (e.g., using setInterval) to create continuous movement in the game.
*/
      //The function iterates over each collection of logs and cars using the forEach method and calls the respective movement functions for each element
      logsLeft.forEach(logleft => moveLogLeft(logleft))
      logsRight.forEach(logRight => moveLogRight(logRight))
      //moveLogLeft(logleft) and moveLogRight(logRight): Move the logs in their respective directions
      carsLeft.forEach(carLeft => moveCarLeft(carLeft))
      carsRight.forEach(carRight => moveCarRight(carRight))
      //moveCarLeft(carLeft) and moveCarRight(carRight): Move the cars in their respective directions.
      currentTime--
      timeLeftDisplay.textContent = currentTime
      //This line decrements the currentTime variable, which represents the remaining time for the player to complete the game.
}

//checkOutComes function is to assess the game's current state and determine whether the player has won or lost. It does this by calling two other functions: win() and lose().
function checkOutComes (){
      win()
      lose()
}

//The moveLogLeft function is responsible for animating the logs that move left in the game.
function moveLogLeft (logleft) {
      switch(true) {
            case logleft.classList.contains('l1') :
                  logleft.classList.remove('l1')
                  logleft.classList.add('l2')
                  break
            case logleft.classList.contains('l2') :
                  logleft.classList.remove('l2')
                  logleft.classList.add('l3')
                  break
            case logleft.classList.contains('l3') :
                  logleft.classList.remove('l3')
                  logleft.classList.add('l4')
                  break
            case logleft.classList.contains('l4') :
                  logleft.classList.remove('l4')
                  logleft.classList.add('l5')
                  break
            case logleft.classList.contains('l5') :
                  logleft.classList.remove('l5')
                  logleft.classList.add('l1')
                  break
      }
}

/*
Function Overview
    Purpose: The function shifts the log's position to the left by changing its class, which represents its current position in the animation sequence.
Key Components
    Parameter:
        logleft: This represents a log element in the game that is being animated.
    Switch Statement:
        The function uses a switch statement that checks the current class of the log.
    Case Conditions:
        Each case checks if the logleft element has a specific class (l1, l2, l3, l4, or l5).
        If a match is found:
            It removes the current class (e.g., l1) and adds the next class in the sequence (e.g., l2).
            The last case wraps around, moving from l5 back to l1, creating a continuous loop.
Summary of Class Transitions
    Animation Flow:
        l1 → l2 → l3 → l4 → l5 → l1
      This sequence of class changes typically corresponds to different positions or images of the log, allowing it to appear as if it is moving left across the screen.
Overall Functionality
      The moveLogLeft function enables the animation of logs in a game, facilitating movement in a way that maintains the visual flow and continuity of the gameplay experience. 
      As the logs move left, their class is updated, which likely corresponds to changes in their appearance or position within the game grid.
*/

function moveLogRight (logRight) {
      switch(true) {
            case logRight.classList.contains('l1') :
                  logRight.classList.remove('l1')
                  logRight.classList.add('l5')
                  break
            case logRight.classList.contains('l2') :
                  logRight.classList.remove('l2')
                  logRight.classList.add('l1')
                  break
            case logRight.classList.contains('l3') :
                  logRight.classList.remove('l3')
                  logRight.classList.add('l2')
                  break
            case logRight.classList.contains('l4') :
                  logRight.classList.remove('l4')
                  logRight.classList.add('l3')
                  break
            case logRight.classList.contains('l5') :
                  logRight.classList.remove('l5')
                  logRight.classList.add('l4')
                  break
      }
}

/*
Function Overview
    Purpose: The function shifts the log's position to the right by changing its class, which represents its current position in the animation sequence.
Key Components
    Parameter:
        logRight: This represents a log element in the game that is being animated.
    Switch Statement:
        The function uses a switch statement that checks the current class of the log.
    Case Conditions:
        Each case checks if the logRight element has a specific class (l1, l2, l3, l4, or l5).
        If a match is found:
            It removes the current class (e.g., l1) and adds the next class in the sequence (e.g., l5).
            The last case wraps around, moving from l5 back to l4, creating a continuous loop.
Summary of Class Transitions
    Animation Flow:
        l5 → l1 → l2 → l3 → l4 → l5
      This sequence of class changes typically corresponds to different positions or images of the log, allowing it to appear as if it is moving right across the screen.
Overall Functionality
      The moveLogRight function enables the animation of logs in a game, facilitating movement in a way that maintains the visual flow and continuity of the gameplay experience. 
      As the logs move right, their class is updated, which likely corresponds to changes in their appearance or position within the game grid.
*/

function moveCarLeft (carLeft) {
      switch(true) {
            case carLeft.classList.contains('c1') :
                  carLeft.classList.remove('c1')
                  carLeft.classList.add('c2')
                  break
            case carLeft.classList.contains('c2') :
                  carLeft.classList.remove('c2')
                  carLeft.classList.add('c3')
                  break
            case carLeft.classList.contains('c3') :
                  carLeft.classList.remove('c3')
                  carLeft.classList.add('c1')
                  break
      }
}

/*
Function Overview
    Purpose: The function shifts the car's position to the left by changing its class, which represents its current position in the animation sequence.
Key Components
    Parameter:
        carLeft: This represents a car element in the game that is being animated.
    Switch Statement:
        The function uses a switch statement that checks the current class of the car.
    Case Conditions:
        Each case checks if the carLeft element has a specific class (c1, c2, c3, c4, or c5).
        If a match is found:
            It removes the current class (e.g., c1) and adds the next class in the sequence (e.g., c2).
            The last case wraps around, moving from c5 back to c1, creating a continuous loop.
Summary of Class Transitions
    Animation Flow:
        c1 → c2 → c3 → c4 → c5 → c1
      This sequence of class changes typically corresponds to different positions or images of the car, allowing it to appear as if it is moving left across the screen.
Overall Functionality
      The moveCarLeft function enables the animation of cars in a game, facilitating movement in a way that maintains the visual flow and continuity of the gameplay experience. 
      As the cars move left, their class is updated, which likely corresponds to changes in their appearance or position within the game grid.
*/

function moveCarRight (carRight) {
      switch(true) {
            case carRight.classList.contains('c1') :
                  carRight.classList.remove('c1')
                  carRight.classList.add('c3')
                  break
            case carRight.classList.contains('c2') :
                  carRight.classList.remove('c2')
                  carRight.classList.add('c1')
                  break
            case carRight.classList.contains('c3') :
                  carRight.classList.remove('c3')
                  carRight.classList.add('c2')
                  break
      }
}

/*
Function Overview
    Purpose: The function shifts the car's position to the right by changing its class, which represents its current position in the animation sequence.
Key Components
    Parameter:
        carRight: This represents a car element in the game that is being animated.
    Switch Statement:
        The function uses a switch statement that checks the current class of the car.
    Case Conditions:
        Each case checks if the carRight element has a specific class (c1, c2, c3, c4, or c5).
        If a match is found:
            It removes the current class (e.g., c1) and adds the next class in the sequence (e.g., c5).
            The last case wraps around, moving from c5 back to c4, creating a continuous loop.
Summary of Class Transitions
    Animation Flow:
        c5 → c1 → c2 → c3 → c4 → c5
      This sequence of class changes typically corresponds to different positions or images of the car, allowing it to appear as if it is moving right across the screen.
Overall Functionality
      The moveCarRight function enables the animation of cars in a game, facilitating movement in a way that maintains the visual flow and continuity of the gameplay experience. 
      As the cars move right, their class is updated, which likely corresponds to changes in their appearance or position within the game grid.
*/

//The lose function is designed to determine if the player has lost the game.
function lose () {
      if (
            squares[currentIndex].classList.contains('c1') ||
            squares[currentIndex].classList.contains('l4') ||       
            squares[currentIndex].classList.contains('l5') ||
            currentTime <= 0
       ) {
            resultLeftDisplay.textContent = 'You Lose'
            clearInterval(timerId)
            clearInterval(outcomeTimerId)
            squares[currentIndex].classList.remove('frog')
            document.removeEventListener('keyup', moveFrog)
      }
}

/*
Function Overview
    Purpose: To check conditions that lead to a loss and to handle the game state when the player loses.
Key Components
    Condition Check:
        The function checks multiple conditions using an if statement:
            If the square at the current index (currentIndex) contains the class c1, which likely represents a car or an obstacle.
            If the square contains the class l4 or l5, which may represent specific logs that are dangerous.
            If currentTime is less than or equal to 0, indicating that the player has run out of time.
    Actions on Losing:
        If any of the conditions are met:
            The message "You Lose" is displayed in the resultLeftDisplay.
            The timers (timerId and outcomeTimerId) are cleared using clearInterval, stopping any ongoing animations or updates.
            The class frog is removed from the square at currentIndex, likely to visually indicate that the player’s frog has been eliminated or is no longer active.
            The keyup event listener for moving the frog is removed, preventing further input from the player.
Summary of Functionality
      The lose function effectively checks if the player has hit an obstacle or run out of time and then triggers the game over sequence. 
      By updating the display and stopping the game mechanics, it provides clear feedback to the player about their loss and prevents any further actions.
*/

//The win function is responsible for determining if the player has won the game.
function win () {
      if (squares[currentIndex].classList.contains('ending-block')) {
            resultLeftDisplay.textContent = 'You Win!'
            clearInterval(timerId)
            clearInterval(outcomeTimerId)
            document.removeEventListener('keyup', moveFrog)
      }
}

/*
Function Overview
    Purpose: To check if the player has reached the winning condition and to handle the game state when the player wins.
Key Components
      Winning Condition Check:
            The function checks if the square at the current index (currentIndex) contains the class ending-block. 
            This class likely indicates the goal or finish line that the player needs to reach to win the game.
      Actions on Winning:
            If the winning condition is met:
                  The message "You Win!" is displayed in the resultLeftDisplay, providing feedback to the player.
                  The timers (timerId and outcomeTimerId) are cleared using clearInterval, stopping any ongoing animations or updates.
                  The keyup event listener for moving the frog is removed, preventing further input from the player.
Summary of Functionality
      The win function checks if the player has reached the designated winning square. 
      If so, it signals victory by updating the display, stopping the game mechanics, and preventing any further player actions. 
      This provides clear feedback about the successful completion of the game.
*/

//This adds an event listener to the startPauseButton to handle starting and pausing the game.
startPauseButton.addEventListener('click', () => {
      if (timerId) {
            clearInterval(timerId)
            clearInterval(outcomeTimerId)
            outcomeTimerId = null
            timerId = null
            document.removeEventListener('keyup', moveFrog)
      } else {
            timerId = setInterval(autoMoveElements, 1000)
            outcomeTimerId = setInterval (checkOutComes, 50)
            document.addEventListener('keyup', moveFrog)
      }
})

/*
Key Components
      Event Listener:
        An event listener is added to startPauseButton, which listens for click events.
      Check Timer State:
            The function checks if timerId is truthy (indicating the game is currently running):
                  If running:
                        It clears both timerId and outcomeTimerId, stopping the game mechanics.
                        Sets both timers to null, indicating they are not active.
                        Removes the keyup event listener for moveFrog, preventing further movement input.
                  If not running:
                        Starts the game by setting timerId to a new interval that calls autoMoveElements every 1000 milliseconds (1 second).
                        Sets outcomeTimerId to another interval that calls checkOutComes every 50 milliseconds.
                        Adds a keyup event listener for moveFrog, allowing the player to control the frog again.
Summary of Functionality
      This code manages the game's start and pause functionality. When the button is clicked:
            If the game is currently active, it pauses the game and disables player input.
            If the game is paused, it restarts the game, enabling player input and setting up the necessary intervals for game mechanics.
      This toggle functionality allows for a seamless user experience where players can easily start and stop their gameplay.
*/

//Function to refresh the page
function refreshPage() {
      location.reload(); // Reloads the page
  }