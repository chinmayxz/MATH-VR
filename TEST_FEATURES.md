# ✅ Math VR - Feature Testing Checklist

## Testing the Game

Use this checklist to verify all features are working correctly.

---

## 🎯 Core Functionality Tests

### Landing Page (index.html)
- [ ] Page loads without errors
- [ ] All 4 feature cards display correctly
- [ ] "Start Playing!" button is visible and clickable
- [ ] Button hover effects work
- [ ] Animations play smoothly
- [ ] Links to secondary pages work

### Main Game (game.html)

#### Initial Load
- [ ] Loading screen appears
- [ ] Loading spinner animates
- [ ] Scene loads completely
- [ ] Loading screen fades out after scene loads
- [ ] UI overlay displays on left side
- [ ] Welcome panel visible in VR world

#### UI Elements
- [ ] Score displays "Score: 0 | Streak: 0"
- [ ] "Start Math Challenge" button visible
- [ ] All 4 environment buttons present
- [ ] Instructions panel visible
- [ ] All text is readable

#### Environment Switching
- [ ] **Boulder Mountains**: 
  - Sky changes to light blue
  - Hills/terrain appears
  - Brown/green ground colors
  - Fog effect visible
  
- [ ] **Hawaii Beach**:
  - Light blue sky
  - Flat sandy ground
  - Warm atmosphere
  - Different lighting
  
- [ ] **Outer Space**:
  - Dark/black background
  - Stars/particles appear
  - No ground visible
  - Floating feeling
  
- [ ] **Forest**:
  - Green tinted sky
  - Dense foliage
  - Trees visible
  - Atmospheric fog

#### Movement Controls (Desktop)
- [ ] W key moves forward
- [ ] S key moves backward
- [ ] A key moves left
- [ ] D key moves right
- [ ] Arrow keys also work for movement
- [ ] Mouse drag rotates view
- [ ] Camera stays at correct height
- [ ] Can explore the environment freely

---

## 🧮 Trivia Game Tests

### Starting the Game
- [ ] Click "Start Math Challenge" button
- [ ] Welcome panel hides
- [ ] Question panel appears in VR world
- [ ] Question panel is at comfortable viewing distance
- [ ] Panel is readable

### Question Display
- [ ] Category badge shows at top
- [ ] Question text is clear and readable
- [ ] 4 answer boxes appear
- [ ] Answer text fits in boxes
- [ ] All answers are different
- [ ] Boxes are blue color (#2196F3)

### Answering Questions

#### Correct Answer
- [ ] Click on correct answer box
- [ ] Box turns green (#4CAF50)
- [ ] Box scales up animation plays
- [ ] Score increases by 10+ points
- [ ] Streak counter increases
- [ ] VR score display updates
- [ ] "Next Question" button appears briefly
- [ ] Auto-advances after 2 seconds
- [ ] Next question loads

#### Wrong Answer
- [ ] Click on wrong answer box
- [ ] Box turns red (#f44336)
- [ ] Shake animation plays
- [ ] Box returns to blue after animation
- [ ] Score doesn't increase
- [ ] Streak resets to 0
- [ ] Can try again on same question
- [ ] Other boxes still clickable

### Score System
- [ ] First correct answer: +10 points
- [ ] Second in streak: +12 points (10 + 2×1)
- [ ] Third in streak: +14 points (10 + 2×2)
- [ ] Score accumulates correctly
- [ ] Streak shown in UI overlay
- [ ] Streak shown in VR world
- [ ] Wrong answer resets streak

### Question Types
Verify these question types appear:

- [ ] **Basic Addition**: e.g., "What is 7 + 6?"
- [ ] **Subtraction**: e.g., "What is 15 - 8?"
- [ ] **Multiplication**: e.g., "What is 6 × 7?"
- [ ] **Division**: e.g., "What is 42 ÷ 6?"
- [ ] **Squares**: e.g., "What is 8² (8 squared)?"
- [ ] **Percentages**: e.g., "What is 25% of 80?"
- [ ] **Sequences**: e.g., "What comes next? 2, 4, 6, 8, ?"
- [ ] **Word Problems**: e.g., "A car travels at 50 km/h for 3 hours..."

### Game Completion
- [ ] After 10 questions, game ends
- [ ] "Game Complete!" message shows
- [ ] Final score displays
- [ ] Number of questions answered shown
- [ ] Answer boxes disappear
- [ ] "Play Again" button appears
- [ ] Can restart and play again

---

## 🎨 Visual Tests

### 3D Graphics
- [ ] Sky renders correctly
- [ ] Ground/terrain is visible
- [ ] Lighting looks natural
- [ ] Shadows appear (if environment supports)
- [ ] Fog effect works
- [ ] No graphical glitches

### Animations
- [ ] Loading spinner rotates smoothly
- [ ] Feature cards fade in on landing page
- [ ] Button pulse animation on landing page
- [ ] Answer box scale animation on correct answer
- [ ] Answer box shake animation on wrong answer
- [ ] Environment transitions smoothly

### Text Rendering
- [ ] All text is crisp and readable
- [ ] No text overflow
- [ ] Text colors have good contrast
- [ ] Emojis display correctly
- [ ] Long questions wrap properly
- [ ] Numbers display clearly

---

## 🕶️ VR Mode Tests

### Entering VR
- [ ] VR button appears in scene (bottom right)
- [ ] Click VR button
- [ ] Scene enters VR mode
- [ ] Both eye views render correctly
- [ ] Head tracking works
- [ ] No nausea-inducing effects

### VR Interaction
- [ ] Can look around naturally
- [ ] Question panel visible and readable
- [ ] Answer boxes are at comfortable distance
- [ ] Cursor/reticle visible
- [ ] Can select answers with gaze or controller
- [ ] Movement works with controller thumbstick

### Exiting VR
- [ ] ESC key exits VR mode
- [ ] Or VR headset menu exit works
- [ ] Returns to desktop view correctly
- [ ] Game state preserved

---

## 🔧 Technical Tests

### Browser Compatibility

#### Chrome
- [ ] Loads correctly
- [ ] All features work
- [ ] Good performance
- [ ] VR mode works (with headset)

#### Firefox
- [ ] Loads correctly
- [ ] All features work
- [ ] Good performance
- [ ] VR mode works (with headset)

#### Edge
- [ ] Loads correctly
- [ ] All features work
- [ ] Performance acceptable

#### Safari (Mac)
- [ ] Loads correctly
- [ ] WebXR support may be limited
- [ ] Desktop mode works

### Performance
- [ ] Scene loads in under 5 seconds
- [ ] Frame rate is smooth (30+ FPS)
- [ ] No lag when moving camera
- [ ] Animations are smooth
- [ ] No memory leaks (play for 5+ minutes)

### API Integration
- [ ] Questions load from Open Trivia DB
- [ ] If API fails, custom questions generate
- [ ] HTML entities decode correctly (no &quot; etc.)
- [ ] Questions are math-related
- [ ] All questions have 4 options

### Error Handling
- [ ] Game works without internet (uses fallback questions)
- [ ] No console errors (check with F12)
- [ ] Graceful handling of missing elements
- [ ] Game doesn't crash on rapid clicking

---

## 📱 Mobile/Tablet Tests

### Mobile Browser
- [ ] Game loads on mobile
- [ ] Touch controls work
- [ ] Can look around with touch drag
- [ ] Can select answers
- [ ] UI is readable (may need zoom)
- [ ] Performance acceptable

### Tablet
- [ ] Better experience than phone
- [ ] Landscape mode works well
- [ ] All features accessible
- [ ] Good performance

---

## 🎓 Accessibility Tests

### Usability
- [ ] Color blind friendly (red/green not only indicators)
- [ ] Text is large enough
- [ ] Buttons are easy to click
- [ ] Clear feedback on interactions
- [ ] Instructions are clear

### Keyboard Only
- [ ] Can navigate with Tab key
- [ ] Enter key works on buttons
- [ ] Can play without mouse

---

## 🐛 Bug Testing

### Edge Cases
- [ ] Clicking same answer twice
- [ ] Clicking multiple answers rapidly
- [ ] Changing environment during game
- [ ] Starting new game while one in progress
- [ ] Long questions (40+ characters)
- [ ] Special characters in questions
- [ ] Negative numbers in answers

### Stress Testing
- [ ] Play 3 full games in a row
- [ ] Switch environments 10 times quickly
- [ ] Answer questions very rapidly
- [ ] Leave page idle for 5 minutes
- [ ] Refresh page during game

---

## 📊 Test Results Template

Use this to record your testing results:

```
Date: ___________
Tester: ___________
Browser: ___________
OS: ___________

✅ Passed Tests: ____ / ____
❌ Failed Tests: ____ / ____

Issues Found:
1. 
2. 
3. 

Performance Notes:


Overall Grade: ____ / 10

Recommendations:


```

---

## 🚨 Critical Issues (Must Fix)

If any of these fail, the game is broken:
- [ ] Game loads
- [ ] Can start trivia
- [ ] Questions appear
- [ ] Can select answers
- [ ] Score updates
- [ ] Can complete game

---

## ✨ Enhancement Ideas

Found during testing? Add here:
- 
- 
- 

---

## 📝 Testing Notes

**Quick Test** (5 minutes):
1. Open index.html
2. Click "Start Playing!"
3. Answer 3 questions
4. Try 1 environment switch
5. Basic functionality confirmed ✅

**Full Test** (30 minutes):
- Complete entire checklist
- Test all environments
- Play full game in each
- Try VR mode
- Test on multiple browsers

**Comprehensive Test** (2 hours):
- Everything in Full Test
- Mobile/tablet testing
- Multiple game completions
- Performance monitoring
- Bug hunting

---

*Happy Testing! Report any issues found.* 🐛🔍

