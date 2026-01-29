import { Dimensions, View } from "react-native";
import DatePicker, { getToday } from "react-native-modern-datepicker";
import { colors } from "./designTokens";

type Props = {
  onSelectDate: (date: string) => void;
};

const DateSelector = ({ onSelectDate }: Props) => {
  const { width } = Dimensions.get("window"); // Componente para dimensionar largura e altura (responsividade)
  const today = getToday();
  
  return (
    <View>
      <DatePicker
        mode="calendar"
        options={{
          backgroundColor: colors.lighter, // Fundo (background)
          textHeaderColor: colors.primary, // Mês
          textDefaultColor: colors.deepPurple, // Número (data)
          selectedTextColor: colors.white, // Cor do número (data) quando selecionado
          mainColor: colors.primary, // Setas laterais e seletor
          textSecondaryColor: colors.deepPurple, // Dia da semana
          borderColor: colors.primary, // Borda
          textFontSize: 14, // Tamanho da fonte (dias da semana e número -> data)
          textHeaderFontSize: 15, // Tamanho da fonte (mês)
        }}
        style={{ 
          borderRadius: 15, 
          width: width * 0.69, 
          height: "auto" 
        }}
        isGregorian={true}
        minimumDate={today}
        onSelectedChange={(date) => {
          onSelectDate(date);
        }}
      />
    </View>
  );
};

export default DateSelector;

