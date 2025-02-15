import { View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type Props = {
  children?: React.ReactNode;
};

export default function CardsContainer({ children }: Props) {
  return (
    <View style={styles.container}>
      <GestureHandlerRootView>{children}</GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 38,
    marginTop: 40,
    width: 343,
    height: 440,
  },
});
