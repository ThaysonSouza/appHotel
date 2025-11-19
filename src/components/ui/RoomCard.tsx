import { View, Text, Image } from "react-native";
import { global } from "./styles";

const RenderRoomCard = () => {
  return (
    <View style={global.card}>

      <Image
        source={{uri: ""}}
        
      />

      <View style={global.infoSection}>
        <Text style={global.title}>Suite Junior</Text>

        <Text style={global.price}>
          R$ 150 por 1 noites
        </Text>
      </View>

    </View>
  );
}
export default RenderRoomCard;