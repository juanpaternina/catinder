import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";

export default function Card() {
  return (
    <View style={styles.container}>
      <Image
        testID="cat-image"
        contentFit="cover"
        source={{ uri: "https://picsum.photos/343/440" }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <View style={styles.titleDescriptionContainer}>
          <Text testID="cat-name" style={styles.title}>
            Abyssinian
          </Text>
          <Text testID="cat-age" style={styles.title}>
            4
          </Text>
        </View>
        <Text testID="cat-origin" style={styles.description}>
          Description
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 343,
    height: 440,
    boxShadow: "0px 10px 16px 0px #BFBFC04D",
    borderRadius: 16,
    justifyContent: "flex-end",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    position: "absolute",
  },
  infoContainer: {
    width: 307,
    height: 48,
    alignSelf: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingTop: 8,
    borderTopEndRadius: 16,
    borderTopLeftRadius: 16,
  },
  titleDescriptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 20,
  },
  description: {
    fontSize: 10,
    lineHeight: 10,
    fontWeight: "bold",
    color: "#BFBFC0",
    marginTop: 2,
  },
});
