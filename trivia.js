// ==========================
// trivia.js
// ==========================

// --- FIREBASE SETUP (Replace with your own config from Firebase Console) ---
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
let currentUser = null;

// --- GOOGLE LOGIN ---
function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            currentUser = result.user;
            document.getElementById('userName').innerText = "Welcome, " + currentUser.displayName;
            startTriviaGame();
        })
        .catch(error => {
            console.error("Login error:", error);
        });
}

// --- GOOGLE LOGOUT ---
function googleLogout() {
    firebase.auth().signOut().then(() => {
        currentUser = null;
        document.getElementById('userName').innerText = "You are logged out.";
    });
}

// ==========================
// TRIVIA GAME VARIABLES
// ==========================
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let questionStartTime;
let totalTime = 0;
let answeredQuestions = 0;

// ==========================
// LOAD QUESTIONS FROM API
// ==========================
async function loadQuestions() {
    // Fetch 10 multiple-choice questions
    const response = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
    const data = await response.json();
    questions = data.results;
    showQuestion();
}

// ==========================
// DISPLAY CURRENT QUESTION
// ==========================
function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endGame();
        return;
    }

    const q = questions[currentQuestionIndex];
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");

    // Decode HTML special characters
    const parser = new DOMParser();
    questionElement.innerText = parser.parseFromString(q.question, 'text/html').body.textContent;

    // Shuffle answers
    let answers = [...q.incorrect_answers, q.correct_answer];
    answers.sort(() => Math.random() - 0.5);

    // Display buttons
    answersElement.innerHTML = "";
    for (let ans of answers) {
        const btn = document.createElement("button");
        btn.classList.add("answer-btn");
        btn.innerText = parser.parseFromString(ans, 'text/html').body.textContent;
        btn.onclick = () => checkAnswer(ans, q.correct_answer);
        answersElement.appendChild(btn);
    }

    // Start timer for this question
    questionStartTime = new Date().getTime();
}

// ==========================
// CHECK USER ANSWER
// ==========================
function checkAnswer(selected, correct) {
    const timeTaken = (new Date().getTime() - questionStartTime) / 1000; // in seconds
    totalTime += timeTaken;
    answeredQuestions++;

    if (selected === correct) {
        score += Math.max(10 - Math.floor(timeTaken), 1); // faster = more points
    }

    currentQuestionIndex++;
    showQuestion();
}

// ==========================
// END GAME AND SAVE SCORE
// ==========================
async function endGame() {
    const avgTime = (totalTime / answeredQuestions).toFixed(2);

    if (currentUser) {
        await db.collection("leaderboard").add({
            name: currentUser.displayName,
            email: currentUser.email,
            score: score,
            avgTime: Number(avgTime),
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }

    document.getElementById("question").innerText = "Game Over! Your Score: " + score;
    document.getElementById("answers").innerHTML = `
        <p>Average Time: ${avgTime} seconds</p>
        <button onclick="loadLeaderboard()">View Leaderboard</button>
    `;
}

// ==========================
// LOAD LEADERBOARD (TOP 30)
// ==========================
async function loadLeaderboard() {
    const leaderboardElement = document.getElementById("leaderboard");
    leaderboardElement.innerHTML = "<h3>🏆 Top 30 Players</h3>";

    const snapshot = await db.collection("leaderboard")
        .orderBy("score", "desc")
        .limit(30)
        .get();

    snapshot.forEach(doc => {
        const data = doc.data();
        const entry = document.createElement("div");
        entry.classList.add("leaderboard-entry");
        entry.innerText = `${data.name} - ${data.score} pts (avg ${data.avgTime}s)`;
        leaderboardElement.appendChild(entry);
    });
}

// ==========================
// START GAME FUNCTION
// ==========================
function startTriviaGame() {
    document.getElementById("startBtn").style.display = "none";
    loadQuestions();
}

// ==========================
// VR MODE (ENTER / EXIT)
// ==========================
function enterVR() {
    const scene = document.querySelector("a-scene");
    scene.enterVR();
}

function exitVR() {
    const scene = document.querySelector("a-scene");
    scene.exitVR();
}
