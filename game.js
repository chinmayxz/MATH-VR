// =============================================
// Math VR Game - Unified HTML Popup for Both Modes
// =============================================

const game = {
  score: 0,
  currentQuestionIndex: 0,
  totalQuestions: 10,
  questions: [],
  currentQuestion: null,
  attempts: 0,
  answeredCorrectly: false,
  
  // Initialize game
  init() {
    console.log('🎮 Math VR Initialized');
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
    
    // Update HTML popup
    document.getElementById('question-count').textContent = (this.currentQuestionIndex + 1);
    document.getElementById('category-badge').textContent = this.currentQuestion.category;
    document.getElementById('question-text').textContent = this.currentQuestion.question;
    
    const container = document.getElementById('answers-container');
    container.innerHTML = '';
    
    this.currentQuestion.answers.forEach((answer, index) => {
      const button = document.createElement('button');
      button.className = 'answer-button';
      button.textContent = `${String.fromCharCode(65 + index)}. ${answer}`;
      button.onclick = () => this.checkAnswer(answer, button);
      container.appendChild(button);
    });
    
    document.getElementById('next-button').style.display = 'none';
    
    console.log(`❓ Question ${this.currentQuestionIndex + 1}: ${this.currentQuestion.question}`);
  },
  
  // Check answer
  checkAnswer(selectedAnswer, button) {
    if (this.answeredCorrectly) return;
    
    this.attempts++;
    const isCorrect = selectedAnswer === this.currentQuestion.correctAnswer;
    
    if (isCorrect) {
      console.log('✅ Correct!');
      
      if (button) {
        button.classList.add('correct');
      }
      
      // Award points (only first try)
      if (this.attempts === 1) {
        this.score += 10;
        console.log('🎉 +10 points!');
      } else {
        console.log('✓ Correct, but no points');
      }
      
      this.answeredCorrectly = true;
      
      // Update score
      document.getElementById('score').textContent = this.score;
      
      // Disable buttons
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
      
      if (button) {
        button.classList.add('wrong');
        setTimeout(() => button.classList.remove('wrong'), 500);
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
      game.showQuestion();
    }, 500);
  });
  
  console.log('🎮 Game started!');
}

function minimizePopup() {
  const popup = document.getElementById('question-popup');
  const icon = document.getElementById('question-icon');
  popup.classList.add('minimized');
  icon.classList.add('visible');
}

function maximizePopup() {
  const popup = document.getElementById('question-popup');
  const icon = document.getElementById('question-icon');
  popup.classList.remove('minimized');
  icon.classList.remove('visible');
}

function nextQuestion() {
  game.nextQuestion();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  game.init();
});
