import { Children, createContext } from "react";

type AuthContextProps = {
    token: string | null;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    return <AuthContext.Provider value = {value}></AuthContext.Provider>;
}

export { AuthContext, AuthProvider }