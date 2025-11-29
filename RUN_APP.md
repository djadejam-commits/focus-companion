# 🚀 How to Run Your Focus Companion App

## Quick Start Guide

Your app is **100% ready to run**! Here's how to start it:

---

## Method 1: Start in Your Terminal (Easiest)

Open your terminal and run:

```bash
cd /Users/adeoluwatokuta/Edge-AI-contest/focus-companion
npm start
```

**Wait 1-2 minutes** for Metro to build, then you'll see:
- ✅ QR code displayed
- ✅ Development menu options
- ✅ URL: exp://192.168.1.141:8081

---

## Method 2: Connect Directly via IP

If QR code doesn't work:

1. **Start the server in terminal:**
   ```bash
   cd /Users/adeoluwatokuta/Edge-AI-contest/focus-companion
   npm start
   ```

2. **On your phone (Expo Go app):**
   - Open Expo Go
   - Tap "Enter URL manually"
   - Type: `exp://192.168.1.141:8081`
   - Tap "Connect"

---

## Method 3: Use iOS Simulator (Mac Only)

```bash
cd /Users/adeoluwatokuta/Edge-AI-contest/focus-companion
npm run ios
```

---

## Method 4: Use Android Emulator

```bash
cd /Users/adeoluwatokuta/Edge-AI-contest/focus-companion
npm run android
```

---

## Troubleshooting

### "Port 8081 already in use"
```bash
lsof -ti:8081 | xargs kill -9
npm start
```

### "QR code says no usable data"
- The server might not be fully started yet
- Wait for "Metro waiting on..." message
- Or use Method 2 (direct IP connection)

### "Unable to resolve module"
```bash
npm install
npx expo start --clear
```

### Server won't start
```bash
rm -rf node_modules
npm install
npm start
```

---

## What You'll See in the App

Once connected, you'll have:
- ✅ Dashboard with 3 session types
- ✅ Working timer (counts down)
- ✅ Pause/resume controls
- ✅ Session summary screen
- ✅ History tracking

**Note:** Motion detection won't work yet (that's Day 1 with Edge Impulse!)

---

## Your Computer's Network Info

- **Local IP:** 192.168.1.141
- **Metro Port:** 8081
- **Expo URL:** exp://192.168.1.141:8081

Make sure your phone is on the **same WiFi network** as your computer!

---

## Next Steps After Testing

1. ✅ Test all 3 session types
2. ✅ Try the timer
3. ✅ End a session and see summary
4. ✅ Check history screen

**Tomorrow (Day 1):** Train your Edge Impulse model!

---

## Quick Commands Reference

```bash
# Start development server
npm start

# Clear cache and restart
npx expo start --clear

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Install dependencies
npm install
```

---

**Ready to test your app? Run this command in your terminal:**

```bash
cd /Users/adeoluwatokuta/Edge-AI-contest/focus-companion && npm start
```

Then either scan the QR code or use the direct IP method above! 🚀
