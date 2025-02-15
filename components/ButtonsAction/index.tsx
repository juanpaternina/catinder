import { View, StyleSheet } from "react-native";
import { CircleButton } from "@/components";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  discardHandler?: () => void;
  voteHandler?: () => void;
};

export default function ButtonsAction({ discardHandler, voteHandler }: Props) {
  return (
    <View style={styles.container}>
      <CircleButton onPress={discardHandler}>
        <AntDesign testID="close-icon" name="close" size={26} color="#E16359" />
      </CircleButton>
      <CircleButton onPress={voteHandler}>
        <AntDesign
          testID="heart-icon"
          name="heart"
          size={26.5}
          color="#6BD88E"
        />
      </CircleButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 154,
  },
});
