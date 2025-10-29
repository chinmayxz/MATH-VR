// =============================================
// Math VR Game - Unified Popup Version
// =============================================

const game = {
  score: 0,
  currentQuestionIndex: 0,
  totalQuestions: 10,
  questions: [],
  currentQuestion: null,
  attempts: 0,
  answeredCorrectly: false,
  isVRMode: false,
  
  // Initialize game
  init() {
    console.log('🎮 Math VR Initialized');
    this.setupVRDetection();
  },
  
  // Detect VR mode changes
  setupVRDetection() {
    const scene = document.querySelector('a-scene');
    if (scene) {
      scene.addEventListener('enter-vr', () => {
        console.log('🥽 Entered VR mode');
        this.isVRMode = true;
        this.showVRPopup();
      });
      
      scene.addEventListener('exit-vr', () => {
        console.log('🖥️ Exited VR mode');
        this.isVRMode = false;
        this.hideVRPopup();
      });
    }
  },
  
  // Show VR popup (hide desktop popup)
  showVRPopup() {
    // Hide desktop popups
    document.getElementById('entrance-screen').style.display = 'none';
    document.getElementById('question-popup').style.display = 'none';
    document.getElementById('question-icon').style.display = 'none';
    
    // Show VR popup
    const vrPopup = document.getElementById('vr-popup');
    if (vrPopup) {
      vrPopup.setAttribute('visible', 'true');
    }
    
    // Update VR popup with current data
    if (this.currentQuestion) {
      this.updateVRDisplay();
    }
  },
  
  // Hide VR popup (show desktop popup)
  hideVRPopup() {
    const vrPopup = document.getElementById('vr-popup');
    const vrIcon = document.getElementById('vr-icon');
    
    if (vrPopup) vrPopup.setAttribute('visible', 'false');
    if (vrIcon) vrIcon.setAttribute('visible', 'false');
    
    // Show appropriate desktop popup
    if (this.currentQuestion) {
      document.getElementById('question-popup').style.display = 'block';
    } else {
      document.getElementById('entrance-screen').style.display = 'flex';
    }
  },
  
  // Setup VR click handlers
  setupVRClickHandlers() {
    console.log('🎮 Setting up VR click handlers...');
    
    // Answer buttons
    for (let i = 0; i < 4; i++) {
      const box = document.getElementById(`vr-answer-${i}`);
      if (box) {
        // Remove old listeners
        box.removeAttribute('data-setup');
        
        // Add click event
        box.addEventListener('click', () => {
          console.log(`Clicked answer ${i}`);
          if (this.currentQuestion && !this.answeredCorrectly) {
            this.checkAnswer(this.currentQuestion.answers[i], null, i);
          }
        });
        
        // Add hover feedback (console log for debugging)
        box.addEventListener('mouseenter', () => {
          console.log(`Hovering over answer ${i}`);
        });
        
        box.setAttribute('data-setup', 'true');
      }
    }
    
    // Minimize button
    const minBtn = document.getElementById('vr-minimize');
    if (minBtn && !minBtn.hasAttribute('data-setup')) {
      minBtn.addEventListener('click', () => {
        console.log('Minimize clicked');
        const vrPopup = document.getElementById('vr-popup');
        const vrIcon = document.getElementById('vr-icon');
        if (vrPopup) vrPopup.setAttribute('visible', 'false');
        if (vrIcon) vrIcon.setAttribute('visible', 'true');
      });
      minBtn.setAttribute('data-setup', 'true');
    }
    
    // Restore icon
    const icon = document.getElementById('vr-icon');
    const iconSphere = icon ? icon.querySelector('a-sphere') : null;
    if (iconSphere && !iconSphere.hasAttribute('data-setup')) {
      iconSphere.addEventListener('click', () => {
        console.log('Restore clicked');
        const vrPopup = document.getElementById('vr-popup');
        const vrIcon = document.getElementById('vr-icon');
        if (vrPopup) vrPopup.setAttribute('visible', 'true');
        if (vrIcon) vrIcon.setAttribute('visible', 'false');
      });
      iconSphere.setAttribute('data-setup', 'true');
    }
    
    console.log('✅ VR click handlers setup complete');
  },
  
  // Update VR display with current question
  updateVRDisplay() {
    if (!this.currentQuestion) return;
    
    // Score
    const scoreEl = document.getElementById('vr-score-display');
    if (scoreEl) {
      scoreEl.setAttribute('value', `Score: ${this.score} | Questions: ${this.currentQuestionIndex + 1}/${this.totalQuestions}`);
    }
    
    // Category
    const categoryEl = document.getElementById('vr-category');
    if (categoryEl) {
      categoryEl.setAttribute('value', this.currentQuestion.category);
    }
    
    // Question
    const questionEl = document.getElementById('vr-question');
    if (questionEl) {
      questionEl.setAttribute('value', this.currentQuestion.question);
    }
    
    // Answers
    for (let i = 0; i < 4; i++) {
      const textEl = document.getElementById(`vr-answer-text-${i}`);
      const boxEl = document.getElementById(`vr-answer-${i}`);
      
      if (textEl && this.currentQuestion.answers[i]) {
        const letter = String.fromCharCode(65 + i);
        textEl.setAttribute('value', `${letter}. ${this.currentQuestion.answers[i]}`);
      }
      
      // Reset color
      if (boxEl) {
        boxEl.setAttribute('color', '#2196F3');
      }
    }
  },
  
  // Load questions from API or generate
  async loadQuestions() {
    console.log('📚 Loading questions...');
    
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=10&category=19&type=multiple');
      const data = await response.json();
      
      if (data.response_code === 0 && data.results.length > 0) {
        this.questions = data.results.map(q => this.formatAPIQuestion(q));
        console.log('✅ Loaded API questions');
      } else {
        throw new Error('API failed');
      }
    } catch (error) {
      console.log('⚠️ Using custom questions');
      this.questions = this.generateCustomQuestions(10);
    }
  },
  
  // Format API question
  formatAPIQuestion(q) {
    const decode = (html) => {
      const txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
    };
    
    const answers = [...q.incorrect_answers.map(a => decode(a)), decode(q.correct_answer)];
    
    // Shuffle answers
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    
    return {
      question: decode(q.question),
      category: decode(q.category),
      answers: answers,
      correctAnswer: decode(q.correct_answer)
    };
  },
  
  // Generate custom questions
  generateCustomQuestions(count) {
    const questions = [];
    
    for (let i = 0; i < count; i++) {
      const type = Math.floor(Math.random() * 6);
      let question, correctAnswer, answers;
      
      switch(type) {
        case 0: // Addition
          const a1 = Math.floor(Math.random() * 50) + 10;
          const b1 = Math.floor(Math.random() * 50) + 10;
          correctAnswer = a1 + b1;
          question = `What is ${a1} + ${b1}?`;
          break;
          
        case 1: // Subtraction
          const a2 = Math.floor(Math.random() * 50) + 30;
          const b2 = Math.floor(Math.random() * 30) + 10;
          correctAnswer = a2 - b2;
          question = `What is ${a2} - ${b2}?`;
          break;
          
        case 2: // Multiplication
          const a3 = Math.floor(Math.random() * 12) + 2;
          const b3 = Math.floor(Math.random() * 12) + 2;
          correctAnswer = a3 * b3;
          question = `What is ${a3} × ${b3}?`;
          break;
          
        case 3: // Division
          const b4 = Math.floor(Math.random() * 10) + 2;
          const a4 = b4 * (Math.floor(Math.random() * 10) + 2);
          correctAnswer = a4 / b4;
          question = `What is ${a4} ÷ ${b4}?`;
          break;
          
        case 4: // Squares
          const n = Math.floor(Math.random() * 15) + 2;
          correctAnswer = n * n;
          question = `What is ${n}² (${n} squared)?`;
          break;
          
        case 5: // Percentage
          const base = [20, 25, 40, 50, 80, 100][Math.floor(Math.random() * 6)];
          const percent = [10, 20, 25, 50, 75][Math.floor(Math.random() * 5)];
          correctAnswer = (base * percent) / 100;
          question = `What is ${percent}% of ${base}?`;
          break;
      }
      
      // Generate answer options
      answers = [correctAnswer.toString()];
      const offsets = [-3, -2, -1, 1, 2, 3, 5, 7, 10];
      
      while (answers.length < 4) {
        const offset = offsets[Math.floor(Math.random() * offsets.length)];
        const wrongAnswer = (correctAnswer + offset).toString();
        if (!answers.includes(wrongAnswer) && parseFloat(wrongAnswer) > 0) {
          answers.push(wrongAnswer);
        }
      }
      
      // Shuffle
      for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
      }
      
      questions.push({
        question: question,
        category: 'Math Challenge',
        answers: answers,
        correctAnswer: correctAnswer.toString()
      });
    }
    
    return questions;
  },
  
  // Show current question
  showQuestion() {
    if (this.currentQuestionIndex >= this.questions.length) {
      this.endGame();
      return;
    }
    
    this.currentQuestion = this.questions[this.currentQuestionIndex];
    this.attempts = 0;
    this.answeredCorrectly = false;
    
    // Update desktop UI
    document.getElementById('question-count').textContent = (this.currentQuestionIndex + 1);
    document.getElementById('category-badge').textContent = this.currentQuestion.category;
    document.getElementById('question-text').textContent = this.currentQuestion.question;
    
    const container = document.getElementById('answers-container');
    container.innerHTML = '';
    
    this.currentQuestion.answers.forEach((answer, index) => {
      const button = document.createElement('button');
      button.className = 'answer-button';
      button.textContent = `${String.fromCharCode(65 + index)}. ${answer}`;
      button.onclick = () => this.checkAnswer(answer, button, index);
      container.appendChild(button);
    });
    
    document.getElementById('next-button').style.display = 'none';
    
    // Update VR display
    this.updateVRDisplay();
    
    console.log(`❓ Question ${this.currentQuestionIndex + 1}: ${this.currentQuestion.question}`);
  },
  
  // Check answer
  checkAnswer(selectedAnswer, button, answerIndex) {
    if (this.answeredCorrectly) return;
    
    this.attempts++;
    const isCorrect = selectedAnswer === this.currentQuestion.correctAnswer;
    
    if (isCorrect) {
      console.log('✅ Correct!');
      
      // Desktop feedback
      if (button) {
        button.classList.add('correct');
      }
      
      // VR feedback
      if (answerIndex !== undefined) {
        const vrBox = document.getElementById(`vr-answer-${answerIndex}`);
        if (vrBox) {
          vrBox.setAttribute('color', '#4CAF50');
          vrBox.setAttribute('animation', 'property: scale; to: 1.1 1.1 1.1; dur: 200; dir: alternate; loop: 2');
        }
      }
      
      // Award points (only first try)
      if (this.attempts === 1) {
        this.score += 10;
        console.log('🎉 +10 points!');
      } else {
        console.log('✓ Correct, but no points');
      }
      
      this.answeredCorrectly = true;
      
      // Update scores
      document.getElementById('score').textContent = this.score;
      this.updateVRDisplay();
      
      // Disable desktop buttons
      const buttons = document.querySelectorAll('.answer-button');
      buttons.forEach(btn => btn.disabled = true);
      
      document.getElementById('next-button').style.display = 'block';
      
      // Auto-advance
      setTimeout(() => {
        if (this.answeredCorrectly) {
          this.nextQuestion();
        }
      }, 2000);
      
    } else {
      console.log('❌ Try again!');
      
      // Desktop feedback
      if (button) {
        button.classList.add('wrong');
        setTimeout(() => button.classList.remove('wrong'), 500);
      }
      
      // VR feedback
      if (answerIndex !== undefined) {
        const vrBox = document.getElementById(`vr-answer-${answerIndex}`);
        if (vrBox) {
          vrBox.setAttribute('color', '#f44336');
          setTimeout(() => vrBox.setAttribute('color', '#2196F3'), 600);
        }
      }
    }
  },
  
  // Next question
  nextQuestion() {
    document.getElementById('next-button').style.display = 'none';
    this.currentQuestionIndex++;
    this.showQuestion();
  },
  
  // End game
  endGame() {
    document.getElementById('category-badge').textContent = 'Game Complete! 🎉';
    document.getElementById('question-text').innerHTML = `
      <strong>Congratulations!</strong><br><br>
      Final Score: ${this.score} / ${this.totalQuestions * 10}<br>
      You answered all ${this.totalQuestions} questions!
    `;
    document.getElementById('answers-container').innerHTML = '';
    document.getElementById('next-button').style.display = 'none';
    
    // Update VR
    const vrQuestion = document.getElementById('vr-question');
    if (vrQuestion) {
      vrQuestion.setAttribute('value', `Game Complete! Final Score: ${this.score}/${this.totalQuestions * 10}`);
    }
    
    console.log('🎉 Game complete!');
  }
};

// =============================================
// UI Functions
// =============================================

function enterGame() {
  document.getElementById('entrance-screen').classList.add('hidden');
  
  game.loadQuestions().then(() => {
    setTimeout(() => {
      document.getElementById('question-popup').classList.add('visible');
      
      // If in VR, switch to VR popup
      if (game.isVRMode) {
        game.showVRPopup();
      }
      
      game.showQuestion();
    }, 500);
  });
  
  console.log('🎮 Game started!');
}

function minimizePopup() {
  if (game.isVRMode) {
    const vrPopup = document.getElementById('vr-popup');
    const vrIcon = document.getElementById('vr-icon');
    if (vrPopup) vrPopup.setAttribute('visible', 'false');
    if (vrIcon) vrIcon.setAttribute('visible', 'true');
  } else {
    const popup = document.getElementById('question-popup');
    const icon = document.getElementById('question-icon');
    popup.classList.add('minimized');
    icon.classList.add('visible');
  }
}

function maximizePopup() {
  if (game.isVRMode) {
    const vrPopup = document.getElementById('vr-popup');
    const vrIcon = document.getElementById('vr-icon');
    if (vrPopup) vrPopup.setAttribute('visible', 'true');
    if (vrIcon) vrIcon.setAttribute('visible', 'false');
  } else {
    const popup = document.getElementById('question-popup');
    const icon = document.getElementById('question-icon');
    popup.classList.remove('minimized');
    icon.classList.remove('visible');
  }
}

function nextQuestion() {
  game.nextQuestion();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  game.init();
  
  // Wait for A-Frame scene to load before setting up VR handlers
  const scene = document.querySelector('a-scene');
  if (scene) {
    if (scene.hasLoaded) {
      game.setupVRClickHandlers();
    } else {
      scene.addEventListener('loaded', () => {
        console.log('🎬 A-Frame scene loaded');
        game.setupVRClickHandlers();
      });
    }
  }
});
