// DOM Elements
const mainMenu = document.getElementById('mainMenu');
const gameScreen = document.getElementById('gameScreen');
const settingsScreen = document.getElementById('settingsScreen');
const leaderboardScreen = document.getElementById('leaderboardScreen');
const whiteboard = document.getElementById('whiteboard');
const whiteboardCanvas = document.getElementById('whiteboardCanvas');

// Buttons
const startGameBtn = document.getElementById('startGameBtn');
const leaderboardBtn = document.getElementById('leaderboardBtn');
const settingsBtn = document.getElementById('settingsBtn');
const backToMenuBtn = document.getElementById('backToMenuBtn');
const backToMenuFromSettingsBtn = document.getElementById('backToMenuFromSettingsBtn');
const backToMenuFromLeaderboardBtn = document.getElementById('backToMenuFromLeaderboardBtn');
const saveSettingsBtn = document.getElementById('saveSettingsBtn');
const whiteboardBtn = document.getElementById('whiteboardBtn');
const closeWhiteboardBtn = document.getElementById('closeWhiteboardBtn');
const musicControlBtn = document.getElementById('musicControlBtn');
const settingsControlBtn = document.getElementById('settingsControlBtn');

// Settings elements
const backgroundSelect = document.getElementById('backgroundSelect');
const mathTopicSelect = document.getElementById('mathTopicSelect');
const musicToggle = document.getElementById('musicToggle');

// Game elements
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const scoreValue = document.getElementById('scoreValue');
const timerValue = document.getElementById('timerValue');

// Audio
const bgMusic = document.getElementById('bgMusic');

// Game state
let currentScore = 0;
let timer = 60;
let timerInterval;
let currentQuestionIndex = 0;
let questions = [];

// Sample questions for each topic
const questionBank = {
    general: [
        {
            question: "What is 15 + 27?",
            options: ["40", "42", "38", "45"],
            correct: 1
        },
        {
            question: "What is 8 × 7?",
            options: ["54", "56", "58", "60"],
            correct: 1
        },
        {
            question: "What is 144 ÷ 12?",
            options: ["10", "11", "12", "13"],
            correct: 2
        },
        {
            question: "What is 25% of 80?",
            options: ["15", "20", "25", "30"],
            correct: 1
        },
        {
            question: "What is the square root of 64?",
            options: ["6", "7", "8", "9"],
            correct: 2
        }
    ],
    vedic: [
        {
            question: "Using Vedic math, what is 12 × 13?",
            options: ["156", "144", "168", "136"],
            correct: 0
        },
        {
            question: "Using Vedic math, what is 98 × 97?",
            options: ["9506", "9606", "9406", "9706"],
            correct: 0
        },
        {
            question: "Using Vedic math, what is 46 × 44?",
            options: ["2024", "2124", "1924", "2224"],
            correct: 0
        },
        {
            question: "Using Vedic math, what is 23 × 25?",
            options: ["575", "565", "585", "555"],
            correct: 0
        }
    ],
    algebra: [
        {
            question: "Solve for x: 2x + 5 = 15",
            options: ["x = 5", "x = 10", "x = 7.5", "x = 6"],
            correct: 0
        },
        {
            question: "Simplify: (3x² + 2x - 5) + (x² - 4x + 7)",
            options: ["4x² - 2x + 2", "4x² + 6x + 2", "3x² - 2x + 2", "2x² - 2x + 2"],
            correct: 0
        },
        {
            question: "Factor: x² - 9",
            options: ["(x-3)(x+3)", "(x-9)(x+1)", "(x-3)²", "(x+3)²"],
            correct: 0
        },
        {
            question: "Solve: 3(x - 4) = 15",
            options: ["x = 9", "x = 7", "x = 5", "x = 3"],
            correct: 0
        }
    ],
    geometry: [
        {
            question: "What is the area of a circle with radius 5?",
            options: ["25π", "10π", "5π", "50π"],
            correct: 0
        },
        {
            question: "What is the Pythagorean theorem?",
            options: ["a² + b² = c²", "a + b = c", "a × b = c", "a/b = c"],
            correct: 0
        },
        {
            question: "How many degrees in a triangle?",
            options: ["180", "90", "360", "270"],
            correct: 0
        },
        {
            question: "What is the perimeter of a square with side length 4?",
            options: ["16", "12", "8", "20"],
            correct: 0
        }
    ]
};

// Leaderboard data
let leaderboard = [
    { name: "Math Wizard", score: 950, time: 45 },
    { name: "Number Ninja", score: 850, time: 52 },
    { name: "Algebra Ace", score: 800, time: 58 },
    { name: "Geometry Guru", score: 750, time: 60 },
    { name: "Calculation King", score: 700, time: 55 }
];

// Initialize the app
function init() {
    // Set event listeners
    startGameBtn.addEventListener('click', startGame);
    leaderboardBtn.addEventListener('click', showLeaderboard);
    settingsBtn.addEventListener('click', showSettings);
    backToMenuBtn.addEventListener('click', showMainMenu);
    backToMenuFromSettingsBtn.addEventListener('click', showMainMenu);
    backToMenuFromLeaderboardBtn.addEventListener('click', showMainMenu);
    saveSettingsBtn.addEventListener('click', saveSettings);
    whiteboardBtn.addEventListener('click', showWhiteboard);
    closeWhiteboardBtn.addEventListener('click', hideWhiteboard);
    musicControlBtn.addEventListener('click', toggleMusic);
    settingsControlBtn.addEventListener('click', showSettings);
    musicToggle.addEventListener('click', toggleMusic);
    
    // Initialize whiteboard
    initWhiteboard();
    
    // Start background music
    bgMusic.volume = 0.3;
    bgMusic.play().catch(e => console.log("Audio play failed:", e));
    
    // Load settings
    loadSettings();
}

// Screen navigation functions
function showMainMenu() {
    mainMenu.style.display = 'flex';
    gameScreen.style.display = 'none';
    settingsScreen.style.display = 'none';
    leaderboardScreen.style.display = 'none';
    stopGame();
}

function startGame() {
    mainMenu.style.display = 'none';
    gameScreen.style.display = 'flex';
    settingsScreen.style.display = 'none';
    leaderboardScreen.style.display = 'none';
    
    // Reset game state
    currentScore = 0;
    timer = 60;
    currentQuestionIndex = 0;
    scoreValue.textContent = currentScore;
    timerValue.textContent = timer;
    
    // Get selected topic
    const topic = mathTopicSelect.value;
    questions = [...questionBank[topic]];
    
    // Shuffle questions
    shuffleArray(questions);
    
    // Display first question
    displayQuestion();
    
    // Start timer
    startTimer();
}

function showSettings() {
    mainMenu.style.display = 'none';
    gameScreen.style.display = 'none';
    settingsScreen.style.display = 'flex';
    leaderboardScreen.style.display = 'none';
}

function showLeaderboard() {
    mainMenu.style.display = 'none';
    gameScreen.style.display = 'none';
    settingsScreen.style.display = 'none';
    leaderboardScreen.style.display = 'flex';
    
    // Populate leaderboard
    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.innerHTML = '';
    
    leaderboard.forEach((entry, index) => {
        const item = document.createElement('div');
        item.className = 'leaderboard-item';
        item.innerHTML = `
            <span>${index + 1}. ${entry.name}</span>
            <span>Score: ${entry.score} | Time: ${entry.time}s</span>
        `;
        leaderboardList.appendChild(item);
    });
}

// Game functions
function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endGame();
        return;
    }
    
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create option buttons
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(index));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];
    const optionButtons = document.querySelectorAll('.option-btn');
    
    // Disable all buttons
    optionButtons.forEach(button => {
        button.disabled = true;
    });
    
    // Highlight correct and incorrect answers
    if (selectedIndex === question.correct) {
        optionButtons[selectedIndex].classList.add('correct');
        currentScore += 100;
        scoreValue.textContent = currentScore;
    } else {
        optionButtons[selectedIndex].classList.add('incorrect');
        optionButtons[question.correct].classList.add('correct');
    }
    
    // Move to next question after a delay
    setTimeout(() => {
        currentQuestionIndex++;
        displayQuestion();
    }, 1500);
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer--;
        timerValue.textContent = timer;
        
        if (timer <= 0) {
            endGame();
        }
    }, 1000);
}

function stopGame() {
    clearInterval(timerInterval);
}

function endGame() {
    stopGame();
    alert(`Game Over! Your score: ${currentScore}`);
    showMainMenu();
    
    // Add to leaderboard if score is high enough
    if (currentScore > 0) {
        const playerName = prompt("Enter your name for the leaderboard:");
        if (playerName) {
            leaderboard.push({
                name: playerName,
                score: currentScore,
                time: 60 - timer
            });
            
            // Sort leaderboard by score (descending)
            leaderboard.sort((a, b) => b.score - a.score);
            
            // Keep only top 10
            if (leaderboard.length > 10) {
                leaderboard = leaderboard.slice(0, 10);
            }
            
            // Save to localStorage
            localStorage.setItem('mathLabLeaderboard', JSON.stringify(leaderboard));
        }
    }
}

// Settings functions
function loadSettings() {
    const savedBackground = localStorage.getItem('mathLabBackground') || 'space';
    const savedTopic = localStorage.getItem('mathLabTopic') || 'general';
    const savedMusicMuted = localStorage.getItem('mathLabMusicMuted') === 'true';
    const savedLeaderboard = localStorage.getItem('mathLabLeaderboard');
    
    backgroundSelect.value = savedBackground;
    mathTopicSelect.value = savedTopic;
    
    if (savedLeaderboard) {
        leaderboard = JSON.parse(savedLeaderboard);
    }
    
    changeBackground(savedBackground);
    
    if (savedMusicMuted) {
        bgMusic.muted = true;
        musicToggle.textContent = 'Unmute';
        musicControlBtn.textContent = '🔇';
    }
}

function saveSettings() {
    const background = backgroundSelect.value;
    const topic = mathTopicSelect.value;
    const musicMuted = bgMusic.muted;
    
    localStorage.setItem('mathLabBackground', background);
    localStorage.setItem('mathLabTopic', topic);
    localStorage.setItem('mathLabMusicMuted', musicMuted);
    
    changeBackground(background);
    
    alert('Settings saved!');
    showMainMenu();
}

function changeBackground(theme) {
    document.body.className = `${theme}-bg`;
}

function toggleMusic() {
    bgMusic.muted = !bgMusic.muted;
    
    if (bgMusic.muted) {
        musicToggle.textContent = 'Unmute';
        musicControlBtn.textContent = '🔇';
    } else {
        musicToggle.textContent = 'Mute';
        musicControlBtn.textContent = '🔊';
    }
}

// Whiteboard functions
function initWhiteboard() {
    const ctx = whiteboardCanvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    
    // Set canvas size
    function resizeCanvas() {
        whiteboardCanvas.width = whiteboardCanvas.offsetWidth;
        whiteboardCanvas.height = whiteboardCanvas.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Drawing functions
    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
    
    function draw(e) {
        if (!isDrawing) return;
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();
        
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
    
    function stopDrawing() {
        isDrawing = false;
    }
    
    // Event listeners
    whiteboardCanvas.addEventListener('mousedown', startDrawing);
    whiteboardCanvas.addEventListener('mousemove', draw);
    whiteboardCanvas.addEventListener('mouseup', stopDrawing);
    whiteboardCanvas.addEventListener('mouseout', stopDrawing);
    
    // Touch events for mobile
    whiteboardCanvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        whiteboardCanvas.dispatchEvent(mouseEvent);
    });
    
    whiteboardCanvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        whiteboardCanvas.dispatchEvent(mouseEvent);
    });
    
    whiteboardCanvas.addEventListener('touchend', () => {
        const mouseEvent = new MouseEvent('mouseup', {});
        whiteboardCanvas.dispatchEvent(mouseEvent);
    });
}

function showWhiteboard() {
    whiteboard.style.display = 'block';
}

function hideWhiteboard() {
    whiteboard.style.display = 'none';
    // Clear the canvas
    const ctx = whiteboardCanvas.getContext('2d');
    ctx.clearRect(0, 0, whiteboardCanvas.width, whiteboardCanvas.height);
}

// Utility functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);