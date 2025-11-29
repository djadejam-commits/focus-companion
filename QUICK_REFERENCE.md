# Quick Reference Guide

## 🎯 Your Next Steps

### Right Now:
1. **Test the enhanced animations**
   - Reload the app in Expo Go
   - Start a session and pick up the phone
   - Watch for the breathing icon 🌊 and pulsing countdown

2. **Run through the testing protocol**
   - Open: `TESTING_PROTOCOL.md`
   - Test different phone positions
   - Note false positives/negatives
   - Document results

3. **Practice your demo**
   - Read: `DEMO_SCRIPT.md`
   - Time yourself (<2 minutes)
   - Practice 3-5 times tonight

### Tomorrow Morning (Day 3):
1. **Complete systematic testing** (1-2 hours)
2. **Tune sensitivity if needed** (30 minutes)
3. **Practice demo** (1 hour)
4. **Record backup video** (30 minutes)

## 📁 Key Files You Created

### Documentation
- `START_HERE.md` - Master navigation guide
- `DEMO_SCRIPT.md` - **Your pitch for judges**
- `TESTING_PROTOCOL.md` - **Systematic testing checklist**
- `DAY_2_PROGRESS.md` - Progress summary
- `EDGE_IMPULSE_GUIDE.md` - ML training walkthrough

### Source Code
- `src/services/MotionService.js` - **Detection logic** (tune here)
- `src/screens/RefocusScreen.js` - **Refocus screen with animations**
- `src/screens/ActiveSessionScreen.js` - Main timer screen
- `src/context/SessionContext.js` - State management
- `App.js` - Navigation setup

### Model Files
- `src/model/browser/edge-impulse-standalone.js` - Edge Impulse model
- `src/model/browser/edge-impulse-standalone.wasm` - WASM binary

## ⚙️ Quick Adjustments

### If Detection Too Sensitive (False Positives):
Edit `src/services/MotionService.js` lines 245-247:
```javascript
const hasZSpike = zSpike > 0.5;      // Increase from 0.4
const hasMagSpike = magSpike > 0.6;  // Increase from 0.5
const hasRotation = gyroMax > 1.2;   // Increase from 1.0
```

### If Detection Too Insensitive (Missing Pickups):
```javascript
const hasZSpike = zSpike > 0.3;      // Decrease from 0.4
const hasMagSpike = magSpike > 0.4;  // Decrease from 0.5
const hasRotation = gyroMax > 0.8;   // Decrease from 1.0
```

### If App Won't Load:
1. Check Metro bundler is running
2. Kill all background processes
3. Run: `npx expo start --clear`
4. Reload in Expo Go

## 🎬 Demo Day Checklist

### Night Before:
- [ ] Practice demo 5+ times
- [ ] Charge phone to 100%
- [ ] Charge laptop to 100%
- [ ] Test app one final time
- [ ] Get 7-8 hours sleep

### Demo Day Morning:
- [ ] Run app to verify it works
- [ ] Open Edge Impulse Studio
- [ ] Review demo script once
- [ ] Bring charging cables (backup)

### 30 Minutes Before Demo:
- [ ] Close unnecessary apps
- [ ] Enable Do Not Disturb
- [ ] Test app one more time
- [ ] Deep breaths - you've got this!

## 📊 Key Numbers to Remember

- **92.5%** - Your model accuracy
- **0.93** - F1 score
- **175** - Total training samples
- **62.5Hz** - Sensor frequency
- **3 seconds** - Refocus duration
- **Day 1** - Went from zero to working ML model

## 💬 Elevator Pitch (Memorize This!)

"Focus Companion uses Edge Impulse to detect when students impulsively pick up their phones during study sessions. When detected, a gentle 3-second reminder helps them refocus. With 92.5% accuracy and complete privacy through on-device processing, it turns unconscious distractions into conscious choices."

## 🆘 Emergency Contacts

### If Demo Tech Fails:
1. Use screen recording backup
2. Show Edge Impulse Studio instead
3. Walk through architecture diagram
4. Explain technical approach verbally

### If Questions Stump You:
"That's a great question. I focused on [core feature] for this hackathon, but [your thoughtful response] would be an excellent next step."

## 🎯 What Makes Your Project Strong

1. **Real Problem**: Students lose focus to phone distractions
2. **Real Solution**: ML-powered behavioral intervention
3. **Real Results**: 92.5% accuracy, working app
4. **Real Innovation**: On-device ML for privacy + performance
5. **Real Polish**: Professional UI, smooth animations
6. **Real Potential**: Can scale to thousands of students

## 📱 App Flow (Quick Reference)

```
Dashboard
   ↓ (tap session card)
Active Session (timer running, detection active)
   ↓ (pick up phone)
Refocus Screen (3-second breathing reminder)
   ↓ (auto after 3s)
Active Session (resumed, distraction counted)
   ↓ (session completes or tap X)
Summary (stats, focus score)
   ↓ (save to history)
History (all past sessions)
   ↓ (tap back)
Dashboard
```

## 🔧 Troubleshooting Quick Fixes

| Problem | Quick Fix |
|---------|-----------|
| App won't load | `npx expo start --clear` |
| Detection not working | Check sensor permissions in phone settings |
| False positives | Increase thresholds in MotionService.js |
| Missing pickups | Decrease thresholds in MotionService.js |
| Refocus doesn't show | Check RefocusScreen import in ActiveSessionScreen.js |
| Timer not counting | Check SessionContext state machine |

## 🚀 You're Ready!

You've built:
- ✅ A fully functional React Native app
- ✅ A trained Edge Impulse ML model (92.5% accuracy)
- ✅ On-device motion detection system
- ✅ Professional UI with animations
- ✅ Complete session management
- ✅ Comprehensive demo materials

**This is impressive work for 2 days!**

Tomorrow: Test, tune, practice, and shine in the demo.

**You've got this!** 🎉
