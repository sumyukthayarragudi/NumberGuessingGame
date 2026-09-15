let secretNumber;
let attempts = 0;
const maxAttempts = 10;
let guesses = [];

const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const newGameButton = document.getElementById("newGameButton");

const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const remainingDisplay = document.getElementById("remaining");
const previousGuesses = document.getElementById("previousGuesses");


// Start a new game
function startNewGame() {

    secretNumber = Math.floor(Math.random() * 100) + 1;

    attempts = 0;
    guesses = [];

    guessInput.value = "";

    guessInput.disabled = false;
    guessButton.disabled = false;

    message.textContent = "Make your first guess!";
    message.style.color = "#555";

    attemptsDisplay.textContent = "0";
    remainingDisplay.textContent = maxAttempts;

    previousGuesses.innerHTML =
        '<span class="empty">None yet</span>';

    guessInput.focus();
}


// Check the user's guess
function checkGuess() {

    const input = guessInput.value.trim();

    // Empty input
    if (input === "") {

        message.textContent =
            "⚠️ Please enter a number.";

        message.style.color = "#e67e22";

        return;
    }


    const guess = Number(input);


    // Check if it is a valid number
    if (!Number.isInteger(guess)) {

        message.textContent =
            "⚠️ Please enter a valid whole number.";

        message.style.color = "#e67e22";

        return;
    }


    // Check range
    if (guess < 1 || guess > 100) {

        message.textContent =
            "⚠️ Enter a number between 1 and 100.";

        message.style.color = "#e67e22";

        return;
    }


    // Check duplicate guess
    if (guesses.includes(guess)) {

        message.textContent =
            "⚠️ You already guessed that number!";

        message.style.color = "#e67e22";

        return;
    }


    // Add guess
    guesses.push(guess);

    attempts++;


    // Update statistics
    attemptsDisplay.textContent = attempts;

    remainingDisplay.textContent =
        maxAttempts - attempts;


    // Display previous guesses
    previousGuesses.innerHTML = "";

    guesses.forEach(function(number) {

        const guessElement = document.createElement("span");

        guessElement.textContent = number;

        previousGuesses.appendChild(guessElement);
    });


    // Correct answer
    if (guess === secretNumber) {

        message.textContent =
            `🎉 Correct! You guessed it in ${attempts} attempt${attempts === 1 ? "" : "s"}!`;

        message.style.color = "#27ae60";

        guessInput.disabled = true;
        guessButton.disabled = true;

        return;
    }


    // Too low
    if (guess < secretNumber) {

        message.textContent =
            "📉 Too low! Try a higher number.";

        message.style.color = "#e67e22";
    }


    // Too high
    else {

        message.textContent =
            "📈 Too high! Try a lower number.";

        message.style.color = "#e67e22";
    }


    // Game over
    if (attempts >= maxAttempts) {

        message.textContent =
            `😢 Game over! The number was ${secretNumber}.`;

        message.style.color = "#e74c3c";

        guessInput.disabled = true;
        guessButton.disabled = true;

        return;
    }


    // Clear input for next guess
    guessInput.value = "";

    guessInput.focus();
}


// Guess button
guessButton.addEventListener("click", checkGuess);


// Enter key
guessInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        checkGuess();
    }

});


// New Game button
newGameButton.addEventListener("click", startNewGame);


// Start the first game
startNewGame();
