import { View } from "react-native";

export default function TabBarIcon(props: { children: React.ReactNode }) {
  return (
    <View
      testID="tab-bar-icon"
      style={{
        marginBottom: -13,
        height: 64,
        justifyContent: "center",
      }}
    >
      {props.children}
    </View>
  );
}
