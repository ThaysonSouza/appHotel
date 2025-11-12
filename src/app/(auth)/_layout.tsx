/*Função: definir o fluxo de navegação entre as telas de autenticação: Login, Register, ResetPassword
Sobreposição de telas: Stack Navigator, 3 funções para manipular o empilhamento:
push(): empilha a tela atual sobre a anterior
back(): remove a tela atual e retorna à tela anterior empilhada
replace(): subtitui a tela atual pela próxima */

import { Stack } from "expo-router";

const Authlayout = () => {
    return(
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index" options={{title: "login"}} />
            {/*Stack.Screen name="register" options={{title: "Cadastro"}}*/}
            {/*Stack.Screen name="resetPassword" options={{title: "Esqueci minha senha"}}*/}
        </Stack>
    )
}

export default Authlayout;