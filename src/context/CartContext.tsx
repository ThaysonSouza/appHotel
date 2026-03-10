import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
    id: number;
    nome: string;
    preco: number;
    imageUri?: string;
    checkIn?: string;
    checkOut?: string;
    camaCasal?: number;
    camaSolteiro?: number;
};

type CartContextProps = {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    searchDates: { checkIn: string; checkOut: string };
    setSearchDates: (checkIn: string, checkOut: string) => void;
};

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [searchDates, setDates] = useState({ checkIn: "", checkOut: "" });

    // Persistir carrinho (opcional, mas recomendado)
    useEffect(() => {
        (async () => {
            const stored = await AsyncStorage.getItem("cart");
            if (stored) setCartItems(JSON.parse(stored));
        })();
    }, []);

    const saveCart = async (items: CartItem[]) => {
        setCartItems(items);
        await AsyncStorage.setItem("cart", JSON.stringify(items));
    };

    const addToCart = (item: CartItem) => {
        // Verificar se já existe
        const exists = cartItems.find((i) => i.id === item.id);
        if (!exists) {
            const newItems = [...cartItems, item];
            saveCart(newItems);
        }
    };

    const removeFromCart = (id: number) => {
        const newItems = cartItems.filter((i) => i.id !== id);
        saveCart(newItems);
    };

    const clearCart = () => saveCart([]);

    const setSearchDates = (checkIn: string, checkOut: string) => {
        setDates({ checkIn, checkOut });
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                searchDates,
                setSearchDates,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart deve ser usado dentro de CartProvider");
    return ctx;
};
