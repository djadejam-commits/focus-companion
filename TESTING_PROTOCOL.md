# Focus Companion - Testing Protocol

## Day 2 Testing Checklist

### Phase 1: Detection Accuracy Testing

#### Test 1: Phone Position Variations
- [ ] **Face-up on desk** → Pick up
  - Expected: Detection triggers
  - Actual: _______
  - Notes: _______

- [ ] **Face-down on desk** → Pick up
  - Expected: Detection triggers
  - Actual: _______
  - Notes: _______

- [ ] **On side (left)** → Pick up
  - Expected: Detection triggers
  - Actual: _______
  - Notes: _______

- [ ] **On side (right)** → Pick up
  - Expected: Detection triggers
  - Actual: _______
  - Notes: _______

#### Test 2: Pickup Speed Variations
- [ ] **Very slow pickup** (2+ seconds)
  - Expected: May not detect (acceptable)
  - Actual: _______
  - Notes: _______

- [ ] **Normal pickup** (~1 second)
  - Expected: Detection triggers
  - Actual: _______
  - Notes: _______

- [ ] **Fast grab** (<0.5 seconds)
  - Expected: Detection triggers
  - Actual: _______
  - Notes: _______

#### Test 3: False Positive Prevention
- [ ] **Scrolling while holding phone**
  - Expected: NO detection
  - Actual: _______
  - Notes: _______

- [ ] **Typing on phone**
  - Expected: NO detection
  - Actual: _______
  - Notes: _______

- [ ] **Walking with phone in hand**
  - Expected: NO detection
  - Actual: _______
  - Notes: _______

- [ ] **Adjusting phone position in hand**
  - Expected: NO detection
  - Actual: _______
  - Notes: _______

- [ ] **Setting phone down gently**
  - Expected: NO detection
  - Actual: _______
  - Notes: _______

#### Test 4: Edge Cases
- [ ] **Partial pickup** (lift slightly, put back down)
  - Expected: Detection triggers
  - Actual: _______
  - Notes: _______

- [ ] **Sliding phone on desk**
  - Expected: NO detection
  - Actual: _______
  - Notes: _______

- [ ] **Bumping desk/table**
  - Expected: NO detection
  - Actual: _______
  - Notes: _______

- [ ] **Phone in pocket, walking**
  - Expected: NO detection (or acceptable if triggers once)
  - Actual: _______
  - Notes: _______

### Phase 2: Session Flow Testing

#### Test 5: Complete Session Flows
- [ ] **Deep Work (45 min)** - Abbreviated to 2 minutes for testing
  - [ ] Session starts successfully
  - [ ] Timer counts down correctly
  - [ ] Motion detection active indicator shows
  - [ ] Pickup triggers refocus screen
  - [ ] Distraction counter increments
  - [ ] Resume after 3 seconds works
  - [ ] Session completes successfully
  - [ ] Summary shows correct stats
  - [ ] Save to history works

- [ ] **Light Review (25 min)**
  - [ ] All above steps work

- [ ] **Flashcards (10 min)**
  - [ ] All above steps work

#### Test 6: Multiple Pickups
- [ ] Start session
- [ ] Pick up phone (Distraction #1)
- [ ] Wait for resume
- [ ] Pick up phone again (Distraction #2)
- [ ] Verify counter shows 2 distractions
- [ ] Complete session
- [ ] Verify summary shows 2 distractions

#### Test 7: Early Termination
- [ ] Start session
- [ ] Tap X to end early
- [ ] Confirm alert appears
- [ ] Tap "End Session"
- [ ] Verify navigates to summary
- [ ] Verify "Session Ended" (not completed) shows

#### Test 8: Pause/Resume
- [ ] Start session
- [ ] Tap "Pause"
- [ ] Verify motion detection stops
- [ ] Verify timer stops
- [ ] Tap "Resume"
- [ ] Verify motion detection restarts
- [ ] Verify timer resumes

### Phase 3: History & Persistence
- [ ] Complete multiple sessions
- [ ] Navigate to History
- [ ] Verify all sessions appear
- [ ] Verify dates/times correct
- [ ] Verify focus scores calculated correctly
- [ ] Close app completely
- [ ] Reopen app
- [ ] Verify history persisted

### Phase 4: Performance Testing
- [ ] Run 10-minute session
- [ ] Monitor battery usage (estimate)
- [ ] Check for app crashes
- [ ] Check for memory leaks (app feels responsive)
- [ ] Verify no lag in detection

### Phase 5: UI/UX Testing
- [ ] All text readable
- [ ] All buttons tappable (not too small)
- [ ] Navigation smooth
- [ ] Colors/contrast good
- [ ] Icons/emojis render correctly
- [ ] No layout issues on iPhone

## Results Summary

**Detection Accuracy:**
- True Positives (correct pickups): ___ / ___
- False Positives (incorrect triggers): ___ / ___
- False Negatives (missed pickups): ___ / ___

**Overall Detection Rate:** ____%

**False Positive Rate:** ____%

**Session Flow:** Pass / Fail

**Critical Issues Found:** _______

**Minor Issues Found:** _______

**Recommended Sensitivity Adjustments:**
- Z-axis threshold: _______
- Magnitude threshold: _______
- Rotation threshold: _______
