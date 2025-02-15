import Colors from "@/constants/Colors";
import { Text, View, StyleSheet } from "react-native";

type Props = {
  title: string;
};

export default function EmptyTab({ title }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
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
