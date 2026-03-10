import AuthProvider from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { Stack } from "expo-router";

const RootLayout = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <Stack screenOptions={{ headerShown: false }} />
            </CartProvider>
        </AuthProvider>
    );
}
export default RootLayout;