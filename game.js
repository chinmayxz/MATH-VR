// =============================================
// Math VR Game - Simple Overlay Version
// =============================================

const game = {
  score: 0,
  currentQuestionIndex: 0,
  totalQuestions: 10,
  questions: [],
  currentQuestion: null,
  attempts: 0, // Track attempts for current question
  answeredCorrectly: false,
  isVRMode: false, // Track if in VR mode
  isPanelMinimized: false, // Track if panel is minimized
  
  // Initialize game
  init() {
    console.log('🎮 Math VR Initialized');
    this.setupVRListeners();
  },
  
  // Setup VR mode detection
  setupVRListeners() {
    const scene = document.querySelector('a-scene');
    
    if (scene) {
      scene.addEventListener('enter-vr', () => {
        console.log('🥽 Entered VR mode');
        this.isVRMode = true;
        this.switchToVRMode();
      });
      
      scene.addEventListener('exit-vr', () => {
        console.log('👋 Exited VR mode');
        this.isVRMode = false;
        this.switchToDesktopMode();
      });
    }
  },
  
  // Switch to VR mode UI
  switchToVRMode() {
    // Hide 2D HTML popup
    document.getElementById('question-popup').style.display = 'none';
    document.getElementById('question-icon').style.display = 'none';
    
    // Show 3D VR panel
    const vrPanel = document.getElementById('vr-question-panel');
    if (vrPanel && !this.isPanelMinimized) {
      vrPanel.setAttribute('visible', 'true');
    }
    
    // Update VR panel with current question
    if (this.currentQuestion) {
      this.updateVRPanel();
    }
    
    // Setup VR click handlers
    this.setupVRClickHandlers();
  },
  
  // Switch to desktop mode UI
  switchToDesktopMode() {
    // Show 2D HTML popup
    if (!this.isPanelMinimized) {
      document.getElementById('question-popup').classList.add('visible');
      document.getElementById('question-popup').classList.remove('minimized');
    } else {
      document.getElementById('question-icon').style.display = 'flex';
    }
    
    // Hide 3D VR panel
    const vrPanel = document.getElementById('vr-question-panel');
    if (vrPanel) {
      vrPanel.setAttribute('visible', 'false');
    }
    const vrIcon = document.getElementById('vr-question-icon');
    if (vrIcon) {
      vrIcon.setAttribute('visible', 'false');
    }
  },
  
  // Setup click handlers for VR answer buttons
  setupVRClickHandlers() {
    // Answer buttons
    for (let i = 0; i < 4; i++) {
      const box = document.getElementById(`vr-option-${i}`);
      if (box && !box.hasAttribute('data-click-setup')) {
        box.setAttribute('data-click-setup', 'true');
        box.addEventListener('click', () => {
          if (!this.answeredCorrectly && this.currentQuestion) {
            this.checkAnswer(this.currentQuestion.answers[i], null, i);
          }
        });
      }
    }
    
    // Minimize button
    const minBtn = document.getElementById('vr-minimize-btn');
    if (minBtn && !minBtn.hasAttribute('data-click-setup')) {
      minBtn.setAttribute('data-click-setup', 'true');
      minBtn.addEventListener('click', () => {
        this.minimizeVRPanel();
      });
    }
    
    // Restore icon
    const icon = document.getElementById('vr-question-icon');
    if (icon && !icon.hasAttribute('data-click-setup')) {
      icon.setAttribute('data-click-setup', 'true');
      icon.addEventListener('click', () => {
        this.maximizeVRPanel();
      });
    }
  },
  
  // Minimize VR panel
  minimizeVRPanel() {
    this.isPanelMinimized = true;
    const vrPanel = document.getElementById('vr-question-panel');
    const vrIcon = document.getElementById('vr-question-icon');
    
    if (vrPanel) vrPanel.setAttribute('visible', 'false');
    if (vrIcon) vrIcon.setAttribute('visible', 'true');
    
    console.log('➖ VR panel minimized');
  },
  
  // Maximize VR panel
  maximizeVRPanel() {
    this.isPanelMinimized = false;
    const vrPanel = document.getElementById('vr-question-panel');
    const vrIcon = document.getElementById('vr-question-icon');
    
    if (vrPanel) vrPanel.setAttribute('visible', 'true');
    if (vrIcon) vrIcon.setAttribute('visible', 'false');
    
    console.log('➕ VR panel restored');
  },
  
  // Update VR panel with question data
  updateVRPanel() {
    if (!this.currentQuestion) return;
    
    // Update score and count
    const scoreText = document.getElementById('vr-score-text');
    if (scoreText) {
      scoreText.setAttribute('value', `Score: ${this.score} | Question: ${this.currentQuestionIndex + 1}/${this.totalQuestions}`);
    }
    
    // Update category
    const categoryText = document.getElementById('vr-category-text');
    if (categoryText) {
      categoryText.setAttribute('value', this.currentQuestion.category);
    }
    
    // Update question
    const questionText = document.getElementById('vr-question-text');
    if (questionText) {
      questionText.setAttribute('value', this.currentQuestion.question);
    }
    
    // Update answers
    for (let i = 0; i < 4; i++) {
      const optionText = document.getElementById(`vr-option-text-${i}`);
      const optionBox = document.getElementById(`vr-option-${i}`);
      
      if (optionText && this.currentQuestion.answers[i]) {
        const letter = String.fromCharCode(65 + i); // A, B, C, D
        optionText.setAttribute('value', `${letter}. ${this.currentQuestion.answers[i]}`);
      }
      
      // Reset color
      if (optionBox) {
        optionBox.setAttribute('color', '#2196F3');
      }
    }
  },
  
  // Load questions from API or generate custom ones
  async loadQuestions() {
    console.log('📚 Loading questions...');
    
    try {
      // Try Open Trivia DB API
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
  
  // Generate custom math questions
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
    
    // Update 2D HTML UI
    document.getElementById('question-count').textContent = (this.currentQuestionIndex + 1);
    document.getElementById('category-badge').textContent = this.currentQuestion.category;
    document.getElementById('question-text').textContent = this.currentQuestion.question;
    
    // Create answer buttons
    const container = document.getElementById('answers-container');
    container.innerHTML = '';
    
    this.currentQuestion.answers.forEach((answer, index) => {
      const button = document.createElement('button');
      button.className = 'answer-button';
      button.textContent = `${String.fromCharCode(65 + index)}. ${answer}`;
      button.onclick = () => this.checkAnswer(answer, button, index);
      container.appendChild(button);
    });
    
    // Hide next button
    document.getElementById('next-button').style.display = 'none';
    
    // Update VR panel too
    this.updateVRPanel();
    
    console.log(`❓ Question ${this.currentQuestionIndex + 1}: ${this.currentQuestion.question}`);
  },
  
  // Check answer - allows multiple attempts
  checkAnswer(selectedAnswer, button, answerIndex) {
    if (this.answeredCorrectly) return; // Already answered correctly
    
    this.attempts++;
    const isCorrect = selectedAnswer === this.currentQuestion.correctAnswer;
    
    if (isCorrect) {
      console.log('✅ Correct!');
      
      // Visual feedback for 2D button
      if (button) {
        button.classList.add('correct');
      }
      
      // Visual feedback for VR box
      if (answerIndex !== undefined) {
        const vrBox = document.getElementById(`vr-option-${answerIndex}`);
        if (vrBox) {
          vrBox.setAttribute('color', '#4CAF50');
          vrBox.setAttribute('animation', 'property: scale; to: 1.2 1.2 1.2; dur: 200; dir: alternate; loop: 2');
        }
      }
      
      // Award points only on first attempt
      if (this.attempts === 1) {
        this.score += 10;
        console.log('🎉 +10 points! (First try)');
      } else {
        console.log('✓ Correct, but no points (not first try)');
      }
      
      this.answeredCorrectly = true;
      
      // Update score display (both 2D and VR)
      document.getElementById('score').textContent = this.score;
      this.updateVRPanel(); // Update VR score
      
      // Disable all 2D buttons
      const buttons = document.querySelectorAll('.answer-button');
      buttons.forEach(btn => btn.disabled = true);
      
      // Show next button
      document.getElementById('next-button').style.display = 'block';
      
      // Auto-advance after 2 seconds
      setTimeout(() => {
        if (this.answeredCorrectly) {
          this.nextQuestion();
        }
      }, 2000);
      
    } else {
      console.log('❌ Try again!');
      
      // Visual feedback for 2D button
      if (button) {
        button.classList.add('wrong');
        setTimeout(() => {
          button.classList.remove('wrong');
        }, 500);
      }
      
      // Visual feedback for VR box
      if (answerIndex !== undefined) {
        const vrBox = document.getElementById(`vr-option-${answerIndex}`);
        if (vrBox) {
          vrBox.setAttribute('color', '#f44336');
          vrBox.setAttribute('animation', 'property: position; to: ' + 
            (vrBox.getAttribute('position').x + 0.1) + ' ' + 
            vrBox.getAttribute('position').y + ' ' + 
            vrBox.getAttribute('position').z + '; dur: 100; dir: alternate; loop: 3');
          
          // Reset color after animation
          setTimeout(() => {
            vrBox.setAttribute('color', '#2196F3');
          }, 600);
        }
      }
      
      // Don't disable - user can try again!
    }
  },
  
  // Move to next question
  nextQuestion() {
    this.currentQuestionIndex++;
    this.showQuestion();
  },
  
  // End game
  endGame() {
    document.getElementById('category-badge').textContent = 'Game Complete! 🎉';
    document.getElementById('question-text').innerHTML = `
      <strong>Congratulations!</strong><br><br>
      Final Score: ${this.score} / ${this.totalQuestions * 10}<br>
      You answered all ${this.totalQuestions} questions!<br><br>
      <em>Close this popup to explore the environment more!</em>
    `;
    
    document.getElementById('answers-container').innerHTML = '';
    document.getElementById('next-button').style.display = 'none';
    
    console.log('🎉 Game complete!');
  }
};

// =============================================
// UI Functions
// =============================================

function enterGame() {
  // Hide entrance screen
  document.getElementById('entrance-screen').classList.add('hidden');
  
  // Load questions
  game.loadQuestions().then(() => {
    // Show popup after 1 second
    setTimeout(() => {
      // Show 2D popup for desktop
      document.getElementById('question-popup').classList.add('visible');
      
      // If already in VR mode, show VR panel instead
      if (game.isVRMode) {
        document.getElementById('question-popup').style.display = 'none';
        document.getElementById('vr-question-panel').setAttribute('visible', 'true');
      }
      
      game.showQuestion();
    }, 1000);
  });
  
  console.log('🎮 Game started!');
}

function minimizePopup() {
  game.isPanelMinimized = true;
  
  if (game.isVRMode) {
    game.minimizeVRPanel();
  } else {
    const popup = document.getElementById('question-popup');
    const icon = document.getElementById('question-icon');
    
    popup.classList.add('minimized');
    icon.classList.add('visible');
  }
  
  console.log('➖ Popup minimized - explore the environment!');
}

function maximizePopup() {
  game.isPanelMinimized = false;
  
  if (game.isVRMode) {
    game.maximizeVRPanel();
  } else {
    const popup = document.getElementById('question-popup');
    const icon = document.getElementById('question-icon');
    
    popup.classList.remove('minimized');
    icon.classList.remove('visible');
  }
  
  console.log('➕ Popup restored - continue where you left off!');
}

function nextQuestion() {
  game.nextQuestion();
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  game.init();
});

// VR Controller Support
document.addEventListener('DOMContentLoaded', () => {
  const scene = document.querySelector('a-scene');
  
  if (scene) {
    scene.addEventListener('loaded', () => {
      console.log('🥽 VR Scene loaded');
      
      // Add VR controller support
      const rig = document.getElementById('rig');
      
      if (rig) {
        // Listen for VR mode changes
        scene.addEventListener('enter-vr', () => {
          console.log('🥽 Entered VR mode - use joystick to move!');
        });
        
        scene.addEventListener('exit-vr', () => {
          console.log('👋 Exited VR mode');
        });
      }
    });
  }
});
