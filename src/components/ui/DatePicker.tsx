import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { colors, dimensions } from "./designTokens";
import { global } from "./styles";

const RenderDatePicker = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(getFormatedDate(new Date(), "DD/MM/YYYY"));

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const startDate = getFormatedDate(tomorrow, "DD/MM/YYYY");

  function toggleModal() {
    setOpen((prev) => !prev);
  }

  function handleChange(selectedDate: string) {
    setDate(selectedDate);
  }

  return (
    <View style={global.datePickerWrapper}>
      <Text style={global.datePickerLabel}>Data da estadia</Text>
      <TouchableOpacity style={global.datePickerTrigger} onPress={toggleModal} activeOpacity={0.85}>
        <View>
          <Text style={global.datePickerValue}>{date}</Text>
          <Text style={global.datePickerHint}>Toque para escolher a data da estadia</Text>
        </View>
        <View style={global.datePickerIconBubble}>
          <Feather name="calendar" size={dimensions.iconSize.sm} color={colors.primary} />
        </View>
      </TouchableOpacity>

      <Modal animationType="fade" transparent visible={open} onRequestClose={toggleModal}>
        <View style={global.centerView}>
          <View style={global.modalView}>
            <Text style={global.datePickerModalTitle}>Escolha a data da reserva</Text>
            <DatePicker
              mode="calendar"
              options={{
                textHeaderColor: colors.deepPurple,
                mainColor: colors.primary,
                textDefaultColor: colors.deepPurple,
                selectedTextColor: colors.lighter,
                backgroundColor: colors.lighter,
              }}
              selected={date}
              minimumDate={startDate}
              onSelectedChange={handleChange}
              isGregorian
            />

            <View style={global.datePickerActions}>
              <TouchableOpacity style={global.datePickerGhostButton} onPress={toggleModal}>
                <Text style={global.datePickerGhostText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={global.datePickerPrimaryButton} onPress={toggleModal}>
                <Text style={global.datePickerPrimaryText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RenderDatePicker;
