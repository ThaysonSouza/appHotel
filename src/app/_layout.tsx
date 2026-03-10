import AuthProvider from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { Stack } from "expo-router";

const RootLayout = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <ToastProvider>
                    <Stack screenOptions={{ headerShown: false }} />
                </ToastProvider>
            </CartProvider>
        </AuthProvider>
    );
}
export default RootLayout;