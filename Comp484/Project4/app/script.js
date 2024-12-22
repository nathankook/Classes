let map;
let currentIndex = 0; // current index of locations 
let count = 0; // count of how many correct
let timer;
let timeElapsed = 0;
let highScore = localStorage.getItem("high-score") || 0;

let markers = [];

const locations = [
  { name: "C.R. Johnson Auditorium", lat: 34.24149102894712, lng: -118.52894076879704 },
  { name: "Library", lat: 34.24004199484658, lng: -118.52932898700232 },
  { name: "Eucalyptus Hall", lat: 34.238677744002494, lng: -118.52823593467485 },
  { name: "Campus Store", lat: 34.237379311635785, lng: -118.52815944933805 },
  { name: "University Hall", lat: 34.23980071725483, lng: -118.53212964077109 }
]

function initMap() {
  // custom map style to get rid of all labels and names
  const customMapStyle = [
    {
      featureType: "all",
      elementType: "labels",
      stylers: [
        {
          visibility: "off", 
        },
      ],
    },
  ];
  
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 34.239, lng: -118.52941},
    zoom: 17,
    styles: customMapStyle,
    disableDefaultUI: true,
    draggable: false
  });
  
  updateLocationPrompt();
  startTimer();
  
  map.addListener("dblclick", handleMapClick);
  document.getElementById("high-score").textContent = `High Score: ${highScore}`;
  document.getElementById("reset-button").addEventListener("click", resetGame);
}

function handleMapClick(event) {
  const userLat = event.latLng.lat();
  const userLng = event.latLng.lng();
  
  const target = locations[currentIndex];
  const distance = calculateDistance(userLat, userLng, target.lat, target.lng);
  
  const feedback = document.getElementById("feedback");
  const correct = distance <= 50;
  if (correct) {
    document.getElementById("feedback").style.color = 'green';
    feedback.textContent = `Correct! That's ${target.name}.`;
    count++;
    addMarker(target.lat, target.lng, "green");
  } else {
    document.getElementById("feedback").style.color = 'red';
    feedback.textContent = `Incorrect! That's not ${target.name}.`;
    addMarker(target.lat, target.lng, "red");
  }
  
  currentIndex++;
  
  if (currentIndex < locations.length) {
    updateLocationPrompt();
  } else {
    gameOver();
  }
}

// updates the location prompt
function updateLocationPrompt() {
  const locationName = locations[currentIndex].name;
  const locationElement = document.getElementById("location-name");
  if (locationElement) {
    locationElement.textContent = `Where do you think ${locationName} is?`;
  } else {
    console.error("Element with id 'location-name' not found.");
  }
}

// adds a marker to map at location
function addMarker(lat, lng, color) {
  const squareSize = 0.0003;
  const bounds = {
    north: lat + squareSize,
    south: lat - squareSize,
    east: lng + squareSize, 
    west: lng - squareSize
  }
  
  const marker = new google.maps.Rectangle({
    bounds: bounds,
    map: map,
    fillColor: color,
    fillOpacity: 0.6,
    strokeColor: "white",
    strokeWeight: 2
  });
  
  markers.push(marker);
}

// calculates the distance between two lat/long points in meters
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371e3;
  const rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad;
  const dLng = (lng2 - lng1) * rad;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function startTimer() {
  timeElapsed = 0;
  timer = setInterval(() => {
    timeElapsed++;
    document.getElementById("timer").textContent = `Time: ${timeElapsed} seconds`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  document.getElementById("timer").textContent = `Game Over! You finished in ${timeElapsed} seconds`;
}

document.getElementById("high-score").textContent = `High Score: ${highScore}`;
function updateHighScore() {
  if (count > highScore) {
    highScore = count;
    localStorage.setItem("high-score", highScore);
  }
  document.getElementById("high-score").textContent = `High Score: ${highScore}`;
}

function gameOver() {
  stopTimer();
  updateHighScore();
  document.getElementById("instructions").textContent = ``;
  document.getElementById("location-name").textContent = ``;
  document.getElementById("feedback").textContent = ``;
  document.getElementById("score").textContent = `Game Over! You have scored ${count} correct out of ${locations.length}.`;
}

function resetGame() {
  clearInterval(timer);
  currentIndex = 0;
  count = 0;
  timeElapsed = 0;
  
  document.getElementById("instructions").textContent = "Double click where you think the location is!";
  document.getElementById("feedback").textContent = "";
  document.getElementById("score").textContent = "";
  document.getElementById("location-name").textContent = "";
  
  markers.forEach(marker => marker.setMap(null));
  markers = [];
  
  updateLocationPrompt();
  startTimer();
  document.getElementById("timer").textContent = `Time: 0 seconds`;
}
