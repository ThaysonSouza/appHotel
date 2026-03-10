import * as Haptics from "expo-haptics";
import React from "react";
import { Pressable, StyleSheet, Text, TextStyle, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { borderRadius, colors, dimensions, shadows, spacing, typography } from "./designTokens";

type Props = {
    title?: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    variant?: "primary" | "outline" | "ghost";
    disabled?: boolean;
    children?: React.ReactNode;
};

const FeedbackButton = ({ title, onPress, style, textStyle, variant = "primary", disabled, children }: Props) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.96);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
    };

    const handlePress = () => {
        if (!disabled) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onPress();
        }
    };

    const getVariantStyles = () => {
        switch (variant) {
            case "outline":
                return {
                    container: {
                        backgroundColor: "transparent",
                        borderWidth: 2,
                        borderColor: colors.primary,
                    },
                    text: { color: colors.primary },
                };
            case "ghost":
                return {
                    container: { backgroundColor: "transparent" },
                    text: { color: colors.primary },
                };
            default:
                return {
                    container: {
                        backgroundColor: colors.primary,
                        ...shadows.md,
                    },
                    text: { color: colors.white },
                };
        }
    };

    const variantStyles = getVariantStyles();

    return (
        <Animated.View style={[animatedStyle]}>
            <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handlePress}
                disabled={disabled}
                style={[
                    styles.base,
                    variantStyles.container,
                    disabled && styles.disabled,
                    style,
                ]}
            >
                {children ? children : (
                    <Text style={[styles.text, variantStyles.text, textStyle]}>
                        {title}
                    </Text>
                )}
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    base: {
        height: dimensions.buttonHeight,
        borderRadius: borderRadius.lg,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: spacing.xl,
    },
    text: {
        fontWeight: typography.weight.bold,
        fontSize: typography.size.base,
        letterSpacing: 0.5,
    },
    disabled: {
        backgroundColor: colors.disabled,
        borderColor: colors.disabled,
        opacity: 0.6,
    },
});

export default FeedbackButton;
