import { Dimensions, Modal, TouchableOpacity, View } from "react-native";
import DatePicker, { getToday } from "react-native-modern-datepicker";
import { borderRadius, colors } from "./designTokens";
import { global } from "./styles";

type Props = {
  onSelectDate: (date: string) => void;
  onClose?: () => void;
};

const DateSelector = ({ onSelectDate, onClose }: Props) => {
  const { width } = Dimensions.get("window"); // Componente para dimensionar largura e altura (responsividade)
  const today = getToday();
  
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };
  
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
      onRequestClose={handleClose}
    >
      <TouchableOpacity 
        style={global.centerView}
        activeOpacity={1}
        onPress={handleClose}
      >
        <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
          <View style={global.modalView}>
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
                borderRadius: borderRadius.sm, 
                width: width * 0.85,
              }}
              isGregorian={true}
              minimumDate={today}
              onSelectedChange={(date) => {
                onSelectDate(date);
              }}
            />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default DateSelector;

