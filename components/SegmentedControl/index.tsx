import React, { useCallback, useEffect } from "react";
import {
  LayoutChangeEvent,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  Text,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from "react-native-reanimated";

import Fontisto from "@expo/vector-icons/Fontisto";

import { GestureHandlerRootView } from "react-native-gesture-handler";

interface SegmentedControlProps {
  segments: string[];
  selectedIndex: number;
  onChange?: (index: number) => void;
  containerStyle?: ViewStyle;
  activeTextColor?: string;
  inactiveTextColor?: string;
  backgroundColor?: string;
  activeSegmentColor?: string;
  springConfig?: WithSpringConfig;
  borderRadius?: number;
}

const DEFAULT_SPRING_CONFIG: WithSpringConfig = {
  damping: 20,
  mass: 1,
  stiffness: 150,
  overshootClamping: false,
  restDisplacementThreshold: 0.001,
  restSpeedThreshold: 0.001,
};

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  segments,
  selectedIndex,
  onChange,
  containerStyle,
  activeTextColor = "#FFFFFF",
  inactiveTextColor = "#000000",
  backgroundColor = "#E5E5EA",
  activeSegmentColor = "#007AFF",
  borderRadius = 40,
  springConfig = DEFAULT_SPRING_CONFIG,
}) => {
  const translateX = useSharedValue(0);
  const segmentWidth = useSharedValue(0);

  useEffect(() => {
    translateX.value = withSpring(
      selectedIndex * segmentWidth.value,
      springConfig
    );
  }, [selectedIndex, segmentWidth.value, springConfig]);

  const handleLayout = useCallback(
    ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
      segmentWidth.value = layout.width / segments.length - 4;
    },
    [segments.length]
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: segmentWidth.value,
  }));

  return (
    <GestureHandlerRootView
      style={[
        styles.container,
        { backgroundColor, borderRadius },
        containerStyle,
      ]}
      onLayout={handleLayout}
    >
      <Animated.View
        style={[
          { borderRadius: borderRadius },
          styles.activeSegment,
          { backgroundColor: activeSegmentColor, margin: 4 },
          animatedStyle,
        ]}
      />
      {segments.map((segment, index) => (
        <TouchableWithoutFeedback key={segment} onPress={() => onChange(index)}>
          <View
            style={[styles.segment, { width: `${100 / segments.length}%` }]}
          >
            <Fontisto
              name={segment}
              size={16}
              color={
                selectedIndex === index ? activeTextColor : inactiveTextColor
              }
            />
          </View>
        </TouchableWithoutFeedback>
      ))}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "relative",
    borderRadius: 8,
    overflow: "hidden",
    height: 36,
  },
  segment: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  segmentText: {
    fontSize: 16,
  },
  activeSegment: {
    position: "absolute",
    top: 0,
    bottom: 0,
  },
});
