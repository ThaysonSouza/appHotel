import { Feather } from "@expo/vector-icons";
import React, { createContext, useCallback, useContext, useState } from "react";
import { StyleSheet, Text } from "react-native";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSequence,
    withTiming
} from "react-native-reanimated";
import { borderRadius, colors, shadows, spacing, typography } from "../components/ui/designTokens";

type ToastType = "success" | "error" | "info";

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
    const translateY = useSharedValue(-100);

    const hideToast = useCallback(() => {
        setToast(null);
    }, []);

    const showToast = useCallback((message: string, type: ToastType = "info") => {
        setToast({ message, type });
        translateY.value = withSequence(
            withTiming(50, { duration: 500 }),
            withDelay(
                2500,
                withTiming(-100, { duration: 500 }, (finished) => {
                    if (finished) {
                        runOnJS(hideToast)();
                    }
                })
            )
        );
    }, [hideToast]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    const getIcon = (type: ToastType) => {
        switch (type) {
            case "success": return "check-circle";
            case "error": return "alert-circle";
            default: return "info";
        }
    };

    const getBackgroundColor = (type: ToastType) => {
        switch (type) {
            case "success": return colors.success;
            case "error": return colors.error;
            default: return colors.primary;
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <Animated.View style={[styles.container, animatedStyle, { backgroundColor: getBackgroundColor(toast.type) }]}>
                    <Feather name={getIcon(toast.type)} size={20} color={colors.white} />
                    <Text style={styles.text}>{toast.message}</Text>
                </Animated.View>
            )}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast must be used within a ToastProvider");
    return context;
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: spacing.xl,
        right: spacing.xl,
        flexDirection: "row",
        alignItems: "center",
        padding: spacing.base,
        borderRadius: borderRadius.lg,
        ...shadows.lg,
        zIndex: 9999,
    },
    text: {
        color: colors.white,
        marginLeft: spacing.md,
        fontWeight: typography.weight.semibold,
        fontSize: typography.size.sm,
        flex: 1,
    },
});
