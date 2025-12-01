import { useState } from "react";
import { Dimensions, ScrollView, TouchableOpacity, View } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import DateSelector from "../ui/DateSelector";
import RenderRoomCard from "../ui/RoomCard";
import TextField from "../ui/TextField";
import { spacing } from "../ui/designTokens";
const RenderExplorer = () => {
  const { width } = Dimensions.get("window");
                            //Utilizarei as dimensões
  //useState() para gerenciar e alterar os estados
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [calendar, setCalendar] = useState<"checkin" | "checkout">();
  return (
    <AuthContainer>
      {/*children */}
      <View style={{ display: "flex", flexDirection: "row", gap: width * 0.05, justifyContent: "center"}}>  {/*Essa View vocês tinham e eu só estilizei*/}      
        <View style={{ display: "flex", flexDirection: "column" }}>
                            {/*Criei esta nova View para check-in*/}
          {/* Input de checkIn para abrir calendário*/}
          <TouchableOpacity onPress={() => setCalendar("checkin")}>
            <View style={{width: width * 0.42}}>
                             {/* Nova view para dar largura ao TextField */}    
              <TextField label="Check-in" icon={{ lib: "FontAwesome5", name: "calendar-alt" }} placeholder="Selecione a data" value={checkIn} />
            </View>
                            {/* Fecha aqui */}
          </TouchableOpacity>
          {/* <DateSelector /> */}
          {calendar === "checkin" && (
            <DateSelector onSelectDate={(date) => { setCheckIn(date); }} /> )}  
        </View>
                            {/*View de check-in fecha aqui */}

        <View style={{ display: "flex", flexDirection: "column" }}>
                            {/*Criei esta nova View para check-out*/}
          {/* Input de checkIn para abrir calendário*/}
          <TouchableOpacity onPress={() => setCalendar("checkout")}>
            <View style={{width: width * 0.42}}>
                             {/* Nova view para dar largura ao TextField */}    
              <TextField label="Check-out" icon={{ lib: "FontAwesome5", name: "calendar-alt" }} placeholder="Selecione a data" value={checkOut} />
            </View>
                            {/* Fecha aqui */}
          </TouchableOpacity>
          {/* <DateSelector /> */}
          {calendar === "checkout" && (
            <DateSelector onSelectDate={(date) => { setCheckOut(date); }} /> )} 
        </View>
                            {/*View do check-out que fecha aqui */}
      </View>

      <View style={{ flex: 1, marginTop: spacing.base }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: spacing.lg, paddingRight: spacing.lg, paddingTop: spacing.lg, paddingBottom: 100 }}>
          {Array.from({ length: 5 }).map((_, index) => (
            <RenderRoomCard key={`room-${index}`} />
          ))}
        </ScrollView>
      </View>
    </AuthContainer>
  )};
export default RenderExplorer;

