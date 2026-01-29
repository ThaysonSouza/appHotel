import { useState } from "react";
import { Dimensions, Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import DateSelector from "../ui/DateSelector";
import InputSpin from "../ui/InputSpin";
import RoomCard from "../ui/RoomCard";
import TextField from "../ui/TextField";
import { global } from "../ui/styles";

const RenderExplorer = () => {
  const { width } = Dimensions.get("window");
  //useState() para gerenciar e alterar os estados
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [qntGuests, setQntGuests] = useState<number>(1);
  const [calendar, setCalendar] = useState<"checkin" | "checkout" | null>(null);
  const closeCalendar = () => setCalendar(null);

  return (
    <AuthContainer>
      <View style={{ display: "flex", justifyContent: "center" }}>
        {/* CHECK-IN */}
        <View style={{ display: "flex", flexDirection: "column" }}>
          <TouchableOpacity onPress={() => setCalendar("checkin")}>
            <View style={{ width: width * 0.8 }}>
              <TextField
                label="Check-in"
                icon={{ lib: "FontAwesome5", name: "calendar-alt" }}
                placeholder="Selecione a data"
                value={checkIn}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* CHECK-OUT */}
        <View style={{ display: "flex", flexDirection: "column" }}>
          <TouchableOpacity onPress={() => setCalendar("checkout")}>
            <View style={{ width: width * 0.8 }}>
              <TextField
                label="Check-out"
                icon={{ lib: "FontAwesome5", name: "calendar-alt" }}
                placeholder="Selecione a data"
                value={checkOut}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Modal para fechar calendário ao clicar fora */}
        <Modal
          transparent
          animationType="fade"
          visible={calendar !== null}
          onRequestClose={closeCalendar}
        >
          {/* Backdrop: qualquer clique aqui fora, fecha */}
          <Pressable
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0, 0.29)",
            }}
            onPress={closeCalendar}
          >
            {/* Área do calendário que, ao clicar, não o fecha */}
            <Pressable onPress={() => { }}>
              {calendar === "checkin" && (
                <DateSelector
                  onSelectDate={(date) => {
                    setCheckIn(date);
                    closeCalendar();
                  }}
                />
              )}
              {calendar === "checkout" && (
                <DateSelector
                  onSelectDate={(date) => {
                    setCheckOut(date);
                    closeCalendar();
                  }}
                />
              )}
            </Pressable>
          </Pressable>
        </Modal>

        {/* QUANTIDADE DE HÓSPEDES */}
        <View>
          <Text style={global.label}>Quantidade de hóspedes</Text>
          <InputSpin
            guests={qntGuests}
            onSelectSpin={(guests) => {
              setQntGuests(guests);
            }}
            minGuests={1}
            maxGuests={6}
            step={1}
            colorMin={"#420350ff"}
            colorMax={"#420350ff"}
          />
        </View>
      </View>

      {/* ROOM CARD */}
      <RoomCard
        image={require("../../../assets/images/suiteJunior.jpg")}
        label="Suite Junior"
        icon={{
          lib: "FontAwesome5",
          name: "bed",
        }}
      />
    </AuthContainer>
  );
};

export default RenderExplorer;
