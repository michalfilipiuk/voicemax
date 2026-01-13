# Voice Masculinity Metrics

This document explains the research-backed acoustic metrics used in VoiceMax to analyze and track voice masculinity.

## Overview

VoiceMax uses **openSMILE** with the **eGeMAPSv02** (extended Geneva Minimalistic Acoustic Parameter Set) configuration to extract 88 acoustic features from voice recordings. From these, we derive four primary masculinity metrics based on peer-reviewed research.

## Recording Protocol

We use a 3-step recording process:

1. **Sentence 1**: "The human voice is the most powerful instrument." (2s min)
2. **Sentence 2**: "I speak with confidence and authority." (2s min)
3. **Sustained vowel**: "Aaaaaah" (4s min)

**Important**: Only the sustained vowel (step 3) is used for acoustic analysis.

**Why?** Research shows sustained vowels provide the most reliable F0 and formant measurements ([PMC5345563](https://pmc.ncbi.nlm.nih.gov/articles/PMC5345563/)). The sentence readings serve a UX purpose - they make the measurement feel more thorough and professional, and help users warm up their voice naturally before the critical measurement.

---

## The Four Primary Metrics

### 1. Depth (Pitch-Based Masculinity)

**What it is**: A score (0-100) based on your pitch position in the male voice distribution.

**Why it matters**: F0 (fundamental frequency) is the strongest single predictor of voice masculinity, explaining [23-43% of perception variance](https://www.sciencedirect.com/science/article/abs/pii/S0167639323000110).

**How we measure it**:
- OpenSMILE extracts F0 using autocorrelation on the sustained "aaah" recording
- Feature used: `F0semitoneFrom27.5Hz_sma3nz_amean` (converted from semitones to Hz)

**Scoring**:
```
< 85 Hz   → 100 (Very deep - Morgan Freeman territory)
85-100 Hz → 90-100 (Deep)
100-120 Hz → 70-90 (Below average)
120-145 Hz → 40-70 (Average male)
145-165 Hz → 20-40 (Above average)
> 165 Hz  → 0-20 (Higher)
```

**Category labels**:
- **Deep**: >= 70
- **Average**: 40-69
- **Higher**: < 40

---

### 2. Resonance (VTL-Based Masculinity)

**What it is**: A score (0-100) based on vocal tract length, indicating how "deep" and "full" your voice resonates.

**Why it matters**: VTL is the [second strongest predictor of voice gender perception](https://link.springer.com/article/10.3758/APP.71.5.1150). Men have vocal tracts that are 15-20% longer than women, producing lower formant frequencies and a characteristic "deeper" resonance independent of pitch.

**How we measure it**:
- Derived from **Vocal Tract Length (VTL)** estimate
- VTL is calculated from formant dispersion: `VTL = 35000 / (2 * avgFormantSpacing)`
- Where `avgFormantSpacing = (F3 - F1) / 2`

**Scoring**:
```
VTL >= 18 cm  → 100 (Very masculine)
VTL 15-18 cm  → 60-100 (Masculine range)
VTL 13-15 cm  → 20-60 (Neutral range)
VTL < 13 cm   → 0-20 (Feminine range)
```

**Category labels**:
- **Full**: >= 70
- **Moderate**: 40-69
- **Thin**: < 40

---

### 3. Power (Projection & Authority)

**What it is**: A score (0-100) measuring vocal projection, bass richness, and authority.

**Why it matters**: [Professional broadcast voices](https://www.sciencedirect.com/science/article/abs/pii/S089219971300088X) have characteristic spectral properties - strong low-frequency energy and presence in the 3-4kHz range (the "actor's formant").

**How we measure it**:
Combines three openSMILE features:
- **Alpha Ratio** (50%): Energy ratio below/above 1kHz - more negative = more bass
- **Hammarberg Index** (30%): Energy in 0-2kHz vs 2-5kHz - captures the "actor's formant"
- **Loudness** (20%): Perceived loudness in sones

**Formula**:
```
alphaComponent = min(100, max(0, (-alphaRatio / 12.0) * 100))
hammarbergComponent = min(100, max(0, ((hammarberg - 10.0) / 30.0) * 100))
loudnessComponent = min(100, max(0, (loudness / 1.5) * 100))

power = (alphaComponent * 0.5) + (hammarbergComponent * 0.3) + (loudnessComponent * 0.2)
```

**Category labels**:
- **Strong**: >= 70
- **Moderate**: 40-69
- **Soft**: < 40

---

### 4. Control (Voice Steadiness)

**What it is**: A score (0-100) measuring how steady and controlled your voice is.

**Why it matters**: Voice steadiness signals confidence and authority. Research shows that [lower perturbation values correlate with perceived trustworthiness](https://pmc.ncbi.nlm.nih.gov/articles/PMC11931160/) and competence.

**How we measure it**:
- **Jitter** (60%): Pitch cycle-to-cycle variation - lower = more stable pitch
- **Shimmer** (40%): Amplitude cycle-to-cycle variation - lower = smoother voice

**Formula**:
```
jitterComponent = max(0, min(100, (1.0 - (jitter / 3.0)) * 100))  // 0% = 100, 3% = 0
shimmerComponent = max(0, min(100, (1.0 - (shimmer / 4.0)) * 100)) // 0dB = 100, 4dB = 0

control = (jitterComponent * 0.6) + (shimmerComponent * 0.4)
```

**Clinical thresholds**:
- Jitter: <1% excellent, 1-2% good, >2% needs work
- Shimmer: <2dB excellent, 2-3dB good, >3dB needs work

**Category labels**:
- **Steady**: >= 70
- **Moderate**: 40-69
- **Variable**: < 40

---

## Overall Masculinity Score

**What it is**: A weighted composite score (0-100) combining all four primary metrics.

**Formula**:
```
overall = (depth * 0.35) + (resonance * 0.30) + (power * 0.20) + (control * 0.15)
```

**Why this weighting** (based on research):
- **Depth (35%)**: Primary perceptual cue for masculinity
- **Resonance (30%)**: Independent anatomical factor, second strongest predictor
- **Power (20%)**: Projection and authority, trainable
- **Control (15%)**: Confidence indicator, less directly tied to masculinity

**Category labels**:
| Score | Category |
|-------|----------|
| >= 80 | Excellent |
| 60-79 | Good |
| 40-59 | Average |
| < 40 | Needs Work |

---

## Supporting Metrics (Detailed View)

### Formant Frequencies (F1, F2, F3)

**What they are**: Resonance frequencies created by the shape of your vocal tract.

**Male vs Female formants**:
| Formant | Male Average | Female Average | Difference |
|---------|--------------|----------------|------------|
| F1 | ~500 Hz | ~590 Hz | ~18% higher |
| F2 | ~1450 Hz | ~1700 Hz | ~17% higher |
| F3 | ~2450 Hz | ~2850 Hz | ~14% higher |

### Vocal Tract Length (VTL)

- Male: 15-18 cm
- Female: 13-15 cm

### Alpha Ratio

Energy balance below/above 1kHz. More negative = more bass energy.

### Hammarberg Index

Energy ratio 0-2kHz vs 2-5kHz. Related to voice brightness and "actor's formant" presence.

### HNR (Harmonics-to-Noise Ratio)

Voice clarity metric. Higher = clearer voice. Not directly used for masculinity scoring but useful for voice health tracking.

---

## Metrics We DON'T Use for Primary Masculinity Scoring

| Metric | What It Measures | Why Secondary |
|--------|------------------|---------------|
| **HNR** | Voice clarity | Women typically have higher HNR than men - not a masculinity indicator |
| **Raw Jitter/Shimmer** | Voice health | Used in Control score but not displayed raw - can confuse users |

These are shown in detailed view for users who want more technical data.

---

## Technical Implementation

### OpenSMILE Configuration

```
Config: eGeMAPSv02_extsink.conf
Features: 88 acoustic parameters
Output: Real-time feature vector via cExternalSink
```

### Key OpenSMILE Features Used

| Our Metric | OpenSMILE Feature | Transform |
|------------|-------------------|-----------|
| Pitch (Hz) | `F0semitoneFrom27.5Hz_sma3nz_amean` | `27.5 * 2^(semitones/12)` |
| F1, F2, F3 | `F1/F2/F3frequency_sma3nz_amean` | Direct (Hz) |
| Alpha Ratio | `alphaRatioV_sma3nz_amean` | Direct (dB) |
| Hammarberg | `hammarbergIndexV_sma3nz_amean` | Direct (dB) |
| Loudness | `loudness_sma3_amean` | Direct (sones) |
| Jitter | `jitterLocal_sma3nz_amean` | × 100 (to %) |
| Shimmer | `shimmerLocaldB_sma3nz_amean` | Direct (dB) |
| HNR | `HNRdBACF_sma3nz_amean` | Direct (dB) |

### Native Module

- **iOS**: `OpenSmileBridge.mm` wraps the openSMILE C++ library
- **Expo Module**: `ExpoOpensmileModule.swift` exposes to JavaScript
- **TypeScript**: `services/audio/voice-analyzer.ts` provides the analysis API

---

## References

1. Eyben, F., et al. (2016). "[The Geneva Minimalistic Acoustic Parameter Set (GeMAPS) for Voice Research and Affective Computing](https://ieeexplore.ieee.org/document/7160715)." IEEE Transactions on Affective Computing.

2. Puts, D. A., et al. (2014). "[What makes a voice masculine: Physiological and acoustical correlates of women's ratings of men's vocal masculinity](https://www.sciencedirect.com/science/article/abs/pii/S0018506X14001639)." Hormones and Behavior.

3. Pisanski, K., et al. (2023). "[Acoustic characterization and machine prediction of perceived masculinity and femininity in adults](https://www.sciencedirect.com/science/article/abs/pii/S0167639323000110)." Speech Communication.

4. Smith, D. R., et al. (2009). "[The role of f0 and formant frequencies in distinguishing the voices of men and women](https://link.springer.com/article/10.3758/APP.71.5.1150)." Attention, Perception, & Psychophysics.

5. Leino, T., et al. (2011). "[Long-Term Average Spectrum in Screening of Voice Quality in Speech](https://www.sciencedirect.com/science/article/pii/S0892199718301851)." Journal of Voice.

6. Ferdenzi, C., et al. (2025). "[How do voice acoustics affect the perceived trustworthiness of a speaker?](https://pmc.ncbi.nlm.nih.gov/articles/PMC11931160/)" Frontiers in Psychology.

7. Titze, I. R. (1994). "Principles of Voice Production." Prentice Hall.
