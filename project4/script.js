// Generate a random number between 1 and 100
const randomNumber = Math.floor(Math.random() * 100) + 1;

// Get references to the HTML elements we need to interact with
const guessInput = document.getElementById("guess-input");
const submitButton = document.getElementById("submit-button");
const resultParagraph = document.getElementById("result");

// Add an event listener to the submit button that checks the user's guess
submitButton.addEventListener("click", function() {
  // Get the user's guess from the input field
  const userGuess = parseInt(guessInput.value);

  // Check if the user's guess is correct
  if (userGuess === randomNumber) {
    resultParagraph.textContent = "Congratulations! You guessed correctly!";
    resultParagraph.style.color = "green";
  } else if (userGuess > randomNumber) {
    resultParagraph.textContent = "Your guess is too high. Try again.";
    resultParagraph.style.color = "red";
  } else {
    resultParagraph.textContent = "Your guess is too low. Try again.";
    resultParagraph.style.color = "red";
  }
});