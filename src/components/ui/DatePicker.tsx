import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
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
          <Feather name="calendar" size={20} color="#6E3482" />
        </View>
      </TouchableOpacity>

      <Modal animationType="fade" transparent visible={open} onRequestClose={toggleModal}>
        <View style={global.centerView}>
          <View style={global.modalView}>
            <Text style={global.datePickerModalTitle}>Escolha a data da reserva</Text>
            <DatePicker
              mode="calendar"
              options={{
                textHeaderColor: "#49225B",
                mainColor: "#6E3482",
                textDefaultColor: "#49225B",
                selectedTextColor: "#F5EBFA",
                backgroundColor: "#F5EBFA",
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
