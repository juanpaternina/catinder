import { View, StyleSheet } from "react-native";

type Props = {
  children?: React.ReactNode;
};

export default function CardsContainer({ children }: Props) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 58,
  },
});
