import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { API_URL } from "../constants/api";

type Room = {
    id: number;
    nome: string;
    preco: number;
    camaCasal: number;
    camaSolteiro: number;
    disponivel: boolean;
    fotos: string[];
};

type AuthContextProps = {
    token: string | null;
    isLoading: boolean;
    availableRooms: Room[];
    signIn: (email: string, senha: string) => Promise<void>;
    // ordem: nome, cpf, telefone, email, senha
    signUp: (nome: string, cpf: string, telefone: string, email: string, senha: string) => Promise<void>;
    signOut: () => Promise<void>;
    consulta: (dataInicio: string, dataFim: string, quantidade: number) => Promise<void>;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [availableRooms, setAvailableRooms] = useState<Room[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const stored = await AsyncStorage.getItem("token");
                if (stored) setToken(stored);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    async function signIn(email: string, senha: string) {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, senha }),
        });
        if (!res.ok) {
            const err = await res.json().catch(() => null);
            throw new Error(err?.erro || "Credenciais inválidas");
        }
        const tokenAPI: string = await res.json();
        await AsyncStorage.setItem("token", tokenAPI);
        setToken(tokenAPI);
    }

    async function signUp(nome: string, cpf: string, telefone: string, email: string, senha: string) {
        try {
            const res = await fetch(`${API_URL}/login/cadastro`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome,
                    cpf: cpf.replace(/\D/g, ""),
                    telefone: telefone.replace(/\D/g, ""),
                    email,
                    senha,
                }),
            });

            const text = await res.text();

            if (!res.ok) {
                console.log("STATUS:", res.status);
                console.log("RESPOSTA:", text);
                throw new Error("Erro ao cadastrar");
            }

            let tokenAPI: string;
            try {
                const data = JSON.parse(text);
                tokenAPI = data.token ?? data;
            } catch {
                tokenAPI = text;
            }

            await AsyncStorage.setItem("token", tokenAPI);
            setToken(tokenAPI);
        } catch (error) {
            console.log("ERRO SIGNUP:", error);
            throw error;
        }
    }

    async function signOut() {
        await AsyncStorage.removeItem("token");
        setToken(null);
    }

    async function consulta(dataInicio: string, dataFim: string, quantidade: number) {
        const res = await fetch(`${API_URL}/quartosDisponiveis`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ dataInicio, dataFim, quantidade }),
        });

        if (!res.ok) {
            const err = await res.json().catch(() => null);
            throw new Error(err?.erro || err?.message || "Sem quartos disponiveis");
        }

        const json = await res.json();
        setAvailableRooms(json);
    }

    const value = useMemo(
        () => ({ token, isLoading, availableRooms, signIn, signUp, signOut, consulta }),
        [token, isLoading, availableRooms],
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth() deve ser usado dentro de AuthProvider");
    return ctx;
}