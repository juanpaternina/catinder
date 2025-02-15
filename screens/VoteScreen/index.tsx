import { View, StyleSheet } from "react-native";
import { useCatAPI } from "@/hooks/useCatAPI";
import { useEffect } from "react";
import Colors from "@/constants/Colors";
import { ButtonsAction } from "@/components";
import CardsContainer from "@/components/CardContainer";
import Card from "@/components/Card";

export default function VoteScreen() {
  const { getCatList } = useCatAPI();

  const fetchCats = async () => {
    try {
      const { data: cats } = await getCatList();
      console.log(JSON.stringify(cats, null, 2));
    } catch (error) {}
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <View style={styles.container}>
      <CardsContainer>
        <Card />
      </CardsContainer>
      <ButtonsAction />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.default.background,
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
