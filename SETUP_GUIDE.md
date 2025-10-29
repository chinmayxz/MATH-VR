# 🚀 Math VR - Quick Setup Guide

## ⚡ Quick Start (3 Easy Steps)

### 1️⃣ Open the Game
Simply **double-click** on `index.html` to open it in your default web browser!

### 2️⃣ Click "Start Playing"
On the landing page, click the big green **"🎮 Start Playing!"** button.

### 3️⃣ Start Learning!
You're now in the VR world! Click **"Start Math Challenge"** to begin answering questions.

---

## 🎮 Complete Setup Instructions

### For Desktop Users (No VR Headset)

#### Windows
1. Navigate to the project folder
2. Right-click on `index.html`
3. Select "Open with" → Your preferred browser (Chrome, Firefox, Edge)
4. Click "Start Playing!" button
5. Enjoy!

#### Mac
1. Double-click `index.html` 
2. It will open in Safari (or your default browser)
3. Click "Start Playing!" button
4. Have fun!

#### Linux
```bash
# Using default browser
xdg-open index.html

# Or using a specific browser
firefox index.html
google-chrome index.html
```

---

### For VR Headset Users

#### Meta Quest / Quest 2 / Quest 3

**Method 1: Local Network (Recommended)**

1. **On Your Computer:**
   ```bash
   # Start a local web server
   # Using Python (if installed):
   python -m http.server 8000
   
   # OR using Node.js (if installed):
   npx http-server -p 8000
   
   # OR using PHP (if installed):
   php -S localhost:8000
   ```

2. **Find Your Computer's IP Address:**
   - Windows: Open Command Prompt → type `ipconfig` → look for IPv4 Address
   - Mac/Linux: Open Terminal → type `ifconfig` or `ip addr` → look for inet address

3. **On Your Quest Headset:**
   - Open the browser
   - Navigate to: `http://YOUR_COMPUTER_IP:8000`
   - Example: `http://192.168.1.100:8000`
   - Click "Start Playing!"
   - Click the VR button in the bottom right

**Method 2: Upload to Web Host**

1. Upload all files to any web hosting service (GitHub Pages, Netlify, Vercel, etc.)
2. Access the URL from your Quest browser
3. Click VR button to enter VR mode

#### Other VR Headsets (HTC Vive, Valve Index, etc.)

1. Open the game in a WebXR-compatible browser (Chrome or Firefox)
2. Click "Start Playing!"
3. Click the VR button (appears when headset is detected)
4. Put on your headset and enjoy!

---

## 🎯 Game Features & Controls

### Desktop Controls
| Control | Action |
|---------|--------|
| **W, A, S, D** | Move forward, left, back, right |
| **Arrow Keys** | Alternative movement controls |
| **Mouse Movement** | Look around |
| **Left Click** | Select answers / interact |
| **ESC** | Exit fullscreen/VR |

### VR Controls
| Control | Action |
|---------|--------|
| **Head Movement** | Look around naturally |
| **Right Controller** | Point at answers |
| **Trigger** | Select answers |
| **Thumbstick** | Move around environment |

---

## 🌍 Environment Selection

Choose from 4 beautiful environments:

### 🏔️ Boulder Mountains
- Scenic mountain landscape
- Rolling hills and valleys
- Perfect for focused learning
- Calming nature atmosphere

### 🏝️ Hawaii Beach
- Tropical beach paradise
- Ocean views
- Relaxing vibes
- Sandy terrain

### 🌌 Outer Space
- Cosmic environment
- Floating stars and particles
- Zero-gravity feel
- Space exploration theme

### 🌲 Forest
- Dense woodland setting
- Green canopy above
- Nature immersion
- Tranquil forest floor

---

## 📚 Question Types You'll Encounter

- ➕ **Addition**: Simple to complex addition problems
- ➖ **Subtraction**: Mental math subtraction
- ✖️ **Multiplication**: Times tables and beyond
- ➗ **Division**: Division with whole number answers
- ⬛ **Squares**: Calculate squared numbers
- 💯 **Percentages**: Percentage calculations
- 🔢 **Sequences**: Number pattern recognition
- 📝 **Word Problems**: Real-world math applications

---

## 🏆 Scoring System

- **Base Score**: 10 points per correct answer
- **Streak Bonus**: +2 points per answer in your streak
  - Example: 3rd correct answer in a row = 10 + (3 × 2) = 16 points!
- **Wrong Answer**: Streak resets to 0, no points deducted
- **Strategy**: Answer quickly and accurately to build streaks!

---

## ⚙️ Troubleshooting

### Problem: Game won't load / White screen
**Solution:**
- Check your internet connection (game loads resources from CDN)
- Try a different browser (Chrome or Firefox recommended)
- Clear browser cache and reload

### Problem: VR button doesn't appear
**Solution:**
- Your browser may not support WebXR
- Try Chrome or Firefox (latest versions)
- On Quest: Use the built-in browser
- Ensure your VR headset drivers are up to date

### Problem: Can't move around
**Solution:**
- Make sure you've clicked inside the game window first
- Try WASD keys instead of arrow keys (or vice versa)
- In VR: Use the thumbstick on your controller

### Problem: Questions not loading
**Solution:**
- The game uses Open Trivia DB API - if it's down, custom questions are generated
- Check browser console (F12) for error messages
- Ensure JavaScript is enabled in your browser

### Problem: Low performance / Lag
**Solution:**
- Close other browser tabs
- Lower graphics quality: Try the Space environment (fewer objects)
- Update your graphics drivers
- Use a desktop browser instead of mobile

### Problem: Audio not working
**Solution:**
- Currently, the main game doesn't require audio
- If using Hawaii.html, ensure `sounds/waves.mp3` exists
- Check browser audio permissions

---

## 🔧 Advanced Configuration

### Running on a Local Server

For the best experience, especially for VR:

**Python 3:**
```bash
cd "C:\Users\chinm\Desktop\MATH VR"
python -m http.server 8000
```

**Node.js:**
```bash
cd "C:\Users\chinm\Desktop\MATH VR"
npx http-server -p 8000
```

Then visit: `http://localhost:8000`

### Customizing the Game

#### Change Number of Questions
Edit `game.js`, line ~56:
```javascript
opentdb: 'https://opentdb.com/api.php?amount=20&category=19&type=multiple',
// Change amount=10 to amount=20 (or any number up to 50)
```

#### Change Difficulty
Add difficulty parameter:
```javascript
opentdb: 'https://opentdb.com/api.php?amount=10&category=19&difficulty=easy&type=multiple',
// Options: easy, medium, hard
```

#### Modify Score Values
Edit `game.js`, line ~359:
```javascript
this.score += 20 + (this.streak * 5); // Changed from 10 and 2
```

---

## 📱 Mobile Support

The game works on mobile browsers, but with limitations:
- Touch to look around
- On-screen controls appear automatically
- Performance may vary
- **Best on tablets**

### iOS (iPhone/iPad)
- Open Safari
- Navigate to the game URL or open `index.html`
- Add to Home Screen for app-like experience

### Android
- Open Chrome
- Navigate to the game URL or open `index.html`
- Tap "Add to Home Screen"

---

## 🌐 Hosting the Game Online

### GitHub Pages (Free!)

1. Create a GitHub account
2. Create a new repository
3. Upload all game files
4. Go to Settings → Pages
5. Select branch: `main` → Save
6. Your game will be live at: `https://yourusername.github.io/repository-name`

### Other Options
- **Netlify**: Drag and drop your folder
- **Vercel**: Import from GitHub
- **Firebase Hosting**: `firebase deploy`

---

## 🎓 Classroom Usage

### For Teachers

**Setup Tips:**
1. Host the game on your school's web server
2. Or use GitHub Pages for easy access
3. Students can access via web browser - no downloads needed!

**Integration Ideas:**
- **Warm-up Activity**: 5 minutes at start of class
- **Rewards**: Let students play after completing work
- **Competitions**: Who can get the highest score?
- **Homework**: Assign 10 questions as nightly practice

**Accessibility:**
- Works on school Chromebooks
- No installation required
- Safe - all client-side code
- Educational and engaging

---

## 💡 Tips for Best Experience

### Desktop
1. **Fullscreen**: Press F11 for immersive experience
2. **Quiet Environment**: Better focus for math problems
3. **Good Lighting**: Easier to read questions
4. **Comfortable Position**: You might be playing for a while!

### VR
1. **Clear Play Space**: Ensure you have room to move
2. **Good WiFi**: Important if streaming from computer
3. **Charged Controllers**: Don't let them die mid-game!
4. **Take Breaks**: Rest every 15-20 minutes

---

## 📊 Performance Optimization

If the game is running slowly:

1. **Choose simpler environments:**
   - Space (least demanding)
   - Boulder (medium)
   - Forest/Hawaii (most demanding)

2. **Close other applications**

3. **Update browser:**
   - Chrome: `chrome://settings/help`
   - Firefox: `Menu → Help → About Firefox`

4. **Check hardware acceleration:**
   - Chrome: `chrome://settings` → Advanced → System
   - Enable "Use hardware acceleration when available"

---

## 🆘 Getting Help

### In This Repository
- Read the main `README.md`
- Check `SETUP_GUIDE.md` (this file)
- Review code comments in `game.js`

### Online Resources
- [A-Frame Documentation](https://aframe.io/docs/)
- [WebXR Device API](https://www.w3.org/TR/webxr/)
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)

---

## ✅ Verification Checklist

Before you start, make sure you have:
- [ ] All project files in one folder
- [ ] Modern web browser installed
- [ ] Internet connection (for loading libraries)
- [ ] JavaScript enabled in browser
- [ ] (Optional) VR headset set up and connected

---

## 🎉 You're Ready!

Everything set up? Great! 

**Click on `index.html` and start your math adventure!**

Enjoy learning math in virtual reality! 🧮🌍✨

---

*Questions? Issues? Check the main README.md or open an issue on GitHub!*

