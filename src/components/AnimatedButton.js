import React, { useRef } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import * as Haptics from 'expo-haptics';

const AnimatedButton = ({
  children,
  onPress,
  style,
  activeOpacity = 0.7,
  hapticFeedback = true,
  hapticStyle = 'medium',
  scaleValue = 0.95,
  ...props
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: scaleValue,
      friction: 5,
      useNativeDriver: true
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true
    }).start();
  };

  const handlePress = () => {
    if (hapticFeedback) {
      const hapticType = {
        light: Haptics.ImpactFeedbackStyle.Light,
        medium: Haptics.ImpactFeedbackStyle.Medium,
        heavy: Haptics.ImpactFeedbackStyle.Heavy
      }[hapticStyle] || Haptics.ImpactFeedbackStyle.Medium;

      Haptics.impactAsync(hapticType);
    }

    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      style={{}}
      {...props}
    >
      <Animated.View
        style={[
          style,
          {
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default AnimatedButton;
