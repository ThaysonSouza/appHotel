import { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { global } from "./styles";

type DateSelectorProps = {
  onSelectDate: (date: string) => void;
};

const DateSelector = ({ onSelectDate }: DateSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const startDate = getFormatedDate(tomorrow, "DD/MM/YYYY");

  function toggleModal() {
    setOpen((prev) => !prev);
  }

  function handleChange(selectedDate: string) {
    setDate(selectedDate);
    onSelectDate(selectedDate);
    setOpen(false);
  }

  return (
    <View>
      <Modal animationType="fade" transparent visible={open} onRequestClose={toggleModal}>
        <View style={global.centerView}>
          <View style={global.modalView}>
            <Text style={global.datePickerModalTitle}>Escolha a data</Text>
            <DatePicker
              mode="calendar"
              options={{
                textHeaderColor: "#49225B",
                mainColor: "#6E3482",
                textDefaultColor: "#49225B",
                selectedTextColor: "#F5EBFA",
                backgroundColor: "#F5EBFA",
              }}
              selected={date || startDate}
              minimumDate={startDate}
              onSelectedChange={handleChange}
              isGregorian
            />
            <View style={global.datePickerActions}>
              <TouchableOpacity style={global.datePickerGhostButton} onPress={toggleModal}>
                <Text style={global.datePickerGhostText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DateSelector;

