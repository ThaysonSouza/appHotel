import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { colors, dimensions, spacing, typography } from "./designTokens";
import { global } from "./styles";

type InfoReservaProps = {
  dateCheckin: string;
  dateCheckout: string;
  roomName?: string;
  price?: string;
};

const InfoReserva = ({ dateCheckin, dateCheckout, roomName, price }: InfoReservaProps) => {
  return (
    <View style={global.infoReservaContainer}>
      <View style={global.infoReservaHeader}>
        <Feather name="calendar" size={dimensions.iconSize.md} color={colors.primary} />
        <Text style={global.infoReservaTitle}>Informações da Reserva</Text>
      </View>

      <View style={global.infoReservaContent}>
        <View style={global.infoReservaRow}>
          <View style={global.infoReservaLabelContainer}>
            <Feather name="log-in" size={dimensions.iconSize.sm} color={colors.textTertiary} />
            <Text style={global.infoReservaLabel}>Check-in</Text>
          </View>
          <Text style={global.infoReservaValue}>{dateCheckin}</Text>
        </View>

        <View style={global.infoReservaDivider} />

        <View style={global.infoReservaRow}>
          <View style={global.infoReservaLabelContainer}>
            <Feather name="log-out" size={dimensions.iconSize.sm} color={colors.textTertiary} />
            <Text style={global.infoReservaLabel}>Check-out</Text>
          </View>
          <Text style={global.infoReservaValue}>{dateCheckout}</Text>
        </View>

        {roomName && (
          <>
            <View style={global.infoReservaDivider} />
            <View style={global.infoReservaRow}>
              <View style={global.infoReservaLabelContainer}>
                <Feather name="home" size={dimensions.iconSize.sm} color={colors.textTertiary} />
                <Text style={global.infoReservaLabel}>Quarto</Text>
              </View>
              <Text style={global.infoReservaValue}>{roomName}</Text>
            </View>
          </>
        )}

        {price && (
          <>
            <View style={global.infoReservaDivider} />
            <View style={global.infoReservaRow}>
              <View style={global.infoReservaLabelContainer}>
                <Feather name="dollar-sign" size={dimensions.iconSize.sm} color={colors.textTertiary} />
                <Text style={global.infoReservaLabel}>Total</Text>
              </View>
              <Text style={[global.infoReservaValue, global.infoReservaPrice]}>{price}</Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default InfoReserva;

