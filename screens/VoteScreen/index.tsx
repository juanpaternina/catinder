import { View, StyleSheet } from "react-native";
import { useCatAPI } from "@/hooks/useCatAPI";
import { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { ButtonsAction } from "@/components";
import CardsContainer from "@/components/CardContainer";
import Card from "@/components/Card";

import type { Cat } from "@/types";

export default function VoteScreen() {
  const { getCatList } = useCatAPI();
  ///const [cats, setCats] = useState<Cat[]>([]);
  const [cats, setCats] = useState([1, 2, 3, 4, 5, 6]);

  const fetchCats = async () => {
    try {
      const { data: cats } = await getCatList();
      setCats(cats);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <View style={styles.container}>
      <CardsContainer>
        {cats.map((cat) => (
          // <Card
          //   key={cat.id}
          //   image={cat.url}
          //   name={cat.breeds[0].name}
          //   age={cat.breeds[0].intelligence}
          //   origin={cat.breeds[0].origin}
          // />

          <Card
            key={cat}
            image={"https://picsum.photos/343/440"}
            name={"Cat Name"}
            age={10}
            origin={"UK"}
          />
        ))}
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
