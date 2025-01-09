import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const CircleProgress = ({ percentage = 0 }) => {
  const radius = 10;
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  return (
    <View style={styles.container}>
      <Svg height={30} width={80}>
        {/* Background circle */}
        <Circle
          stroke="#e6e6e6" // Light gray for the unfilled part
          fill="transparent"
          cx="60"
          cy="15"
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Foreground circle (progress) */}
        <Circle
          stroke="#4ca6a8" // Teal color for progress
          fill="transparent"
          cx="60"
          cy="15"
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round" // Smooth edges for progress
        />
      </Svg>
      <Text style={styles.percentageText}>{percentage}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginRight: 30
  },
  percentageText: {
    fontSize: 24,
    color: '#4ca6a8', // Teal color to match the circle
    fontWeight: 'bold',
  },
});

export default CircleProgress;
