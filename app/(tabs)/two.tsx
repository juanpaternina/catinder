import Colors from "@/constants/Colors";
import { Text, View, StyleSheet } from "react-native";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>02</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 200,
    backgroundColor: Colors.default.background,
  },
  title: {
    fontSize: 126,
    color: "#BFBFC0",
  },
});
