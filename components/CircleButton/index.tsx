import { StyleSheet, Pressable, TouchableOpacity } from "react-native";

type Props = {
  onPress?: () => void;
  children: React.ReactNode;
};

export default function CircleButton(props: Props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      {props.children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    boxShadow: "0px 10px 16px 0px #BFBFC04D",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
