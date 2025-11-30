# GitHub Repository Setup - Quick Guide

**Status**: ✅ Code committed locally, ready to push

---

## Step 1: Create GitHub Repository

### Option A: Using GitHub Website (Recommended)

1. **Go to GitHub**
   - Open: https://github.com
   - Make sure you're logged in

2. **Create New Repository**
   - Click the **"+"** icon (top right corner)
   - Select **"New repository"**

3. **Repository Settings**
   - **Repository name**: `focus-companion`
   - **Description**: `AI-powered study companion that detects phone pickups using Edge Impulse ML | Edge Impulse Competition 2025`
   - **Visibility**: Select **"Public"** (required for competition)
   - **DO NOT** check "Initialize this repository with:"
     - ❌ Don't add README (you already have one)
     - ❌ Don't add .gitignore (you already have one)
     - ❌ Don't choose a license (optional, add later if needed)

4. **Create Repository**
   - Click the green **"Create repository"** button
   - You'll see instructions for pushing existing repository
   - **Copy the repository URL** (will be like: `https://github.com/djadejam-commits/focus-companion.git`)

---

## Step 2: Connect Local Repository to GitHub

Run these commands in your terminal (in the project folder):

```bash
# Add GitHub as remote (replace djadejam-commits with your actual GitHub username)
git remote add origin https://github.com/djadejam-commits/focus-companion.git

# Verify remote was added
git remote -v

# Push to GitHub
git push -u origin main
```

**If you get authentication error:**
- GitHub no longer accepts password authentication
- You need to use a Personal Access Token (PAT)

**To create a PAT:**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token → Select "repo" scope → Generate
3. Copy the token (you won't see it again!)
4. Use token as password when prompted

**Alternative (easier):**
Use GitHub CLI if you have it installed:
```bash
gh auth login
gh repo create focus-companion --public --source=. --remote=origin --push
```

---

## Step 3: Verify Upload

1. **Go to your repository**
   - URL: `https://github.com/djadejam-commits/focus-companion`

2. **Check that these files are visible:**
   - ✅ README.md (should display nicely on main page)
   - ✅ src/ folder with all source code
   - ✅ package.json
   - ✅ App.js
   - ✅ Documentation files (DEMO_SCRIPT.md, TESTING_PROTOCOL.md, etc.)

3. **Verify node_modules is NOT uploaded**
   - ❌ Should NOT see node_modules/ (excluded by .gitignore)
   - File count should be ~50 files, NOT thousands

---

## Step 4: Add Repository Topics (Optional but Recommended)

On your GitHub repository page:
1. Click **"⚙️ About"** (gear icon, top right of file list)
2. Add topics:
   - `edge-impulse`
   - `machine-learning`
   - `react-native`
   - `expo`
   - `motion-detection`
   - `ai`
   - `hackathon`
   - `student-productivity`
3. Save changes

---

## Step 5: Copy Repository URL for Submission

Your repository URL will be:
```
https://github.com/djadejam-commits/focus-companion
```

**Save this URL** - you'll need it for:
- HackerEarth submission form
- Edge Impulse project description
- Social media posts

---

## Troubleshooting

### Issue: "Repository already exists"
**Solution**: Either:
- Use a different name: `focus-companion-app`, `focus-companion-ei`, etc.
- Delete the existing repository if it's empty

### Issue: "Permission denied (publickey)"
**Solution**:
- Use HTTPS URL instead of SSH: `https://github.com/...` (not `git@github.com:...`)
- OR set up SSH keys: https://docs.github.com/en/authentication

### Issue: "Push rejected - remote contains work you don't have locally"
**Solution**:
- You probably initialized with README on GitHub
- Force push (careful!): `git push -u origin main --force`
- OR better: Delete repo and recreate without initializing

### Issue: "Files too large (>100MB)"
**Solution**:
- Check what's being uploaded: `git ls-files --stage | awk '$2 > 100000000'`
- Remove large files from git history
- Most common culprit: accidentally committed node_modules/

---

## Quick Commands Reference

```bash
# Check current status
git status

# View commit history
git log --oneline

# Check remote configuration
git remote -v

# Add GitHub remote
git remote add origin https://github.com/djadejam-commits/focus-companion.git

# Push to GitHub
git push -u origin main

# Force push (if needed, be careful!)
git push -u origin main --force

# Remove a remote
git remote remove origin
```

---

## What Judges Will See

When judges visit your repository, they'll see:

1. **README.md** displayed prominently on main page with:
   - Problem statement
   - Edge Impulse integration details
   - Performance metrics (92.5% accuracy)
   - Installation instructions
   - Technical architecture

2. **Clean folder structure**:
   ```
   focus-companion/
   ├── README.md
   ├── App.js
   ├── package.json
   ├── src/
   │   ├── screens/
   │   ├── services/
   │   ├── context/
   │   ├── constants/
   │   └── model/
   ├── DEMO_SCRIPT.md
   ├── TESTING_PROTOCOL.md
   └── ... (other docs)
   ```

3. **Professional commit message** showing:
   - Complete feature set
   - Technical stack
   - Competition context

---

## After Pushing

Once your code is on GitHub:

- [ ] ✅ Verify README displays correctly
- [ ] ✅ Check all folders are visible
- [ ] ✅ Confirm repository is marked "Public"
- [ ] ✅ Add topics/tags
- [ ] ✅ Copy repository URL
- [ ] ✅ Test URL in incognito mode (ensures it's truly public)

**Then move on to:**
- [ ] Record demo video (VIDEO_RECORDING_GUIDE.md)
- [ ] Make Edge Impulse project public
- [ ] Submit to HackerEarth

---

## Current Status

✅ **Git initialized**: Yes
✅ **Code committed**: Yes (44 files)
✅ **Commit message**: Professional and detailed
⏳ **GitHub remote**: Waiting for you to create repo
⏳ **Push to GitHub**: Waiting for remote setup

**Next Action**: Create repository on GitHub and push!
