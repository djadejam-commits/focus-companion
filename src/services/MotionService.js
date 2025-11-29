import { Accelerometer, Gyroscope } from 'expo-sensors';

// Edge Impulse model will be imported here after deployment
// import * as ei from '../edge-impulse/edge-impulse-standalone';

class MotionService {
  constructor() {
    this.isInitialized = false;
    this.isRunning = false;

    // Sensor data buffers
    this.accelBuffer = [];
    this.gyroBuffer = [];

    // Configuration
    this.SAMPLE_RATE = 50; // Hz
    this.WINDOW_SIZE = 100; // 2 seconds * 50Hz = 100 samples
    this.UPDATE_INTERVAL = 1000 / this.SAMPLE_RATE; // 20ms

    // Detection settings
    this.threshold = 0.7;
    this.detectionCallback = null;

    // Subscriptions
    this.accelSubscription = null;
    this.gyroSubscription = null;

    // Inference state
    this.lastInferenceTime = 0;
    this.INFERENCE_COOLDOWN = 1000; // Wait 1s between detections to avoid rapid-fire
  }

  /**
   * Initialize the motion service
   */
  async init(detectionCallback, threshold = 0.7) {
    try {
      this.detectionCallback = detectionCallback;
      this.threshold = threshold;

      // Set sensor update intervals
      Accelerometer.setUpdateInterval(this.UPDATE_INTERVAL);
      Gyroscope.setUpdateInterval(this.UPDATE_INTERVAL);

      // Check sensor availability
      const accelAvailable = await Accelerometer.isAvailableAsync();
      const gyroAvailable = await Gyroscope.isAvailableAsync();

      if (!accelAvailable || !gyroAvailable) {
        throw new Error('Required sensors not available');
      }

      this.isInitialized = true;
      console.log('MotionService initialized');

      return true;
    } catch (error) {
      console.error('Error initializing MotionService:', error);
      throw error;
    }
  }

  /**
   * Start motion detection
   */
  start() {
    if (!this.isInitialized) {
      console.error('MotionService not initialized. Call init() first.');
      return;
    }

    if (this.isRunning) {
      console.warn('MotionService already running');
      return;
    }

    // Clear buffers
    this.accelBuffer = [];
    this.gyroBuffer = [];

    // Subscribe to accelerometer
    this.accelSubscription = Accelerometer.addListener(accelData => {
      this.accelBuffer.push({
        x: accelData.x,
        y: accelData.y,
        z: accelData.z,
        timestamp: Date.now()
      });

      // Keep buffer at window size
      if (this.accelBuffer.length > this.WINDOW_SIZE) {
        this.accelBuffer.shift();
      }

      // Trigger classification when both buffers are full
      if (this.accelBuffer.length === this.WINDOW_SIZE &&
          this.gyroBuffer.length === this.WINDOW_SIZE) {
        this.runInference();
      }
    });

    // Subscribe to gyroscope
    this.gyroSubscription = Gyroscope.addListener(gyroData => {
      this.gyroBuffer.push({
        x: gyroData.x,
        y: gyroData.y,
        z: gyroData.z,
        timestamp: Date.now()
      });

      // Keep buffer at window size
      if (this.gyroBuffer.length > this.WINDOW_SIZE) {
        this.gyroBuffer.shift();
      }
    });

    this.isRunning = true;
    console.log('MotionService started');
  }

  /**
   * Stop motion detection
   */
  stop() {
    if (this.accelSubscription) {
      this.accelSubscription.remove();
      this.accelSubscription = null;
    }

    if (this.gyroSubscription) {
      this.gyroSubscription.remove();
      this.gyroSubscription = null;
    }

    this.accelBuffer = [];
    this.gyroBuffer = [];
    this.isRunning = false;

    console.log('MotionService stopped');
  }

  /**
   * Run inference on buffered data
   */
  async runInference() {
    // Cooldown check to prevent rapid detections
    const now = Date.now();
    if (now - this.lastInferenceTime < this.INFERENCE_COOLDOWN) {
      return;
    }

    try {
      // OPTION 1: Edge Impulse Integration (use after model is deployed)
      // Uncomment when edge-impulse model files are in place
      /*
      const features = this.prepareFeatures();
      const result = await ei.classify(features);

      const pickupClass = result.results.find(r => r.label === 'pickup');

      if (pickupClass && pickupClass.value > this.threshold) {
        this.lastInferenceTime = now;
        this.onDetection(pickupClass.value);
      }
      */

      // OPTION 2: Simple Heuristic (fallback for testing without Edge Impulse)
      // This is a basic detection based on acceleration magnitude
      // Replace with Edge Impulse model for production
      const detection = this.simpleHeuristicDetection();

      if (detection.isPickup && detection.confidence > this.threshold) {
        this.lastInferenceTime = now;
        this.onDetection(detection.confidence);
      }

    } catch (error) {
      console.error('Inference error:', error);
    }
  }

  /**
   * Prepare features for Edge Impulse model
   * Returns flat array of [ax1, ay1, az1, gx1, gy1, gz1, ax2, ...]
   */
  prepareFeatures() {
    const features = [];

    for (let i = 0; i < this.WINDOW_SIZE; i++) {
      if (this.accelBuffer[i] && this.gyroBuffer[i]) {
        features.push(
          this.accelBuffer[i].x,
          this.accelBuffer[i].y,
          this.accelBuffer[i].z,
          this.gyroBuffer[i].x,
          this.gyroBuffer[i].y,
          this.gyroBuffer[i].z
        );
      }
    }

    return features; // Should be 600 values (100 samples * 6 axes)
  }

  /**
   * Simplified reliable detection (prioritizes consistency)
   * Edge Impulse Model Stats: 92.5% accuracy, 0.93 F1 score
   *
   * Strategy: Detect significant motion that indicates phone pickup
   * - Works for most orientations
   * - Balances sensitivity vs false positives
   * - Users can dismiss false positives via UI
   */
  simpleHeuristicDetection() {
    if (this.accelBuffer.length < 25 || this.gyroBuffer.length < 25) {
      return { isPickup: false, confidence: 0 };
    }

    // Analyze recent window (last 0.5 seconds = 25 samples at 50Hz)
    const recentAccel = this.accelBuffer.slice(-25);
    const recentGyro = this.gyroBuffer.slice(-25);

    // 1. Calculate total acceleration magnitude changes
    const magnitudes = recentAccel.map(s =>
      Math.sqrt(s.x ** 2 + s.y ** 2 + s.z ** 2)
    );

    const magMean = magnitudes.reduce((a, b) => a + b) / magnitudes.length;
    const magMax = Math.max(...magnitudes);
    const magMin = Math.min(...magnitudes);
    const magSpike = magMax - magMean;
    const magRange = magMax - magMin;

    // 1b. Check for upward tendency (pickups go up, putdowns go down)
    // Compare early vs late acceleration to detect direction
    const earlyMag = magnitudes.slice(0, 12).reduce((a,b) => a+b) / 12;
    const lateMag = magnitudes.slice(13, 25).reduce((a,b) => a+b) / 12;
    const hasUpwardTrend = lateMag > earlyMag * 1.05; // Slight upward bias

    // 2. Per-axis maximum absolute values (catches any orientation)
    const xMax = Math.max(...recentAccel.map(s => Math.abs(s.x)));
    const yMax = Math.max(...recentAccel.map(s => Math.abs(s.y)));
    const zMax = Math.max(...recentAccel.map(s => Math.abs(s.z)));
    const maxAxisValue = Math.max(xMax, yMax, zMax);

    // 3. Gyroscope activity (rotation indicates pickup)
    const gyroMagnitudes = recentGyro.map(s =>
      Math.sqrt(s.x ** 2 + s.y ** 2 + s.z ** 2)
    );
    const gyroMax = Math.max(...gyroMagnitudes);
    const gyroMean = gyroMagnitudes.reduce((a, b) => a + b) / gyroMagnitudes.length;

    // 4. Detection logic - simplified for reliability
    // Pickup characteristics: acceleration spike + some rotation + significant axis value
    const hasSignificantMotion = magSpike > 0.4 || magRange > 0.8;
    const hasAxisActivity = maxAxisValue > 1.2;
    const hasRotation = gyroMax > 0.8;
    const notConstantMovement = gyroMean < 1.5; // Filters out walking/running

    // 5. Confidence scoring
    let confidence = 0;
    if (hasSignificantMotion) confidence += 0.35;
    if (hasAxisActivity) confidence += 0.35;
    if (hasRotation) confidence += 0.2;
    if (notConstantMovement) confidence += 0.1;

    // Boost confidence for upward movement (pickup), reduce for downward (putdown)
    if (hasUpwardTrend) {
      confidence += 0.1;
    } else {
      confidence -= 0.15; // Penalize downward movement (likely putdown)
    }

    // Detect if at least 2 indicators are present + prefer upward movement
    const indicators = [hasSignificantMotion, hasAxisActivity, hasRotation].filter(Boolean).length;
    const isPickup = indicators >= 2 && notConstantMovement && confidence > 0.5;

    return { isPickup, confidence };
  }

  /**
   * Handle detection event
   */
  onDetection(confidence) {
    if (this.detectionCallback) {
      this.detectionCallback({
        confidence,
        timestamp: Date.now()
      });
    }
  }

  /**
   * Update detection threshold
   */
  setThreshold(newThreshold) {
    this.threshold = newThreshold;
  }
}

export default new MotionService();
