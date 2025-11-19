import { useState } from "react";
import { TouchableOpacity, View, Text, Modal } from "react-native";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { global } from "./styles";

const RenderDatePicker = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("18/11/2025");

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const startDate = getFormatedDate(tomorrow, "DD/MM/YYYY");

  function handleOnPress() {
    setOpen(!open);
  }

  function handleChange(selectedDate: string) {
    setDate(selectedDate);
  }

  return (
    <View>
      <TouchableOpacity onPress={handleOnPress}>
        <Text>Open</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={open}>
        <View style={global.centerView}>
          <View style={global.modalView}>
            <DatePicker
              mode="calendar"
              selected={date}
              minimumDate={startDate}
              onSelectedChange={handleChange}
              isGregorian={true}
            />

            <TouchableOpacity onPress={handleOnPress}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RenderDatePicker;