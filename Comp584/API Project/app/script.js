// Initialize variables and DOM elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');
const weatherIcon = document.getElementById('weather-icon');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const pressure = document.getElementById('pressure');
const errorMessage = document.getElementById('error-message');
const animationContainer = document.getElementById('animation-container');

// WeatherBit API configuration
const API_KEY = 'cbd61477f9b94800a4fa1b923496a837';
const API_URL = 'https://api.weatherbit.io/v2.0/current';

// Weather icon mapping
const weatherIcons = {
    '200': '⛈️', // Thunderstorm with light rain
    '201': '⛈️', // Thunderstorm with rain
    '202': '⛈️', // Thunderstorm with heavy rain
    '230': '⛈️', // Thunderstorm with light drizzle
    '231': '⛈️', // Thunderstorm with drizzle
    '232': '⛈️', // Thunderstorm with heavy drizzle
    '233': '⛈️', // Thunderstorm with Hail
    '300': '🌧️', // Light Drizzle
    '301': '🌧️', // Drizzle
    '302': '🌧️', // Heavy Drizzle
    '500': '🌧️', // Light Rain
    '501': '🌧️', // Moderate Rain
    '502': '🌧️', // Heavy Rain
    '511': '🌧️', // Freezing rain
    '520': '🌧️', // Light shower rain
    '521': '🌧️', // Shower rain
    '522': '🌧️', // Heavy shower rain
    '600': '❄️', // Light snow
    '601': '❄️', // Snow
    '602': '❄️', // Heavy Snow
    '610': '❄️', // Mix snow/rain
    '611': '❄️', // Sleet
    '612': '❄️', // Heavy sleet
    '621': '❄️', // Snow shower
    '622': '❄️', // Heavy snow shower
    '623': '❄️', // Flurries
    '700': '🌫️', // Mist
    '711': '🌫️', // Smoke
    '721': '🌫️', // Haze
    '731': '🌫️', // Sand/dust
    '741': '🌫️', // Fog
    '751': '🌫️', // Freezing Fog
    '800': '☀️', // Clear sky
    '801': '🌤️', // Few clouds
    '802': '⛅', // Scattered clouds
    '803': '🌥️', // Broken clouds
    '804': '☁️', // Overcast clouds
    '900': '🌧️'  // Unknown Precipitation
};

// Weather conditions mapping for animation styles
const weatherConditions = {
    '200': 'storm',
    '201': 'storm',
    '202': 'storm',
    '230': 'storm',
    '231': 'storm',
    '232': 'storm',
    '233': 'storm',
    '300': 'rainy',
    '301': 'rainy',
    '302': 'rainy',
    '500': 'rainy',
    '501': 'rainy',
    '502': 'rainy',
    '511': 'rainy',
    '520': 'rainy',
    '521': 'rainy',
    '522': 'rainy',
    '600': 'snowy',
    '601': 'snowy',
    '602': 'snowy',
    '610': 'snowy',
    '611': 'snowy',
    '612': 'snowy',
    '621': 'snowy',
    '622': 'snowy',
    '623': 'snowy',
    '700': 'cloudy',
    '711': 'cloudy',
    '721': 'cloudy',
    '731': 'cloudy',
    '741': 'cloudy',
    '751': 'cloudy',
    '800': 'sunny',
    '801': 'sunny',
    '802': 'cloudy',
    '803': 'cloudy',
    '804': 'cloudy',
    '900': 'rainy'
};

// Popmotion animation variables
let animationFrames = [];
let weatherAnimationActive = false;

// Event listeners
searchBtn.addEventListener('click', getWeatherData);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeatherData();
    }
});

// Fetch weather data from WeatherBit API
async function getWeatherData() {
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    try {
        clearError();
        const response = await fetch(`${API_URL}?city=${city}&key=${API_KEY}&units=M`);
        
        if (!response.ok) {
            if (response.status === 401) {
                showError('Invalid API key. Please check your API key.');
            } else if (response.status === 404) {
                showError('City not found. Please try another city.');
            } else {
                showError('Failed to fetch weather data. Please try again later.');
            }
            return;
        }
        
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
            displayWeatherData(data.data[0]);
        } else {
            showError('No weather data available for this city');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError('Failed to fetch weather data. Please check your connection.');
    }
}

// Display weather data on the UI
function displayWeatherData(weatherData) {
    cityName.textContent = `${weatherData.city_name}, ${weatherData.country_code}`;
    temperature.textContent = Math.round(weatherData.temp);
    weatherDescription.textContent = weatherData.weather.description;
    
    const weatherCode = weatherData.weather.code.toString();
    weatherIcon.textContent = weatherIcons[weatherCode] || '🌡️';
    
    humidity.textContent = `${weatherData.rh}%`;
    windSpeed.textContent = `${weatherData.wind_spd.toFixed(1)} m/s`;
    pressure.textContent = `${weatherData.pres.toFixed(0)} mb`;
    
    // Start weather animations
    startWeatherAnimation(weatherCode);
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
}

// Clear error message
function clearError() {
    errorMessage.textContent = '';
}

// Start weather animation based on weather code
function startWeatherAnimation(weatherCode) {
    // Stop any existing animation
    stopWeatherAnimation();
    
    // Clear animation container
    animationContainer.innerHTML = '';
    
    // Get weather condition style
    const weatherCondition = weatherConditions[weatherCode] || 'cloudy';
    animationContainer.className = 'animation-container ' + weatherCondition;
    
    weatherAnimationActive = true;
    
    // Create animation based on weather condition
    switch (weatherCondition) {
        case 'sunny':
            createSunnyAnimation();
            break;
        case 'rainy':
            createRainyAnimation();
            break;
        case 'snowy':
            createSnowyAnimation();
            break;
        case 'storm':
            createStormAnimation();
            break;
        default: // cloudy
            createCloudyAnimation();
            break;
    }
}

// Stop all weather animations
function stopWeatherAnimation() {
    weatherAnimationActive = false;
    animationFrames.forEach(frame => frame.stop());
    animationFrames = [];
}

// Create sunny animation
function createSunnyAnimation() {
    const sunElement = document.createElement('div');
    sunElement.className = 'animated-element';
    sunElement.style.width = '60px';
    sunElement.style.height = '60px';
    sunElement.style.backgroundColor = '#ffcc33';
    sunElement.style.boxShadow = '0 0 20px 10px rgba(255, 204, 51, 0.7)';
    sunElement.style.borderRadius = '50%';
    sunElement.style.left = '50%';
    sunElement.style.top = '50%';
    sunElement.style.transform = 'translate(-50%, -50%)';
    animationContainer.appendChild(sunElement);
    
    // Using popmotion for sun pulsing animation
    const { animate, spring } = window.popmotion;
    
    const pulseAnimation = animate({
        from: 1,
        to: 1.2,
        duration: 2000,
        repeat: Infinity,
        repeatType: 'reverse',
        onUpdate: (scale) => {
            sunElement.style.transform = `translate(-50%, -50%) scale(${scale})`;
        }
    });
    
    animationFrames.push(pulseAnimation);
    
    // Add some small clouds moving across
    for (let i = 0; i < 3; i++) {
        createMovingCloud(i * 8000);
    }
}

// Create cloudy animation
function createCloudyAnimation() {
    // Create multiple clouds
    for (let i = 0; i < 5; i++) {
        createMovingCloud(i * 3000);
    }
}

// Create rainy animation
function createRainyAnimation() {
    // Add some clouds
    createCloudyAnimation();
    
    // Add raindrops
    for (let i = 0; i < 30; i++) {
        createRaindrop(Math.random() * 1500);
    }
}

// Create snowy animation
function createSnowyAnimation() {
    // Add some clouds
    createCloudyAnimation();
    
    // Add snowflakes
    for (let i = 0; i < 30; i++) {
        createSnowflake(Math.random() * 2000);
    }
}

// Create storm animation
function createStormAnimation() {
    // Add dark clouds
    createCloudyAnimation();
    
    // Add raindrops
    createRainyAnimation();
    
    // Add lightning flashes
    for (let i = 0; i < 4; i++) {
        createLightning(2000 + i * 4000);
    }
}

// Helper animation functions
function createMovingCloud(delay) {
    if (!weatherAnimationActive) return;
    
    const cloudElement = document.createElement('div');
    cloudElement.className = 'animated-element';
    cloudElement.style.width = `${70 + Math.random() * 50}px`;
    cloudElement.style.height = `${40 + Math.random() * 30}px`;
    cloudElement.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    cloudElement.style.borderRadius = '20px';
    cloudElement.style.top = `${20 + Math.random() * 40}px`;
    cloudElement.style.left = '-80px';
    animationContainer.appendChild(cloudElement);
    
    const { animate } = window.popmotion;
    
    const cloudAnimation = animate({
        from: -80,
        to: animationContainer.offsetWidth + 80,
        duration: 15000 + Math.random() * 10000,
        delay,
        onUpdate: (x) => {
            if (weatherAnimationActive) {
                cloudElement.style.left = `${x}px`;
            }
        },
        onComplete: () => {
            if (weatherAnimationActive) {
                animationContainer.removeChild(cloudElement);
                createMovingCloud(0);
            }
        }
    });
    
    animationFrames.push(cloudAnimation);
}

function createRaindrop(delay) {
    if (!weatherAnimationActive) return;
    
    const dropElement = document.createElement('div');
    dropElement.className = 'animated-element';
    dropElement.style.width = '2px';
    dropElement.style.height = '10px';
    dropElement.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    dropElement.style.borderRadius = '5px';
    dropElement.style.top = '-10px';
    dropElement.style.left = `${Math.random() * animationContainer.offsetWidth}px`;
    animationContainer.appendChild(dropElement);
    
    const { animate } = window.popmotion;
    
    const dropAnimation = animate({
        from: -10,
        to: animationContainer.offsetHeight + 10,
        duration: 1000 + Math.random() * 500,
        delay,
        onUpdate: (y) => {
            if (weatherAnimationActive) {
                dropElement.style.top = `${y}px`;
            }
        },
        onComplete: () => {
            if (weatherAnimationActive) {
                animationContainer.removeChild(dropElement);
                createRaindrop(0);
            }
        }
    });
    
    animationFrames.push(dropAnimation);
}

function createSnowflake(delay) {
    if (!weatherAnimationActive) return;
    
    const flakeElement = document.createElement('div');
    flakeElement.className = 'animated-element';
    const size = 2 + Math.random() * 4;
    flakeElement.style.width = `${size}px`;
    flakeElement.style.height = `${size}px`;
    flakeElement.style.backgroundColor = 'white';
    flakeElement.style.borderRadius = '50%';
    flakeElement.style.top = '-10px';
    flakeElement.style.left = `${Math.random() * animationContainer.offsetWidth}px`;
    animationContainer.appendChild(flakeElement);
    
    const { animate } = window.popmotion;
    
    // Snowflake falling animation
    const snowfallAnimation = animate({
        from: { y: -10, x: Math.random() * animationContainer.offsetWidth },
        to: { y: animationContainer.offsetHeight + 10, x: Math.random() * animationContainer.offsetWidth },
        duration: 3000 + Math.random() * 2000,
        delay,
        onUpdate: ({ x, y }) => {
            if (weatherAnimationActive) {
                flakeElement.style.top = `${y}px`;
                flakeElement.style.left = `${x}px`;
            }
        },
        onComplete: () => {
            if (weatherAnimationActive) {
                animationContainer.removeChild(flakeElement);
                createSnowflake(0);
            }
        }
    });
    
    animationFrames.push(snowfallAnimation);
}

function createLightning(delay) {
    if (!weatherAnimationActive) return;
    
    const flashElement = document.createElement('div');
    flashElement.className = 'animated-element';
    flashElement.style.width = '100%';
    flashElement.style.height = '100%';
    flashElement.style.backgroundColor = 'rgba(255, 255, 255, 0)';
    flashElement.style.position = 'absolute';
    flashElement.style.top = '0';
    flashElement.style.left = '0';
    flashElement.style.zIndex = '10';
    animationContainer.appendChild(flashElement);
    
    const { animate } = window.popmotion;
    
    setTimeout(() => {
        if (!weatherAnimationActive) return;
        
        // First flash
        flashElement.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        
        setTimeout(() => {
            if (!weatherAnimationActive) return;
            flashElement.style.backgroundColor = 'rgba(255, 255, 255, 0)';
            
            // Second flash
            setTimeout(() => {
                if (!weatherAnimationActive) return;
                flashElement.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
                
                setTimeout(() => {
                    if (!weatherAnimationActive) return;
                    flashElement.style.backgroundColor = 'rgba(255, 255, 255, 0)';
                    animationContainer.removeChild(flashElement);
                    
                    // Create new lightning after some time
                    setTimeout(() => {
                        if (weatherAnimationActive) {
                            createLightning(0);
                        }
                    }, 2000 + Math.random() * 5000);
                }, 50);
            }, 100);
        }, 50);
    }, delay);
}

// Initial setup
window.addEventListener('load', () => {
    createCloudyAnimation();
});