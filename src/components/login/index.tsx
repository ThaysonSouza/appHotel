import TextField from "../ui/TextField";
import AuthContainer from "../ui/AuthContainer";
import PasswordField from "../ui/PasswordField";
import { TouchableOpacity } from "react-native";
import { global } from "../ui/styles";
import { Text } from "@react-navigation/elements";

const RenderLogin = () => {
    return (
        <AuthContainer
            title="Bem-vindo"
            subtitle="Faça seu login para continuar!"
            icon="hotel">
            
            <TextField
                label="E-mail"
                icon={"email"}
                placeholder="email@gmail.com"
                keyboardType="email-address">
            </TextField>

            <PasswordField
            label="Senha"
            icon={"lock"}
            placeholder="Digite sua senha">
            </PasswordField>

            <TouchableOpacity style={[global.primaryButton]}>
                <Text style={global.primaryButtonText}>Entrar</Text>
            </TouchableOpacity>
        
        </AuthContainer>
    )
};

export default RenderLogin;