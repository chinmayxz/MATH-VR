# 🧮 Math VR - Immersive Virtual Reality Math Trivia Game

![Version](https://img.shields.io/badge/version-2.0-blue)
![A-Frame](https://img.shields.io/badge/A--Frame-1.5.0-orange)
![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 Overview

**Math VR** is an immersive virtual reality educational game that transforms math learning into an exciting adventure! Explore beautiful 3D environments while solving engaging math questions in a relaxing, stress-free setting. Perfect for students, educators, and anyone looking to sharpen their mental math skills!

## ✨ Features

### 🎮 Core Features
- **🕶️ Full VR Support**: Compatible with VR headsets (Oculus Quest, HTC Vive, etc.) and desktop browsers
- **🌍 Multiple Environments**: 
  - 🏔️ Boulder Mountains - Serene mountain landscapes
  - 🏝️ Hawaii Beach - Tropical paradise setting
  - 🌌 Outer Space - Cosmic exploration
  - 🌲 Forest - Dense woodland atmosphere
- **🧮 Dynamic Math Questions**: Questions from API + custom-generated problems
- **🚶 Free Movement**: Walk around and explore environments using WASD controls
- **📊 Score System**: Track your progress with points and streak bonuses
- **🎯 Interactive 3D UI**: Click on answer boxes directly in the virtual world

### 🎓 Educational Features
- Multiple-choice math questions
- Various difficulty levels
- Topics include:
  - Basic arithmetic (addition, subtraction, multiplication, division)
  - Squares and powers
  - Percentages
  - Number sequences
  - Word problems
  - And more!

### 🎨 Visual Features
- Beautiful procedurally generated environments
- Dynamic lighting and fog effects
- Particle systems (stars, snow, etc.)
- Smooth animations and transitions
- Modern, clean UI design

## 🚀 Quick Start

### Option 1: Direct File Access
1. **Download/Clone** this repository
2. **Open** `index.html` in any modern web browser
3. **Click** "Start Playing!" button
4. **Enjoy** learning math in VR!

### Option 2: Local Server (Recommended)
For better performance and full features:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## 🎮 How to Play

### Desktop Controls
- **WASD** or **Arrow Keys**: Move around
- **Mouse**: Look around (click and drag)
- **Left Click**: Select answers
- **Esc**: Exit VR mode

### VR Controls
- **Headset Movement**: Look around naturally
- **Controller Trigger**: Select answers
- **Joystick**: Walk around the environment

### Gameplay Flow
1. **Launch** the game from `index.html` or directly open `game.html`
2. **Choose** your preferred environment (Mountains, Beach, Space, or Forest)
3. **Click** "Start Math Challenge" to begin
4. **Read** the question displayed in the 3D panel
5. **Select** your answer by clicking on the colored boxes
6. **Earn Points**:
   - ✅ Correct answer: +10 points (+ streak bonus)
   - ❌ Wrong answer: Try again! (streak resets)
7. **Complete** all questions to see your final score
8. **Replay** anytime to improve your score!

## 📁 Project Structure

```
MATH VR/
│
├── index.html           # Landing page with game intro
├── game.html           # Main VR game (NEW - Primary game file)
├── game.js             # Game logic and API integration (NEW)
│
├── boulder.html        # Individual Boulder environment
├── boulder.js          # Boulder-specific scripts
│
├── hawaii.html         # Individual Hawaii environment
├── hawaii.js           # Hawaii-specific scripts
│
├── space.html          # Individual Space environment
├── space.js            # Space-specific scripts
│
├── trivia.html         # Classic 2D trivia mode
├── trivia.js           # Trivia game logic
│
├── leaderboard.html    # Leaderboard display
├── leaderboard.js      # Leaderboard logic
│
├── firebase-config.js  # Firebase configuration (optional)
├── style.css           # Global styles
├── sounds/             # Audio assets
│   └── waves.mp3       # Ocean wave sounds
│
└── README.md           # This file
```

## 🛠️ Technology Stack

- **[A-Frame](https://aframe.io/)** (v1.5.0) - WebVR framework
- **[A-Frame Environment Component](https://github.com/supermedium/aframe-environment-component)** - Procedural environments
- **[A-Frame Particle System](https://github.com/IdeaSpaceVR/aframe-particle-system-component)** - Particle effects
- **Vanilla JavaScript** - Game logic
- **HTML5 & CSS3** - UI and styling
- **[Open Trivia Database API](https://opentdb.com/)** - Math questions source

## 🔧 Configuration

### Using Your Own Math Questions API

Edit `game.js` and modify the API endpoints:

```javascript
apis: {
  opentdb: 'https://opentdb.com/api.php?amount=10&category=19&type=multiple',
  // Add your custom API here
  custom: 'YOUR_API_ENDPOINT_HERE'
}
```

### Customizing Environments

In `game.js`, modify the `setEnvironment()` function:

```javascript
case 'custom':
  environment.setAttribute('environment', {
    preset: 'yourPreset',
    ground: 'hills',
    groundColor: '#yourColor',
    // ... more options
  });
  break;
```

Available presets: `default`, `contact`, `egypt`, `checkerboard`, `forest`, `goaland`, `yavapai`, `goldmine`, `threetowers`, `poison`, `arches`, `tron`, `japan`, `dream`, `volcano`, `starry`, `osiris`

## 📊 API Integration

The game uses the **Open Trivia Database** for math questions:
- Category: Science & Mathematics (ID: 19)
- Type: Multiple Choice
- Amount: 10 questions per session

If the API is unavailable, the game automatically generates custom math questions locally!

## 🎯 Educational Use Cases

- **Classroom Learning**: Engage students with immersive math practice
- **Homework Alternative**: Make studying fun and interactive
- **Tutoring Sessions**: Supplement traditional teaching methods
- **Self-Paced Learning**: Practice at your own speed in a stress-free environment
- **Math Competitions**: Host friendly competitions with the scoring system
- **Special Education**: Provide an engaging alternative learning method

## 🌐 Browser Compatibility

### Desktop Browsers (Recommended)
- ✅ Chrome/Edge (v90+)
- ✅ Firefox (v85+)
- ✅ Safari (v14+)
- ✅ Opera (v75+)

### VR Headsets
- ✅ Meta Quest / Quest 2 / Quest 3
- ✅ HTC Vive
- ✅ Valve Index
- ✅ Windows Mixed Reality
- ✅ Any WebXR-compatible headset

### Mobile Devices
- ⚠️ Limited support - better on desktop/VR
- Works with Google Cardboard

## 🔮 Future Enhancements

- [ ] Firebase authentication and leaderboard integration
- [ ] Multiplayer mode for competitive learning
- [ ] More environment themes (underwater, desert, city)
- [ ] Difficulty level selection
- [ ] Timed challenge mode
- [ ] Achievement system
- [ ] Sound effects and background music
- [ ] Customizable avatars
- [ ] Teacher dashboard for tracking student progress
- [ ] Custom question sets upload

## 🐛 Known Issues & Solutions

### Issue: "Cannot read property 'setAttribute' of null"
**Solution**: Ensure all HTML elements are loaded before JavaScript runs. The game includes proper initialization checks.

### Issue: Environment not loading
**Solution**: Check your internet connection (environment component loads from CDN). The game includes a default fallback.

### Issue: VR button not appearing
**Solution**: Your browser may not support WebXR. Try Chrome or Firefox on desktop, or use the built-in browser on your VR headset.

### Issue: Questions not loading
**Solution**: The game automatically falls back to custom-generated questions if the API fails.

## 📝 License

MIT License - Feel free to use, modify, and distribute this project!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Developer Notes

### Adding New Question Types

In `game.js`, add a new case to `generateMathQuestions()`:

```javascript
case 5: // Your new type
  // Your question generation logic
  question = "Your question?";
  correctAnswer = 42;
  answers = this.generateAnswerOptions(correctAnswer);
  break;
```

### Adding New Environments

1. Add a new case in the `setEnvironment()` function
2. Configure the environment component attributes
3. Add a button in `game.html` to select it

## 📧 Support

For questions, issues, or suggestions:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

## 🎉 Credits

- **A-Frame Team** - For the amazing WebVR framework
- **Open Trivia Database** - For providing free trivia questions
- **A-Frame Community** - For environment and particle system components

---

## 🚀 Getting Started Right Now

Ready to play? Just:
1. Open `index.html` in your browser
2. Click "Start Playing!"
3. Begin your math adventure!

**Or jump straight in:**
- Open `game.html` directly for immediate gameplay

---

*Made with ❤️ for math learners everywhere!*

🧮 **Learn Math. Explore Worlds. Have Fun!** 🌍
