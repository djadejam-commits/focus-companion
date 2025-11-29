# Edge Impulse Model Files

This directory will contain your trained Edge Impulse model files.

## Setup Instructions

After training your model in Edge Impulse Studio (following the EDGE_IMPULSE_GUIDE.md):

1. Go to **Deployment** tab in Edge Impulse Studio
2. Select **JavaScript (WASM)**
3. Click **Build**
4. Download the generated zip file
5. Extract the contents to this directory

## Expected Files

You should have these files after extraction:

```
src/edge-impulse/
├── edge-impulse-standalone.js     ← Main inference library
├── edge-impulse-standalone.wasm   ← WebAssembly binary
├── model-parameters.json          ← Model configuration
└── README.md                      ← This file
```

## Integration

Once the files are in place, update `src/services/MotionService.js`:

1. Uncomment the import line at the top:
   ```javascript
   import * as ei from '../edge-impulse/edge-impulse-standalone';
   ```

2. In the `runInference()` method, uncomment the Edge Impulse integration section (OPTION 1)

3. Comment out or remove the simple heuristic detection (OPTION 2)

## Testing

After integration:

1. Run the app: `npm start`
2. Start a session
3. Perform a pickup gesture
4. Verify detection triggers the refocus screen

## Troubleshooting

**Error: Cannot find module '../edge-impulse/edge-impulse-standalone'**
- Make sure files are extracted to this directory
- Check file names match exactly

**Detection not working**
- Check model accuracy in Edge Impulse (should be ≥85%)
- Try adjusting threshold in `MotionService.js` (default: 0.7)
- Verify sensor data is being collected (check console logs)

**False positives**
- Increase threshold: 0.7 → 0.8 → 0.9
- Collect more "not_pickup" training samples
- Retrain model with more diverse data

**Missing real pickups**
- Decrease threshold: 0.7 → 0.6 → 0.5
- Collect more varied "pickup" samples
- Check that pickup gesture matches training data

## Fallback Mode

If Edge Impulse model is not available, the app will use a simple heuristic detection based on acceleration magnitude. This is less accurate but allows testing the app flow.

To use the app with full ML capabilities, complete the Edge Impulse training and add the model files here.
