const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const newTestButton = document.querySelector("#new-test");
const wpmDisplay = document.querySelector("#wpm");
const mistakesDisplay = document.querySelector("#mistakes");

// array of test texts
const testTexts = [
  "The sun rose slowly over the horizon, casting a golden glow on the world below. Birds chirped in the trees, signaling the start of a new day. The air was crisp, filled with the promise of possibility. People began to stir from their homes, heading out to meet the day with energy and purpose. The world, bathed in early morning light, felt fresh and full of opportunity, as though anything could happen.",
  
  "The city buzzed with life, the streets crowded with people hurrying to their destinations. Cars honked as they made their way through the busy intersections, while pedestrians rushed along the sidewalks, their footsteps echoing on the pavement. Despite the frantic pace of the world around them, some people paused to enjoy a moment of calm, taking in the sights and sounds of the city, appreciating the little things amidst the chaos.",
  
  "In a quiet corner of the forest, the trees stood tall, their branches reaching up towards the sky. Birds flitted between the leaves, while squirrels darted about, collecting food for the coming winter. The air was cool and refreshing, filled with the earthy scent of pine and fresh moss. It was a place of peace, where time seemed to slow down, and the world felt far away.",
  
  "The ocean stretched out as far as the eye could see, its waves gently rolling towards the shore. Seagulls cried overhead, swooping down to catch fish from the water. The sound of the waves crashing against the rocks was calming, a rhythmic lullaby that echoed across the beach. As the sun dipped lower in the sky, the colors of the sunset reflected off the water, creating a breathtaking display of orange and pink hues.",
  
  "At the top of the mountain, the view was nothing short of spectacular. The valleys below were blanketed in a sea of green, while the peaks of distant mountains stood tall, shrouded in mist. The air was thin, but invigorating, as if each breath brought a sense of accomplishment. There was a sense of serenity here, high above the world, where only the sounds of the wind and the distant birds could be heard."
]

let timer = [0, 0, 0, 0]; // [minutes, seconds, hundredths, interval]
let timerRunning = false;

let bestScores = []; // array to store best times
let wordsTyped = 0; // keeps track of number of words typed
let mistakes = 0; // keeps track of mistakes made

// Add leading zero to numbers 9 or below (purely for aesthetics):
function addLeadingZero(number) {
  return number < 10 ? `0${number}` : number;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
  const currentTime = `${addLeadingZero(timer[0])}:${addLeadingZero(timer[1])}:${addLeadingZero(timer[2])}`;
  theTimer.textContent = currentTime;
  timer[3]++;
  timer[0] = Math.floor(timer[3] / 6000); // minutes
  timer[1] = Math.floor((timer[3] % 6000) / 100); // seconds
  timer[2] = timer[3] % 100; // hundredths
  
  updateWPM();
}

// Match the text entered with the provided text on the page:
function checkInput () {
  const userInput = testArea.value;
  const originTextElement = document.querySelector("#origin-text p");
  const currentOriginText = originTextElement.innerHTML;
  
  let currentMistakes = 0;
  for (let i =0; i < userInput.length; i++) {
    if (userInput[i] !== currentOriginText[i]) {
      currentMistakes++;
    }
  }
  
  mistakes = currentMistakes;
  
  if (userInput.length >= currentOriginText.length) {
    testWrapper.style.borderColor = userInput === currentOriginText ? "green" : "red";
    clearInterval(timer[4]);
    testArea.disabled = true;
    saveTime();
    updateBestScores();
  } else if (currentOriginText.startsWith(userInput)) {
    testWrapper.style.borderColor = "blue";
  } else {
    testWrapper.style.borderColor = "red";
  }
  
  wordsTyped = userInput.trim().split(/\s+/).length;
  displayMistakes();
}

// Start the timer:
function startTimer() {
  const inputLength  = testArea.value.length;
  if (inputLength == 0 && !timerRunning) {
    timerRunning = true;
    timer[4] = setInterval(runTimer, 10); // updates every 10ms
  }
}

// saves the time
function saveTime() {
  const totalTime = timer[0] * 6000 + timer[1] * 100 + timer[2]; // turn the minutes into hundredths, seconds into hundredths, and add them to the hundredths
  const wpm = Math.floor(wordsTyped / (timer[3] / 6000));
  bestScores.push({time: totalTime, wpm: wpm, mistakes: mistakes});
  // sort times in ascending order
  bestScores.sort((a, b) => a.time - b.time || b.wpm - a.wpm);
  // keep only the top 3 times
  if (bestScores.length > 3) {
    bestScores.pop();
  }
}

// format the time
function formatTime(time) {
  const minutes = Math.floor(time / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const hundredths = time % 100;
  return `${addLeadingZero(minutes)}:${addLeadingZero(seconds)}:${addLeadingZero(hundredths)}`;
}

// update best times and wpm
function updateBestScores() {
  const highScoresList = document.querySelector("#high-scores-list");
  highScoresList.innerHTML = "";
  bestScores.forEach((entry, index) => {
    const scoreItem = document.createElement("li");
    scoreItem.textContent = `${index + 1}. ${formatTime(entry.time)} - WPM: ${entry.wpm} - Mistakes: ${entry.mistakes}`;
    highScoresList.appendChild(scoreItem);
  });
}


// updates the WPM
function updateWPM() {
  if (timer[3] > 0) {
    const timeInMinutes = timer[3] / 6000;
    const wpm = Math.floor((wordsTyped / timeInMinutes));
    wpmDisplay.textContent = `WPM: ${wpm}`;
  }
}

function displayMistakes() {
  mistakesDisplay.textContent = `Mistakes: ${mistakes}`;
}

// Reset everything:
function reset() {
  clearInterval(timer[4]);
  timer = [0, 0, 0, 0];
  timerRunning = false;
  testArea.value = "";
  theTimer.textContent = "00:00:00";
  testWrapper.style.borderColor = "grey";  
  testArea.disabled = false;
}

// randomly generate a number and use that as the index for the test text
function getRandomText() {
  const randomIndex = Math.floor(Math.random() * testTexts.length);
  return testTexts[randomIndex];
}

// update the test text in the test area
function updateTestText() {
  const randomText = getRandomText();
  const originTextElement = document.querySelector("#origin-text p");
  originTextElement.innerHTML = randomText;
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", startTimer);
testArea.addEventListener("keyup", checkInput);
resetButton.addEventListener("click", reset);
newTestButton.addEventListener("click", () => {
  reset();
  updateTestText();
});
