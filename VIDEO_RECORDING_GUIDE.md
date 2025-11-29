# Demo Video Recording Guide 🎥

**Target Length**: 2-3 minutes
**Format**: Screen recording + voiceover (or talking head intro + screen demo)
**Goal**: Show judges the app works, explain Edge Impulse integration, demonstrate impact

---

## 🎬 Shot List & Script

### Shot 1: Hook (0:00-0:15) - 15 seconds

**Visual**:
- You on camera OR title slide with app logo
- Clean background, good lighting

**Script**:
> "Students lose 2.5 hours every day to unconscious phone pickups during study sessions. What if your phone could detect the exact moment you pick it up—and gently remind you to stay focused? I'm [Your Name], and I built Focus Companion using Edge Impulse to solve this problem."

**Alternative (screen only)**:
> Start with phone on desk, show the app dashboard
> "This is Focus Companion—an AI-powered study app that detects when you unconsciously pick up your phone. Let me show you how it works."

---

### Shot 2: The Problem (0:15-0:30) - 15 seconds

**Visual**:
- Show app dashboard
- Pan/zoom to session cards

**Script**:
> "Traditional solutions like app blockers are either too aggressive—causing anxiety—or too easy to bypass. Focus Companion takes a different approach: it intervenes at the behavioral level, turning unconscious distractions into conscious choices."

**Alternative (faster)**:
> "Instead of blocking apps, it detects the pickup motion itself using Edge Impulse machine learning, then shows a gentle refocus reminder."

---

### Shot 3: Starting a Session (0:30-0:50) - 20 seconds

**Visual**:
- Tap "Study Session" card
- Show active timer screen appearing
- Highlight timer counting down
- Show "Detection Active" indicator

**Script**:
> "Here's how it works. I start a 25-minute study session. The app begins monitoring motion data from the phone's accelerometer and gyroscope. Now, watch what happens when I pick up the phone..."

---

### Shot 4: Detection Demo (0:50-1:15) - 25 seconds

**Visual**:
- **CRITICAL**: Position phone on desk, ensure camera captures both screen AND your hand
- Pick up phone naturally
- Refocus screen appears with breathing animation
- Show 3-second countdown
- Auto-resume to timer

**Script**:
> "I place the phone face-up on the desk and pick it up naturally... There! The refocus screen appears instantly with a calming breathing animation and a 3-second countdown. This gentle reminder helps me recognize the distraction and make a conscious choice—do I really need to check my phone right now? The session automatically resumes after 3 seconds."

**Pro Tip**: Record this demo 3-4 times and use the best take. This is the money shot!

---

### Shot 5: Dismiss Feature (1:15-1:35) - 20 seconds

**Visual**:
- Pick up phone again
- Show "Not a distraction? Dismiss" button
- Tap dismiss
- Show "X dismisses remaining" counter
- Return to timer

**Script**:
> "Sometimes the detection might trigger when you're legitimately using your phone for studying—maybe checking a calculator or reference. No problem. You can dismiss false positives, and the app limits this to 3 times per session to prevent gaming the system."

---

### Shot 6: Edge Impulse Integration (1:35-2:00) - 25 seconds

**Visual**:
- Switch to Edge Impulse Studio (screen share)
- Show Feature Explorer visualization
- Show Training accuracy results (92.5%)
- Show Confusion matrix
- (OR show model architecture diagram from README)

**Script**:
> "This is powered by Edge Impulse. I collected 175 motion samples across different phone positions and trained a neural network classifier using spectral analysis. The model achieved 92.5% accuracy with an F1 score of 0.93. All processing happens on-device using WASM—no data leaves your phone, no internet required."

**Alternative (if no screen recording setup)**:
> Stay on app, show settings/about screen with model stats
> "Behind the scenes, Edge Impulse analyzes accelerometer and gyroscope data in real-time. The model was trained on 175 samples and achieves 92.5% accuracy. All processing is on-device for privacy and instant detection."

---

### Shot 7: Session Summary (2:00-2:20) - 20 seconds

**Visual**:
- Tap "End Session"
- Show session summary screen
- Highlight:
  - Duration completed
  - Distraction count
  - Focus score
- Show "Save to History" button

**Script**:
> "When the session ends, you get a detailed summary: how long you studied, how many times you picked up your phone, and a focus score. Over time, you can track your progress and see your distraction patterns improve."

---

### Shot 8: Impact & Close (2:20-2:45) - 25 seconds

**Visual**:
- Show history screen with multiple sessions
- Show focus score trend (if multiple sessions)
- OR back to dashboard

**Script**:
> "The impact is real. Students report better awareness of their phone habits and improved focus during study sessions. With 300 million students worldwide struggling with phone distractions, Focus Companion shows how accessible Edge Impulse makes building real AI solutions to real problems. And it was built in just 3 days."

**Call to Action**:
> "Try it yourself—the code is open source on GitHub, and the Edge Impulse project is public so you can see exactly how it works. Thanks for watching!"

---

## 📱 Recording Setup

### Equipment Needed
- **iPhone/Android device** running the app
- **Computer** for screen recording (if showing Edge Impulse Studio)
- **Camera** or webcam (optional, for talking head intro)
- **Microphone** or headphones with mic (built-in is fine, lapel mic is better)

### Recording Tools

**Option 1: Phone Screen Recording (iOS)**
- Settings → Control Center → Add "Screen Recording"
- Swipe down from top-right → Tap record button
- Long-press to enable microphone
- Record while doing voiceover

**Option 2: QuickTime (macOS → iPhone)**
- Connect iPhone to Mac with cable
- Open QuickTime → File → New Movie Recording
- Click dropdown next to record → Select iPhone
- Record screen while doing voiceover

**Option 3: Third-Party Apps**
- **OBS Studio** (free, powerful, cross-platform)
- **Loom** (easy, browser-based, has free tier)
- **ScreenFlow** (Mac, paid but excellent)

### Audio Recording Tips
- Record in a quiet room (turn off AC, close windows)
- Speak clearly and at a moderate pace
- Use your "explaining to a friend" voice (conversational, not robotic)
- Smile while recording—it comes through in your voice!

---

## 🎨 Visual Polish Tips

### Before Recording
- [ ] Close all unnecessary apps
- [ ] Enable Do Not Disturb
- [ ] Set screen brightness to 70-80%
- [ ] Charge device to 100% (or plug in)
- [ ] Clean phone screen (fingerprints!)
- [ ] Use a clean desk surface (minimize clutter in frame)

### During Recording
- [ ] Slow down your movements (easier for viewers to follow)
- [ ] Pause for 1 second between major actions (easier to edit)
- [ ] If you mess up, pause and restart from that section (easier than re-recording everything)

### After Recording
- [ ] Trim dead space at start/end
- [ ] Add title slide (optional: "Focus Companion | Edge Impulse AI Competition 2025")
- [ ] Add text overlays for key stats (optional: "92.5% accuracy", "On-device ML", etc.)
- [ ] Add background music at 10-15% volume (optional, use royalty-free music)

---

## ⏱️ Timing Breakdown Summary

| Section | Duration | Critical? |
|---------|----------|-----------|
| Hook | 15s | ✅ YES - Grab attention |
| Problem | 15s | Optional - Can shorten |
| Start Session | 20s | ✅ YES - Show it works |
| Detection Demo | 25s | ✅ YES - The money shot |
| Dismiss Feature | 20s | Recommended - Shows polish |
| Edge Impulse | 25s | ✅ YES - Competition requirement |
| Summary Screen | 20s | Recommended - Shows completeness |
| Impact & Close | 25s | ✅ YES - Leave strong impression |
| **TOTAL** | **2:45** | Target: 2-3 minutes |

**Fastest Version** (if pressed for time): Hook + Start Session + Detection Demo + Edge Impulse + Close = **1:45**

---

## ✅ Pre-Recording Checklist

### App Preparation
- [ ] Fresh install or cleared session history (for clean demo)
- [ ] OR keep 2-3 sessions in history to show tracking
- [ ] Test detection 3-4 times to ensure consistency
- [ ] Know exactly where to tap/what to show

### Script Preparation
- [ ] Read script out loud 3 times (memorize key points, not word-for-word)
- [ ] Time yourself (adjust if over 3 minutes)
- [ ] Prepare "edge case" explanations (in case judges ask)

### Environment Setup
- [ ] Quiet recording space
- [ ] Good lighting (face a window or use desk lamp)
- [ ] Clean background (if showing yourself)
- [ ] Phone charged, computer ready
- [ ] Water nearby (for dry mouth between takes)

---

## 🎯 Key Messages to Hit

**Must Include:**
1. ✅ The problem: Students lose hours to unconscious phone pickups
2. ✅ The solution: AI-powered behavioral intervention
3. ✅ Edge Impulse usage: Model training, accuracy, on-device inference
4. ✅ Live demo: Show detection actually working
5. ✅ Privacy: On-device processing, no data uploaded

**Nice to Include:**
- Dismiss system (shows you thought about edge cases)
- Focus score tracking (shows completeness)
- Development timeline (shows rapid prototyping with Edge Impulse)
- Open source mention (shows community value)

**Don't Spend Time On:**
- Technical implementation details (save for Q&A)
- Every single feature (focus on core value)
- Apologizing for rough edges (judges expect MVP quality)

---

## 💡 Pro Tips

### Voiceover vs Talking Head
- **Voiceover** (recommended): Easier to edit, viewer focuses on demo
- **Talking Head**: More personal, builds connection, but harder to execute

### Multiple Takes Strategy
1. Record Shot 4 (detection demo) 5 times → Pick best take
2. Record full walkthrough 2 times → Pick smoothest
3. Record voiceover separately if needed → Easier to get right
4. Edit together the best pieces

### Common Mistakes to Avoid
- ❌ Talking too fast (judges can't follow)
- ❌ Showing features without explaining WHY they matter
- ❌ Forgetting to mention Edge Impulse (it's the competition!)
- ❌ Too much technical jargon (explain like they're smart but new to your project)
- ❌ Apologizing or explaining what doesn't work (focus on what does!)

---

## 📤 Export Settings

**Format**: MP4 (H.264 codec)
**Resolution**: 1080p (1920×1080) or 720p (1280×720)
**Frame Rate**: 30fps
**Audio**: AAC, 128kbps
**File Size**: Aim for <100MB (easier to upload/share)

**Upload Destinations**:
- YouTube (unlisted or public)
- Google Drive (set to public viewing)
- Loom (easiest, includes editing tools)

---

## 🎬 Final Check Before Submitting

- [ ] Video plays without errors
- [ ] Audio is clear throughout
- [ ] Detection demo is visible and works
- [ ] Edge Impulse is mentioned prominently
- [ ] Call to action at end (GitHub link, try it yourself, etc.)
- [ ] Length is 2-3 minutes (or close)
- [ ] You'd be proud to show your mom/professor/future employer

---

## 🚀 You've Got This!

Remember: Judges see LOTS of demos. What makes yours stand out:
1. **It actually works** (live demo beats slides)
2. **Clear problem → solution flow** (they get it in 30 seconds)
3. **Edge Impulse is central** (not just a checkbox)
4. **You're confident and enthusiastic** (passion is contagious)

**Good luck! Now go record that demo! 🎥**
