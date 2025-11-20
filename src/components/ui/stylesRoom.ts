import { StyleSheet } from "react-native";

export const stylesRoom = StyleSheet.create({
  container: {
    width: 240,
    backgroundColor: "#FFF",
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 16,
    shadowColor: "#49225B",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  image: {
    width: "100%",
    height: 150,
  },

  infoSection: {
    padding: 14,
    gap: 6,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#49225B",
  },

  price: {
    fontSize: 14,
    color: "#7A6A8C",
  },
});