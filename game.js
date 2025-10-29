// =============================================
// Math VR Game - Complete Game Logic
// =============================================

const game = {
  score: 0,
  streak: 0,
  questions: [],
  currentQuestionIndex: 0,
  currentQuestion: null,
  answeredCorrectly: false,
  totalQuestions: 0,
  
  // API endpoints for math questions
  apis: {
    // Open Trivia DB - Science & Mathematics
    opentdb: 'https://opentdb.com/api.php?amount=10&category=19&type=multiple',
    // NumbersAPI for interesting math facts (backup)
    numbersapi: 'http://numbersapi.com/random/math?json',
    // We'll also generate our own math questions as fallback
  },
  
  // Initialize game
  init() {
    console.log('🎮 Initializing Math VR Game...');
    
    // Hide loading screen after scene loads
    const scene = document.querySelector('a-scene');
    scene.addEventListener('loaded', () => {
      setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
      }, 1000);
    });
    
    // Set up click handlers for answer boxes
    this.setupAnswerHandlers();
    
    // Set default environment
    this.setEnvironment('boulder');
    
    console.log('✅ Game initialized!');
  },
  
  // Set up click handlers for answer options
  setupAnswerHandlers() {
    for (let i = 0; i < 4; i++) {
      const box = document.getElementById(`option-${i}`);
      if (box) {
        box.addEventListener('click', () => {
          this.checkAnswer(i);
        });
      }
    }
  },
  
  // Start trivia game
  async startTrivia() {
    console.log('🎯 Starting trivia...');
    
    // Hide welcome panel
    const welcomePanel = document.getElementById('welcome-panel');
    if (welcomePanel) welcomePanel.setAttribute('visible', 'false');
    
    // Show question panel
    const questionPanel = document.getElementById('question-panel');
    if (questionPanel) questionPanel.setAttribute('visible', 'true');
    
    // Hide start button, show UI
    document.getElementById('start-btn').classList.add('hide');
    
    // Reset game state
    this.score = 0;
    this.streak = 0;
    this.currentQuestionIndex = 0;
    this.totalQuestions = 0;
    this.updateScoreDisplay();
    
    // Load questions
    await this.loadQuestions();
    
    // Show first question
    this.showQuestion();
  },
  
  // Load questions from API or generate them
  async loadQuestions() {
    console.log('📚 Loading questions...');
    
    try {
      // Try to load from Open Trivia DB (Math & Science)
      const response = await fetch(this.apis.opentdb);
      const data = await response.json();
      
      if (data.response_code === 0 && data.results.length > 0) {
        this.questions = data.results.map(q => this.formatAPIQuestion(q));
        console.log(`✅ Loaded ${this.questions.length} questions from API`);
      } else {
        throw new Error('API returned no results');
      }
    } catch (error) {
      console.log('⚠️ API failed, generating custom math questions...');
      this.questions = this.generateMathQuestions(10);
    }
  },
  
  // Format API question to our format
  formatAPIQuestion(apiQuestion) {
    // Decode HTML entities
    const decodeHTML = (html) => {
      const txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
    };
    
    const incorrect = apiQuestion.incorrect_answers.map(a => decodeHTML(a));
    const correct = decodeHTML(apiQuestion.correct_answer);
    const allAnswers = [...incorrect, correct];
    
    // Shuffle answers
    for (let i = allAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
    }
    
    return {
      question: decodeHTML(apiQuestion.question),
      category: decodeHTML(apiQuestion.category),
      answers: allAnswers,
      correctAnswer: correct,
      difficulty: apiQuestion.difficulty
    };
  },
  
  // Generate custom math questions
  generateMathQuestions(count) {
    const questions = [];
    const operations = ['+', '-', '×', '÷'];
    const categories = [
      'Basic Arithmetic',
      'Mental Math',
      'Quick Calculation',
      'Number Sense',
      'Math IQ Challenge'
    ];
    
    for (let i = 0; i < count; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      let question, correctAnswer, answers;
      
      // Generate different types of questions
      const questionType = Math.floor(Math.random() * 5);
      
      switch(questionType) {
        case 0: // Basic arithmetic
          const a = Math.floor(Math.random() * 20) + 1;
          const b = Math.floor(Math.random() * 20) + 1;
          const op = operations[Math.floor(Math.random() * operations.length)];
          
          switch(op) {
            case '+':
              correctAnswer = a + b;
              question = `What is ${a} + ${b}?`;
              break;
            case '-':
              correctAnswer = a - b;
              question = `What is ${a} - ${b}?`;
              break;
            case '×':
              correctAnswer = a * b;
              question = `What is ${a} × ${b}?`;
              break;
            case '÷':
              const dividend = a * b;
              correctAnswer = a;
              question = `What is ${dividend} ÷ ${b}?`;
              break;
          }
          
          answers = this.generateAnswerOptions(correctAnswer);
          break;
          
        case 1: // Squares
          const num = Math.floor(Math.random() * 15) + 2;
          correctAnswer = num * num;
          question = `What is ${num}² (${num} squared)?`;
          answers = this.generateAnswerOptions(correctAnswer);
          break;
          
        case 2: // Percentage
          const whole = [20, 25, 40, 50, 80, 100][Math.floor(Math.random() * 6)];
          const percent = [10, 20, 25, 50, 75][Math.floor(Math.random() * 5)];
          correctAnswer = (whole * percent) / 100;
          question = `What is ${percent}% of ${whole}?`;
          answers = this.generateAnswerOptions(correctAnswer);
          break;
          
        case 3: // Sequences
          const start = Math.floor(Math.random() * 10) + 1;
          const step = [2, 3, 5][Math.floor(Math.random() * 3)];
          const seq = [start, start + step, start + 2*step, start + 3*step];
          correctAnswer = start + 4*step;
          question = `What comes next in this sequence? ${seq.join(', ')}, ?`;
          answers = this.generateAnswerOptions(correctAnswer);
          break;
          
        case 4: // Word problems
          const speed = [30, 40, 50, 60][Math.floor(Math.random() * 4)];
          const time = [2, 3, 4][Math.floor(Math.random() * 3)];
          correctAnswer = speed * time;
          question = `A car travels at ${speed} km/h for ${time} hours. How far does it travel?`;
          answers = this.generateAnswerOptions(correctAnswer, 'km');
          break;
      }
      
      questions.push({
        question,
        category,
        answers,
        correctAnswer: correctAnswer.toString(),
        difficulty: 'medium'
      });
    }
    
    return questions;
  },
  
  // Generate plausible wrong answers
  generateAnswerOptions(correct, unit = '') {
    const correctStr = correct.toString() + (unit ? ' ' + unit : '');
    const options = [correctStr];
    
    // Generate 3 wrong answers
    const offsets = [-5, -2, 3, 5, 7, 10];
    while (options.length < 4) {
      const offset = offsets[Math.floor(Math.random() * offsets.length)];
      let wrong;
      
      if (Math.random() > 0.5) {
        wrong = correct + offset;
      } else {
        wrong = Math.floor(correct * (1 + (offset / 10)));
      }
      
      const wrongStr = wrong.toString() + (unit ? ' ' + unit : '');
      if (!options.includes(wrongStr) && wrong > 0) {
        options.push(wrongStr);
      }
    }
    
    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    
    return options;
  },
  
  // Show current question
  showQuestion() {
    if (this.currentQuestionIndex >= this.questions.length) {
      this.endGame();
      return;
    }
    
    this.currentQuestion = this.questions[this.currentQuestionIndex];
    this.answeredCorrectly = false;
    
    // Update question text
    const questionText = document.getElementById('question-text');
    const categoryText = document.getElementById('category-text');
    
    if (questionText) {
      questionText.setAttribute('value', this.currentQuestion.question);
    }
    
    if (categoryText) {
      categoryText.setAttribute('value', 
        `📚 ${this.currentQuestion.category} | Difficulty: ${this.currentQuestion.difficulty}`
      );
    }
    
    // Update answer options
    for (let i = 0; i < 4; i++) {
      const optionText = document.getElementById(`option-text-${i}`);
      const optionBox = document.getElementById(`option-${i}`);
      
      if (optionText && this.currentQuestion.answers[i]) {
        optionText.setAttribute('value', this.currentQuestion.answers[i]);
      }
      
      // Reset color
      if (optionBox) {
        optionBox.setAttribute('color', '#2196F3');
      }
    }
    
    console.log(`❓ Question ${this.currentQuestionIndex + 1}:`, this.currentQuestion.question);
  },
  
  // Check answer
  checkAnswer(index) {
    if (this.answeredCorrectly) return; // Already answered correctly
    
    const selectedAnswer = this.currentQuestion.answers[index];
    const isCorrect = selectedAnswer === this.currentQuestion.correctAnswer;
    const optionBox = document.getElementById(`option-${index}`);
    
    if (isCorrect) {
      console.log('✅ Correct!');
      
      // Visual feedback
      if (optionBox) {
        optionBox.setAttribute('color', '#4CAF50');
        
        // Animation
        optionBox.setAttribute('animation', 
          'property: scale; to: 1.2 1.2 1.2; dur: 200; dir: alternate; loop: 2'
        );
      }
      
      // Update score
      this.answeredCorrectly = true;
      this.score += 10 + (this.streak * 2);
      this.streak++;
      this.totalQuestions++;
      
      this.updateScoreDisplay();
      
      // Show next button
      document.getElementById('next-btn').classList.remove('hide');
      
      // Auto-advance after delay
      setTimeout(() => {
        this.nextQuestion();
      }, 2000);
      
    } else {
      console.log('❌ Incorrect');
      
      // Visual feedback
      if (optionBox) {
        optionBox.setAttribute('color', '#f44336');
        
        // Shake animation
        optionBox.setAttribute('animation', 
          'property: position; to: ' + optionBox.getAttribute('position').x + ' ' + 
          optionBox.getAttribute('position').y + ' 0.1; dur: 100; dir: alternate; loop: 3'
        );
        
        // Reset color after animation
        setTimeout(() => {
          if (optionBox) {
            optionBox.setAttribute('color', '#2196F3');
          }
        }, 600);
      }
      
      // Reset streak
      this.streak = 0;
      this.updateScoreDisplay();
    }
  },
  
  // Move to next question
  nextQuestion() {
    document.getElementById('next-btn').classList.add('hide');
    this.currentQuestionIndex++;
    this.showQuestion();
  },
  
  // Update score display
  updateScoreDisplay() {
    document.getElementById('score').textContent = this.score;
    document.getElementById('streak').textContent = this.streak;
    
    const vrScore = document.getElementById('vr-score');
    if (vrScore) {
      vrScore.setAttribute('value', 
        `Score: ${this.score} | Streak: ${this.streak}🔥`
      );
    }
  },
  
  // End game
  endGame() {
    console.log('🎉 Game Over!');
    
    const questionText = document.getElementById('question-text');
    const categoryText = document.getElementById('category-text');
    
    if (questionText) {
      questionText.setAttribute('value', 
        `🎉 Game Complete!\n\nFinal Score: ${this.score}\nQuestions Answered: ${this.totalQuestions}`
      );
    }
    
    if (categoryText) {
      categoryText.setAttribute('value', 
        `Great job! Click 'Start Math Challenge' to play again!`
      );
    }
    
    // Hide answer boxes
    for (let i = 0; i < 4; i++) {
      const box = document.getElementById(`option-${i}`);
      if (box) box.setAttribute('visible', 'false');
    }
    
    // Show start button again
    document.getElementById('start-btn').classList.remove('hide');
    document.getElementById('start-btn').textContent = '🔄 Play Again';
  },
  
  // Set environment
  setEnvironment(preset) {
    console.log(`🌍 Setting environment: ${preset}`);
    
    const environment = document.getElementById('environment');
    const sky = document.getElementById('main-sky');
    const scene = document.querySelector('a-scene');
    const particles = document.getElementById('particles');
    
    // Hide particles by default
    if (particles) particles.setAttribute('visible', 'false');
    
    // Reset answer boxes visibility
    for (let i = 0; i < 4; i++) {
      const box = document.getElementById(`option-${i}`);
      if (box) box.setAttribute('visible', 'true');
    }
    
    switch(preset) {
      case 'boulder':
        if (environment) {
          environment.setAttribute('visible', 'true');
          environment.setAttribute('environment', {
            preset: 'default',
            dressingAmount: 50,
            ground: 'hills',
            groundTexture: 'walkernoise',
            groundColor: '#5c4a3a',
            groundColor2: '#3a2f26',
            grid: 'none',
            playArea: 2,
            shadow: true,
            lighting: 'distant',
            lightPosition: {x: 0, y: 1, z: -0.2},
            fog: 0.5
          });
        }
        if (sky) sky.setAttribute('color', '#87CEEB');
        if (scene) {
          scene.setAttribute('fog', 'type: linear; color: #87CEEB; near: 30; far: 100');
        }
        break;
        
      case 'hawaii':
        if (environment) {
          environment.setAttribute('visible', 'true');
          environment.setAttribute('environment', {
            preset: 'yavapai',
            dressingAmount: 100,
            ground: 'flat',
            groundTexture: 'squares',
            groundColor: '#f4e4c1',
            groundColor2: '#e0d4b1',
            grid: 'none',
            playArea: 2,
            shadow: true,
            lighting: 'point',
            fog: 0.3
          });
        }
        if (sky) sky.setAttribute('color', '#87CEEB');
        if (scene) {
          scene.setAttribute('fog', 'type: linear; color: #87CEEB; near: 50; far: 150');
        }
        break;
        
      case 'space':
        if (environment) {
          environment.setAttribute('visible', 'false');
        }
        if (sky) sky.setAttribute('color', '#000010');
        if (scene) {
          scene.setAttribute('fog', 'type: linear; color: #000010; near: 50; far: 200');
        }
        // Add particle system for stars
        if (particles) {
          particles.setAttribute('visible', 'true');
          particles.setAttribute('particle-system', {
            preset: 'dust',
            particleCount: 2000,
            color: '#ffffff,#aaaaff',
            size: 0.8,
            opacity: 0.8
          });
        }
        break;
        
      case 'forest':
        if (environment) {
          environment.setAttribute('visible', 'true');
          environment.setAttribute('environment', {
            preset: 'forest',
            dressingAmount: 100,
            ground: 'hills',
            groundTexture: 'walkernoise',
            groundColor: '#2a4a2a',
            groundColor2: '#1a3a1a',
            grid: 'none',
            playArea: 2,
            shadow: true,
            lighting: 'distant',
            fog: 0.8
          });
        }
        if (sky) sky.setAttribute('color', '#5a7a5a');
        if (scene) {
          scene.setAttribute('fog', 'type: linear; color: #5a7a5a; near: 20; far: 80');
        }
        break;
    }
  }
};

// Initialize game when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => game.init());
} else {
  game.init();
}

// Export for use in HTML
window.game = game;

