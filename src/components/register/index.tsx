import { useRouter } from "expo-router";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import PasswordField from "../ui/PasswordField";
import TextField from "../ui/TextField";
import { global } from "../ui/styles";

const RenderRegister = () => {
    const router = useRouter();
    const { height } = Dimensions.get("window");

    return (
        <AuthContainer
            title="Crie sua conta"
            subtitle="Preencha os dados e comece a reservar!"
            icon="user">

            <TextField
                label="Nome completo"
                placeholder="Digite seu nome"
                icon={{ lib: "FontAwesome6", name: "user" }}
                autoCapitalize="words"
            />

            <TextField
                label="E-mail"
                placeholder="usuario@email.com"
                keyboardType="email-address"
                icon={{ lib: "MaterialIcons", name: "email" }}
                autoCapitalize="none"
            />

            <TextField
                label="Telefone"
                placeholder="(11) 99999-9999"
                keyboardType="phone-pad"
                icon={{ lib: "MaterialIcons", name: "phone" }}
            />

            <PasswordField
                label="Senha"
                placeholder="********"
                icon={{ lib: "MaterialIcons", name: "lock" }}
            />

            <PasswordField
                label="Confirmar senha"
                placeholder="Repita a senha"
                icon={{ lib: "FontAwesome6", name: "lock" }}
            />

            <TouchableOpacity style={global.primaryButton}>
                <Text style={global.primaryButtonText}>Criar conta</Text>
            </TouchableOpacity>

            <View style={{ alignItems: "center", marginTop: height * 0.02 }}>
                <Text style={{ color: "#49225B", fontSize: 13, textAlign: "center" }}>
                    Ao continuar você concorda com nossos Termos e Política de privacidade.
                </Text>

                <TouchableOpacity
                    style={{ marginTop: height * 0.02 }}
                    onPress={() => router.replace("/")}>
                    <Text style={{ color: "#6E3482", fontWeight: "600" }}>
                        Já possui conta? Faça login
                    </Text>
                </TouchableOpacity>
            </View>
        </AuthContainer>
    )
}

export default RenderRegister;

