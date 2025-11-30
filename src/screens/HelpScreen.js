import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HelpScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>How to Use Focus Companion</Text>
        </View>

        {/* Purpose Section */}
        <View style={styles.section}>
          <Text style={styles.sectionIcon}>🎯</Text>
          <Text style={styles.sectionTitle}>What is Focus Companion?</Text>
          <Text style={styles.bodyText}>
            Focus Companion helps you stay focused during study sessions by detecting when you unconsciously pick up your phone. Using on-device AI, it gently reminds you to refocus without being intrusive or judgmental.
          </Text>
          <Text style={styles.bodyText}>
            Students lose an average of 2.5 hours daily to phone distractions. This app helps you build awareness and discipline to reclaim that time.
          </Text>
        </View>

        {/* Critical: Neutral Position */}
        <View style={[styles.section, styles.criticalSection]}>
          <Text style={styles.sectionIcon}>⚡</Text>
          <Text style={styles.sectionTitle}>IMPORTANT: Start in Neutral Position</Text>
          <Text style={styles.criticalText}>
            Before starting a session, place your phone in a stable, neutral position:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletPoint}>✓ <Text style={styles.bold}>Face up</Text> on your desk (screen facing ceiling)</Text>
            <Text style={styles.bulletPoint}>✓ <Text style={styles.bold}>Face down</Text> on your desk (screen facing table)</Text>
            <Text style={styles.bulletPoint}>✓ <Text style={styles.bold}>On its side</Text> leaning against something stable</Text>
            <Text style={styles.bulletPoint}>✓ <Text style={styles.bold}>In a phone stand</Text> at any angle</Text>
          </View>
          <Text style={styles.criticalText}>
            The AI learns this position as your "focused state." When you pick up the phone, it detects the motion change and triggers a gentle reminder.
          </Text>
        </View>

        {/* How to Start a Session */}
        <View style={styles.section}>
          <Text style={styles.sectionIcon}>🚀</Text>
          <Text style={styles.sectionTitle}>Starting a Session</Text>
          <View style={styles.numberedList}>
            <Text style={styles.numberedPoint}><Text style={styles.bold}>1.</Text> Choose a session type (Deep Work, Light Review, or Flashcards)</Text>
            <Text style={styles.numberedPoint}><Text style={styles.bold}>2.</Text> Place phone in neutral position on your desk</Text>
            <Text style={styles.numberedPoint}><Text style={styles.bold}>3.</Text> Tap "Start Session"</Text>
            <Text style={styles.numberedPoint}><Text style={styles.bold}>4.</Text> Wait 3 seconds for calibration (phone learns neutral state)</Text>
            <Text style={styles.numberedPoint}><Text style={styles.bold}>5.</Text> Start studying! AI detection is now active</Text>
          </View>
        </View>

        {/* Understanding Detection */}
        <View style={styles.section}>
          <Text style={styles.sectionIcon}>🤖</Text>
          <Text style={styles.sectionTitle}>How Detection Works</Text>
          <Text style={styles.bodyText}>
            The "AI Detection Active" badge shows the machine learning model is monitoring your phone's accelerometer and gyroscope in real-time.
          </Text>
          <Text style={styles.bodyText}>
            When you pick up your phone, the AI detects the motion change and:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletPoint}>• Flashes the screen red briefly</Text>
            <Text style={styles.bulletPoint}>• Vibrates with haptic feedback</Text>
            <Text style={styles.bulletPoint}>• Shows a gentle refocus reminder</Text>
            <Text style={styles.bulletPoint}>• Auto-resumes after 3 seconds</Text>
          </View>
          <Text style={styles.bodyText}>
            All processing happens on your device - no internet required, complete privacy.
          </Text>
        </View>

        {/* Refocus Screen */}
        <View style={styles.section}>
          <Text style={styles.sectionIcon}>🌊</Text>
          <Text style={styles.sectionTitle}>The Refocus Screen</Text>
          <Text style={styles.bodyText}>
            When you pick up your phone, you'll see a calming gradient screen with:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletPoint}>• A breathing emoji (varied each time for engagement)</Text>
            <Text style={styles.bulletPoint}>• A personal, encouraging message</Text>
            <Text style={styles.bulletPoint}>• A 3-second countdown before auto-resume</Text>
          </View>
          <Text style={styles.bodyText}>
            This isn't a punishment - it's a gentle nudge to ask: "Did I really need my phone right now?"
          </Text>
        </View>

        {/* Dismiss System */}
        <View style={styles.section}>
          <Text style={styles.sectionIcon}>👍</Text>
          <Text style={styles.sectionTitle}>False Positive? Dismiss It</Text>
          <Text style={styles.bodyText}>
            Sometimes you need to pick up your phone for a legitimate reason (checking the time, calculator, etc.).
          </Text>
          <Text style={styles.bodyText}>
            You get <Text style={styles.bold}>3 dismisses per session</Text>. Tap "Not a distraction? Dismiss" to resume immediately without penalty.
          </Text>
          <Text style={styles.bodyText}>
            Use these wisely - they're for genuine needs, not excuses!
          </Text>
        </View>

        {/* Focus Score */}
        <View style={styles.section}>
          <Text style={styles.sectionIcon}>📊</Text>
          <Text style={styles.sectionTitle}>Understanding Your Focus Score</Text>
          <Text style={styles.bodyText}>
            After each session, you'll see a focus score (0-100%). Here's how it works:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletPoint}>• Each distraction = 30 seconds of lost focus time</Text>
            <Text style={styles.bulletPoint}>• Score = (focused time / total time) × 100</Text>
            <Text style={styles.bulletPoint}>• Bonus points for low distraction rates:</Text>
            <View style={styles.subBulletList}>
              <Text style={styles.subBulletPoint}>→ ≤1 per 10 min = +5% bonus</Text>
              <Text style={styles.subBulletPoint}>→ ≤2 per 10 min = +2% bonus</Text>
            </View>
          </View>
          <Text style={styles.bodyText}>
            Track your scores over time to see your focus improve!
          </Text>
        </View>

        {/* Tips for Best Results */}
        <View style={styles.section}>
          <Text style={styles.sectionIcon}>💡</Text>
          <Text style={styles.sectionTitle}>Tips for Best Results</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletPoint}>✓ Keep your phone in the same position throughout the session</Text>
            <Text style={styles.bulletPoint}>✓ Place it slightly out of arm's reach (but still visible for timer)</Text>
            <Text style={styles.bulletPoint}>✓ Enable Do Not Disturb to minimize notification temptation</Text>
            <Text style={styles.bulletPoint}>✓ If detection seems too sensitive, try a more stable surface</Text>
            <Text style={styles.bulletPoint}>✓ Review your stats regularly to track progress</Text>
            <Text style={styles.bulletPoint}>✓ Aim to reduce distractions over time, not eliminate them completely</Text>
          </View>
        </View>

        {/* Session Types */}
        <View style={styles.section}>
          <Text style={styles.sectionIcon}>📚</Text>
          <Text style={styles.sectionTitle}>Session Types Explained</Text>

          <Text style={styles.sessionTypeTitle}>Deep Work (45 minutes)</Text>
          <Text style={styles.bodyText}>
            For intensive study requiring maximum concentration. Use for difficult subjects, problem-solving, or writing assignments.
          </Text>

          <Text style={styles.sessionTypeTitle}>Light Review (25 minutes)</Text>
          <Text style={styles.bodyText}>
            For lighter study tasks like reviewing notes, reading textbooks, or practicing concepts you already understand.
          </Text>

          <Text style={styles.sessionTypeTitle}>Flashcards (10 minutes)</Text>
          <Text style={styles.bodyText}>
            Quick drill sessions for memorization, vocabulary practice, or rapid-fire review before exams.
          </Text>
        </View>

        {/* Privacy */}
        <View style={styles.section}>
          <Text style={styles.sectionIcon}>🔒</Text>
          <Text style={styles.sectionTitle}>Your Privacy Matters</Text>
          <Text style={styles.bodyText}>
            Focus Companion runs 100% on your device. No data is sent to servers, no internet connection required, and no tracking of any kind.
          </Text>
          <Text style={styles.bodyText}>
            Your session history is stored locally on your phone and never leaves your device.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Ready to build focus superpowers? 💪</Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.getStartedButton}
          >
            <Text style={styles.getStartedButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB'
  },
  scrollView: {
    flex: 1
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40
  },
  header: {
    marginTop: 16,
    marginBottom: 24
  },
  backButton: {
    marginBottom: 12
  },
  backButtonText: {
    fontSize: 16,
    color: '#6366F1',
    fontWeight: '600'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  criticalSection: {
    backgroundColor: '#FEF3C7',
    borderWidth: 2,
    borderColor: '#F59E0B'
  },
  sectionIcon: {
    fontSize: 32,
    marginBottom: 12
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#4B5563',
    marginBottom: 12
  },
  criticalText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#92400E',
    marginBottom: 12,
    fontWeight: '500'
  },
  bold: {
    fontWeight: '700'
  },
  bulletList: {
    marginLeft: 8,
    marginBottom: 12
  },
  bulletPoint: {
    fontSize: 15,
    lineHeight: 28,
    color: '#4B5563'
  },
  subBulletList: {
    marginLeft: 24,
    marginTop: 4
  },
  subBulletPoint: {
    fontSize: 14,
    lineHeight: 24,
    color: '#6B7280'
  },
  numberedList: {
    marginLeft: 8
  },
  numberedPoint: {
    fontSize: 15,
    lineHeight: 28,
    color: '#4B5563',
    marginBottom: 8
  },
  sessionTypeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6366F1',
    marginTop: 12,
    marginBottom: 8
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16
  },
  footerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16
  },
  getStartedButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4
  },
  getStartedButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700'
  }
});

export default HelpScreen;
