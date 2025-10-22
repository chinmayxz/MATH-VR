/* ===========================
   Simple Math Trivia App JS
   - fetches questions from Open Trivia DB
   - displays them in a small popup
   - immediate feedback (red X / green check)
   - user can guess until correct
   - next/back navigation
   - Enter VR / Exit VR buttons
   =========================== */

/* ---------- Config ---------- */
// Open Trivia DB: request 10 multiple-choice questions (category 19 = Science: Mathematics)
const API_URL = "https://opentdb.com/api.php?amount=10&category=19&type=multiple";

/* ---------- State ---------- */
let questions = [];           // array of question objects from API
let currentIndex = 0;         // current question index
let attemptsForCurrent = 0;   // number of attempts for the current question (optional metric)

/* ---------- DOM elements ---------- */
const popup = document.getElementById('popup');
const questionTextEl = document.getElementById('questionText');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const qIndexEl = document.getElementById('qIndex');
const qTotalEl = document.getElementById('qTotal');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const backArrow = document.getElementById('backArrow');
const forwardArrow = document.getElementById('forwardArrow');
const closePopup = document.getElementById('closePopup');

const enterVrBtn = document.getElementById('enterVrBtn');
const exitVrBtn = document.getElementById('exitVrBtn');
const scene = document.querySelector('a-scene');

/* ---------- Utility: decode HTML entities (OpenTDB returns HTML encoded strings) ---------- */
function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

/* ---------- Shuffle helper ---------- */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ---------- Load questions from API and initialize ---------- */
async function loadQuestions() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    if (data.response_code !== 0 || !data.results || data.results.length === 0) {
      // if API fails, make a few simple math questions locally as fallback
      console.warn('API failed or returned no questions, using local fallback.');
      questions = generateLocalMathQuestions(10);
    } else {
      // Use API results
      questions = data.results.map(q => {
        const allOptions = [...q.incorrect_answers, q.correct_answer];
        return {
          question: decodeHtml(q.question),
          correct: decodeHtml(q.correct_answer),
          options: shuffle(allOptions.map(decodeHtml))
        };
      });
    }

    // Update UI counters
    qTotalEl.innerText = questions.length;
    openPopup();
    showQuestion(currentIndex);
  } catch (err) {
    console.error("Error loading questions:", err);
    questions = generateLocalMathQuestions(10);
    qTotalEl.innerText = questions.length;
    openPopup();
    showQuestion(currentIndex);
  }
}

/* ---------- Local fallback question generator (simple mental math) ---------- */
function generateLocalMathQuestions(n) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    // create simple addition/subtraction/multiplication mental math
    const type = ['+', '-', '*'][Math.floor(Math.random() * 3)];
    let a = Math.floor(Math.random() * 12) + 1; // 1..12
    let b = Math.floor(Math.random() * 12) + 1;
    // avoid negative answers for subtraction by ensuring a>=b
    if (type === '-' && a < b) [a,b] = [b,a];
    const correctVal = eval(`${a}${type}${b}`); // safe here; small numbers
    // make 3 wrong choices
    const wrongs = new Set();
    while (wrongs.size < 3) {
      const delta = Math.floor(Math.random() * 7) - 3; // -3..3
      const candidate = correctVal + delta;
      if (candidate !== correctVal && candidate >= -50 && candidate <= 200) wrongs.add(candidate);
    }
    const options = shuffle([correctVal, ...Array.from(wrongs)]);
    arr.push({
      question: `${a} ${type} ${b} = ?`,
      correct: String(correctVal),
      options: options.map(String)
    });
  }
  return arr;
}

/* ---------- Show a given question index ---------- */
function showQuestion(index) {
  if (!questions || questions.length === 0) {
    questionTextEl.innerText = "No questions loaded.";
    return;
  }
  currentIndex = Math.max(0, Math.min(index, questions.length - 1));
  const q = questions[currentIndex];

  // update header counters
  qIndexEl.innerText = currentIndex + 1;

  // show question
  questionTextEl.innerText = q.question;

  // clear old options
  optionsEl.innerHTML = '';
  feedbackEl.innerHTML = '';
  feedbackEl.style.color = '#000';

  // build option buttons
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerText = opt;
    btn.onclick = () => handleAnswer(btn, opt, q.correct);
    optionsEl.appendChild(btn);
  });

  // reset attempts
  attemptsForCurrent = 0;
}

/* ---------- Handle when user clicks an option ---------- */
function handleAnswer(buttonEl, selected, correct) {
  attemptsForCurrent++;

  // if selected is exactly correct string
  if (String(selected) === String(correct)) {
    // Show green check and mark correct
    feedbackEl.innerHTML = '✅ Correct!';
    feedbackEl.style.color = 'green';

    // highlight selected button in green and disable all buttons
    Array.from(optionsEl.children).forEach(b => {
      b.disabled = true;
      if (b === buttonEl) {
        b.style.background = '#d4f8d4';
        b.style.border = '1px solid #2e7d32';
      } else {
        b.style.opacity = '0.7';
      }
    });
  } else {
    // Wrong: show red X but keep buttons enabled so the user can try again
    feedbackEl.innerHTML = '❌ Wrong — try again.';
    feedbackEl.style.color = 'crimson';

    // visually mark the button briefly (shake or red flash)
    buttonEl.style.background = '#fdecea';
    buttonEl.style.border = '1px solid #b71c1c';
    // re-set style after short delay so they can try another choice
    setTimeout(() => {
      buttonEl.style.background = '';
      buttonEl.style.border = '';
    }, 600);
  }
}

/* ---------- Navigation ---------- */
prevBtn.addEventListener('click', () => {
  const newIndex = Math.max(0, currentIndex - 1);
  showQuestion(newIndex);
});
nextBtn.addEventListener('click', () => {
  const newIndex = Math.min(questions.length - 1, currentIndex + 1);
  showQuestion(newIndex);
});
backArrow.addEventListener('click', () => {
  const newIndex = Math.max(0, currentIndex - 1);
  showQuestion(newIndex);
});
forwardArrow.addEventListener('click', () => {
  const newIndex = Math.min(questions.length - 1, currentIndex + 1);
  showQuestion(newIndex);
});

/* close popup */
closePopup.addEventListener('click', () => {
  popup.style.display = 'none';
});

/* open popup (show it) */
function openPopup() {
  popup.style.display = 'flex';
}

/* ---------- VR enter / exit ---------- */
enterVrBtn.addEventListener('click', () => {
  // some browsers won't allow direct enterVR unless user gesture; this is a user click so it should work
  const s = document.querySelector('a-scene');
  if (s && s.enterVR) {
    s.enterVR();
  } else {
    alert("VR not available on this device / browser.");
  }
});
exitVrBtn.addEventListener('click', () => {
  const s = document.querySelector('a-scene');
  if (s && s.exitVR) {
    s.exitVR();
  }
});

/* ---------- Initialize on load ---------- */
window.addEventListener('load', () => {
  // initially hide popup while loading questions
  popup.style.display = 'none';
  // load questions from API (or fallback)
  loadQuestions();
});
