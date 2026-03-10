import React, { useEffect } from "react";
import { DimensionValue, ViewStyle } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming
} from "react-native-reanimated";
import { borderRadius, colors } from "./designTokens";

type Props = {
    width: DimensionValue;
    height: DimensionValue;
    radius?: number;
    style?: ViewStyle;
};

const Skeleton = ({ width, height, radius = borderRadius.md, style }: Props) => {
    const opacity = useSharedValue(0.3);

    useEffect(() => {
        opacity.value = withRepeat(
            withSequence(
                withTiming(0.7, { duration: 800 }),
                withTiming(0.3, { duration: 800 })
            ),
            -1, // Repetir infinitamente
            true // Reverter animação
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <Animated.View
            style={[
                {
                    width,
                    height,
                    borderRadius: radius,
                    backgroundColor: colors.border,
                },
                animatedStyle,
                style,
            ]}
        />
    );
};

export default Skeleton;
