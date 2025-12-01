import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import PasswordField from "../ui/PasswordField";
import TextField from "../ui/TextField";
import { colors, spacing, typography } from "../ui/designTokens";
import { global } from "../ui/styles";

const RenderRegister = () => {
    const router = useRouter();

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
                placeholder="user@email.com"
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
                icon={{ lib: "MaterialIcons", name: "lock" }}
            />

            <TouchableOpacity style={global.primaryButton}>
                <Text style={global.primaryButtonText}>Criar conta</Text>
            </TouchableOpacity>

            <View style={{ alignItems: "center", marginTop: spacing.lg }}>
                <Text style={{ 
                    color: colors.textPrimary, 
                    fontSize: typography.size.sm, 
                    textAlign: "center" 
                }}>
                    Ao continuar você concorda com nossos Termos e Política de privacidade.
                </Text>

                <TouchableOpacity
                    style={{ marginTop: spacing.lg }}
                    onPress={() => router.back()}>
                    <Text style={{ 
                        color: colors.primary, 
                        fontWeight: typography.weight.semibold 
                    }}>
                        Já possui conta? Faça login
                    </Text>
                </TouchableOpacity>
            </View>
        </AuthContainer>
    )
}

export default RenderRegister;

