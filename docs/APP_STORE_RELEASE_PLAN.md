# VoiceMax App Store Release Plan

This document outlines all steps required to release VoiceMax on TestFlight and the App Store.

---

## Prerequisites

- [ ] Apple Developer Account ($99/year) - https://developer.apple.com
- [ ] Expo account - https://expo.dev
- [ ] EAS CLI installed (`npm install -g eas-cli`)

---

## Phase 1: Configuration Files

### 1.1 Create `eas.json`

Create file at project root with build profiles:

```json
{
  "cli": {
    "version": ">= 3.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": false
      }
    },
    "production": {
      "ios": {
        "resourceClass": "m-medium"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "YOUR_APPLE_ID",
        "ascAppId": "YOUR_APP_STORE_CONNECT_APP_ID",
        "appleTeamId": "YOUR_TEAM_ID"
      }
    }
  }
}
```

### 1.2 Update `app.json`

Add/update the following fields:

```json
{
  "expo": {
    "name": "VoiceMax",
    "slug": "voicemax",
    "version": "1.0.0",
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.lfilipiuk.voicemax",
      "buildNumber": "1",
      "infoPlist": {
        "NSMicrophoneUsageDescription": "VoiceMax needs microphone access to record and analyze your voice for tracking your voice training progress. Recordings are stored only on your device.",
        "ITSAppUsesNonExemptEncryption": false
      },
      "config": {
        "usesNonExemptEncryption": false
      }
    }
  }
}
```

**Key additions:**
- `buildNumber` - increment for each TestFlight build
- `NSMicrophoneUsageDescription` - detailed explanation for App Review
- `ITSAppUsesNonExemptEncryption` - avoids export compliance questions

---

## Phase 2: Assets

### 2.1 App Icon

**Current:** 1000x1000 px
**Required:** 1024x1024 px

- [ ] Resize `assets/images/icon.png` to 1024x1024
- [ ] Ensure no transparency (App Store requirement)
- [ ] No rounded corners (iOS adds them automatically)

### 2.2 Screenshots

Required sizes for App Store:

| Device | Size | Required |
|--------|------|----------|
| 6.7" iPhone (15 Pro Max) | 1290 x 2796 | Yes |
| 6.5" iPhone (11 Pro Max) | 1284 x 2778 | Yes |
| 5.5" iPhone (8 Plus) | 1242 x 2208 | Optional |
| 12.9" iPad Pro | 2048 x 2732 | If supporting iPad |

**Recommended screenshots:**
1. Pitch analysis results screen
2. Voice stats (Depth, Resonance, Power, Control)
3. Workout/exercise screen
4. Progress tracking
5. Onboarding/value proposition

**Tools:**
- Simulator screenshots + [AppMockUp](https://app-mockup.com)
- [Rotato](https://rotato.app)
- [Screenshots Pro](https://screenshots.pro)

### 2.3 App Preview Video (Optional)

- 15-30 seconds
- Shows app in action
- Can significantly increase downloads

---

## Phase 3: Legal & Privacy

### 3.1 Privacy Policy (Required)

Since VoiceMax:
- Accesses microphone
- Records voice audio
- Stores data locally
- Tracks user progress

A privacy policy is **mandatory**.

**Content to include:**
- What data is collected (voice recordings, usage metrics)
- How data is stored (locally on device only)
- Data is NOT shared with third parties
- Data is NOT uploaded to servers
- User can delete all data by uninstalling app
- Contact information

**Options:**
1. Generate at [Termly.io](https://termly.io) (free tier available)
2. Generate at [PrivacyPolicies.com](https://privacypolicies.com)
3. Write custom and host on GitHub Pages / Notion / personal site

**Hosting options:**
- GitHub Pages (free)
- Notion public page (free)
- Your own website
- Firebase Hosting (free tier)

**URL needed:** `https://your-domain.com/voicemax/privacy`

### 3.2 Terms of Service (Recommended)

Not strictly required but recommended. Can use same generators as privacy policy.

### 3.3 Support URL (Required)

Options:
- Email link: `mailto:support@yourdomain.com`
- GitHub Issues page
- Simple landing page with contact form
- Notion page with FAQ

---

## Phase 4: App Store Connect Setup

### 4.1 Create App in App Store Connect

1. Go to https://appstoreconnect.apple.com
2. My Apps → "+" → New App
3. Fill in:
   - Platform: iOS
   - Name: VoiceMax
   - Primary Language: English
   - Bundle ID: com.lfilipiuk.voicemax
   - SKU: voicemax-ios-001

### 4.2 App Information

**Category:** Health & Fitness (primary), Lifestyle (secondary)

**Age Rating:** Complete questionnaire
- Violence: None
- Medical/Treatment Info: Yes (voice health info)
- Mature content: None

**Content Rights:** Confirm you own all content

### 4.3 App Store Metadata

**App Name:** VoiceMax (30 char max)

**Subtitle:** Voice Training & Analysis (30 char max)

**Keywords (100 char max):**
```
voice,training,deep,masculine,pitch,resonance,speech,vocal,coach,analyzer
```

**Description (4000 char max):**
```
VoiceMax helps you develop a deeper, more resonant speaking voice through scientific voice analysis and guided daily exercises.

MEASURE YOUR VOICE
• Clinical-grade acoustic analysis using openSMILE technology
• Track Depth, Resonance, Power, and Control metrics
• Compare your voice to reference voices
• See detailed formant and pitch analysis

DAILY TRAINING
• 5 guided exercises (~10 minutes/day)
• Diaphragmatic breathing
• Humming warmups
• Pitch glides
• Chest voice activation
• Sustained low notes

TRACK PROGRESS
• Historical measurements
• Streak tracking
• Visual progress charts
• Personalized recommendations

RESEARCH-BACKED
Our metrics are based on peer-reviewed acoustic research. We measure what actually matters for voice masculinity:
• F0 (fundamental frequency)
• Vocal tract length estimation
• Alpha ratio and spectral balance
• Voice steadiness (jitter/shimmer)

All voice recordings are stored locally on your device and never uploaded to any server.

Start your voice transformation journey today.
```

**What's New (for updates):**
```
Initial release
```

**Promotional Text (170 char, can update without review):**
```
Transform your voice with scientific analysis and daily training. Measure your Depth, Resonance, Power & Control.
```

### 4.4 URLs

| Field | URL |
|-------|-----|
| Privacy Policy | `https://your-domain.com/voicemax/privacy` |
| Support URL | `https://your-domain.com/voicemax/support` or `mailto:support@your-domain.com` |
| Marketing URL | Optional - your website |

---

## Phase 5: Build & Submit

### 5.1 First-time Setup

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Link to Expo project
eas init

# Configure build
eas build:configure
```

### 5.2 Build for TestFlight

```bash
# Build production iOS binary
eas build --platform ios --profile production
```

This will:
1. Create iOS build in the cloud
2. Generate/use provisioning profiles
3. Sign the app
4. Produce an .ipa file

### 5.3 Submit to TestFlight

```bash
# Submit the latest build
eas submit --platform ios --latest
```

Or submit a specific build:
```bash
eas submit --platform ios --id BUILD_ID
```

### 5.4 TestFlight Review

- TestFlight builds go through a quick review (usually <24 hours)
- Can have up to 10,000 external testers
- Internal testers (your team) don't need review

---

## Phase 6: App Review Preparation

### 6.1 Common Rejection Reasons (and how to avoid)

| Reason | Prevention |
|--------|------------|
| Crashes | Test thoroughly on real devices |
| Incomplete metadata | Fill all required fields |
| Placeholder content | Remove all "Lorem ipsum" or test data |
| Privacy issues | Clear privacy policy, proper permission descriptions |
| Misleading claims | Don't claim medical benefits |
| Minimum functionality | App must do more than a website |

### 6.2 Review Notes

Add notes for the reviewer in App Store Connect:

```
VoiceMax is a voice training app that helps users develop deeper speaking voices.

To test the app:
1. Complete the onboarding flow
2. Allow microphone access when prompted
3. Record your voice following the prompts
4. View your analysis results
5. Try a daily workout

The app uses the openSMILE library for acoustic analysis, which is open-source academic software for voice analysis.

All voice recordings are stored locally on the device and are never uploaded to any server.
```

### 6.3 Demo Account

Not needed for VoiceMax (no login required).

---

## Checklist Summary

### Before First Build
- [ ] Apple Developer account active
- [ ] Expo account created
- [ ] EAS CLI installed
- [ ] `eas.json` created
- [ ] `app.json` updated with iOS config
- [ ] App icon resized to 1024x1024

### Before TestFlight
- [ ] Privacy policy created and hosted
- [ ] Support URL ready
- [ ] App created in App Store Connect
- [ ] All metadata filled in
- [ ] At least 3 screenshots per required size

### Before App Store Release
- [ ] TestFlight tested by real users
- [ ] All bugs fixed
- [ ] Age rating completed
- [ ] Review notes added
- [ ] Export compliance answered
- [ ] Pricing set (Free or paid)

---

## Timeline Estimate

| Phase | Estimated Time |
|-------|---------------|
| Phase 1: Configuration | 30 min |
| Phase 2: Assets | 2-4 hours |
| Phase 3: Legal | 1-2 hours |
| Phase 4: App Store Connect | 1 hour |
| Phase 5: Build & Submit | 1-2 hours (mostly waiting) |
| Phase 6: Review | 24-48 hours |

**Total:** ~1-2 days of work + review wait time

---

## Useful Links

- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [App Store Connect Help](https://developer.apple.com/help/app-store-connect/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [EAS Submit Documentation](https://docs.expo.dev/submit/introduction/)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

---

## Version History

| Version | Build | Date | Notes |
|---------|-------|------|-------|
| 1.0.0 | 1 | TBD | Initial release |
