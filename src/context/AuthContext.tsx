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

type User = {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
};

type AuthContextProps = {
    token: string | null;
    user: User | null;
    isLoading: boolean;
    availableRooms: Room[];
    signIn: (email: string, senha: string) => Promise<void>;
    signUp: (nome: string, cpf: string, telefone: string, email: string, senha: string) => Promise<void>;
    signOut: () => Promise<void>;
    consulta: (dataInicio: string, dataFim: string, quantidade: number) => Promise<void>;
    getUserProfile: () => Promise<User>;
    updatePassword: (senhaAtual: string, novaSenha: string) => Promise<void>;
    updateProfile: (nome: string, email: string, telefone: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
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

    async function getUserProfile(): Promise<User> {
        if (!token) throw new Error("Não autenticado");
        const res = await fetch(`${API_URL}/perfil`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) {
            const err = await res.json().catch(() => null);
            throw new Error(err?.erro || "Erro ao buscar perfil");
        }

        const userData = await res.json();
        setUser(userData);
        return userData;
    }

    async function updatePassword(senhaAtual: string, novaSenha: string): Promise<void> {
        if (!token) throw new Error("Não autenticado");
        const res = await fetch(`${API_URL}/perfil/senha`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ senhaAtual, novaSenha })
        });

        if (!res.ok) {
            const err = await res.json().catch(() => null);
            throw new Error(err?.erro || "Erro ao atualizar senha");
        }
    }

    async function updateProfile(nome: string, email: string, telefone: string): Promise<void> {
        if (!token) throw new Error("Não autenticado");
        const res = await fetch(`${API_URL}/perfil`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ nome, email, telefone: telefone.replace(/\D/g, "") })
        });

        if (!res.ok) {
            const err = await res.json().catch(() => null);
            throw new Error(err?.erro || "Erro ao atualizar perfil");
        }

        // Atualiza o estado local do usuário após sucesso
        if (user) {
            setUser({ ...user, nome, email, telefone });
        }
    }

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
        setUser(null);
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
        () => ({ token, user, isLoading, availableRooms, signIn, signUp, signOut, consulta, getUserProfile, updatePassword, updateProfile }),
        [token, user, isLoading, availableRooms],
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth() deve ser usado dentro de AuthProvider");
    return ctx;
}