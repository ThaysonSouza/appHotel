import { Image, Text, View } from "react-native";
import { stylesRoom } from "./stylesRoom";

const RenderRoomCard = () => {
  return (
    <View style={stylesRoom.container}>

      <Image
        source={{ uri: "https://images.unsplash.com/photo-1505691938895-1758d7feb511" }}
        style={stylesRoom.image}
      />

      <View style={stylesRoom.infoSection}>
        <Text style={stylesRoom.title}>Suite Junior</Text>

        <Text style={stylesRoom.price}>
          R$ 150 por 1 noites
        </Text>
      </View>

    </View>
  );
}
export default RenderRoomCard;