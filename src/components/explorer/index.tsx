import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import DateSelector from "../ui/DateSelector";
import RenderRoomCard from "../ui/RoomCard";
import TextField from "../ui/TextField";
import { spacing } from "../ui/designTokens";

const RenderExplorer = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [calendar, setCalendar] = useState<"checkin" | "checkout">();

  return (
    <AuthContainer>
      <View style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: spacing.md, 
        justifyContent: "center" 
      }}>      
        <View style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <TouchableOpacity onPress={() => setCalendar("checkin")}>
            <View>
              <TextField 
                label="Check-in" 
                icon={{ lib: "FontAwesome5", name: "calendar-alt" }} 
                placeholder="Selecione a data" 
                value={checkIn} 
              />
            </View>
          </TouchableOpacity>
          {calendar === "checkin" && (
            <DateSelector 
              onSelectDate={(date) => { 
                if (date) {
                  setCheckIn(date); 
                }
                setCalendar(undefined); 
              }} 
              onClose={() => setCalendar(undefined)}
            /> 
          )}  
        </View>

        <View style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <TouchableOpacity onPress={() => setCalendar("checkout")}>
            <View>
              <TextField 
                label="Check-out" 
                icon={{ lib: "FontAwesome5", name: "calendar-alt" }} 
                placeholder="Selecione a data" 
                value={checkOut} 
              />
            </View>
          </TouchableOpacity>
          {calendar === "checkout" && (
            <DateSelector 
              onSelectDate={(date) => { 
                if (date) {
                  setCheckOut(date); 
                }
                setCalendar(undefined); 
              }} 
              onClose={() => setCalendar(undefined)}
            /> 
          )} 
        </View>
      </View>

      <View style={{marginTop: spacing.base }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ 
            paddingLeft: spacing.lg, 
            paddingRight: spacing.lg, 
            paddingTop: spacing.lg, 
            paddingBottom: spacing.xxxl * 2.5 
          }}>
          {Array.from({ length: 5 }).map((_, index) => (
            <RenderRoomCard key={`room-${index}`} />
          ))}
        </ScrollView>
      </View>
    </AuthContainer>
  );
};

export default RenderExplorer;

