import { View, Text, Image } from "react-native";
import { stylesRoom } from "./stylesRoom";

const RenderRoomCard = () => {
  return (
    <View style={stylesRoom.container}>

      <Image
        source={{ uri: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/29/bf/66/piscina.jpg?w=1000&h=-1&s=1" }}
        style={stylesRoom.image}
      />

      <View>
        <Text style={stylesRoom.title}>Suite Junior</Text>

        <Text style={stylesRoom.price}>
          R$ 150 por 1 noites
        </Text>
      </View>

    </View>
  );
}
export default RenderRoomCard;