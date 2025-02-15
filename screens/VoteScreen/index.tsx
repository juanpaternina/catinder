import { View, StyleSheet, InteractionManager } from "react-native";
import { useCatAPI } from "@/hooks/useCatAPI";
import { useCallback, useEffect, useRef, useState } from "react";
import Colors from "@/constants/Colors";
import { ButtonsAction } from "@/components";
import CardsContainer from "@/components/CardContainer";
import Card, { CardRef } from "@/components/Card";

import type { Cat } from "@/types";

export default function VoteScreen() {
  const { getCatList } = useCatAPI();
  const [cats, setCats] = useState<Cat[]>([]);
  const [active, setActive] = useState<number>(0);

  const activeCard = useRef<CardRef>(null);

  const updateHandler = useCallback(() => {
    if (cats.length > 0) {
      const r = cats.slice(0, -1);
      setCats(r);
    }
    if (active > 0) {
      setActive((prev) => prev - 1);
    }
  }, [cats, active]);

  const fetchCats = async () => {
    try {
      const { data: cats } = await getCatList();
      setActive(cats.length - 1);
      setCats(cats);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (cats.length === 0) {
        fetchCats();
      }
    });
  }, [cats]);

  return (
    <View style={styles.container}>
      <CardsContainer>
        {cats.map((cat, index) => {
          if (index > cats.length - 3) {
            return (
              <Card
                ref={activeCard}
                key={cat.id}
                catID={cat.id}
                image={cat.url}
                name={cat.breeds[0].name}
                age={cat.breeds[0].intelligence}
                origin={cat.breeds[0].origin}
                active={active}
                index={index}
                discardHandler={updateHandler}
                likeHandler={updateHandler}
              />

              // <Card
              //   key={cat}
              //   image={"https://picsum.photos/343/440"}
              //   name={"Cat Name"}
              //   age={10}
              //   origin={"UK"}
              //   index={index}
              //   active={cats.length - 1}
              //   discardHandler={discardHandler}
              //   likeHandler={likeHandler}
              // />
            );
          }
          return null;
        })}
      </CardsContainer>
      <ButtonsAction
        discardHandler={() => activeCard.current?.discard()}
        voteHandler={() => activeCard.current?.like()}
      />
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
