import { View, StyleSheet, InteractionManager } from "react-native";
import { useCatAPI } from "@/hooks/useCatAPI";
import { useCallback, useEffect, useRef, useState } from "react";
import Colors from "@/constants/Colors";
import { ButtonsAction, Card, CardsContainer } from "@/components";

import type { CardRef } from "@/components/Card";

import type { Cat } from "@/types";
import { SegmentedControl } from "@/components/SegmentedControl";

export default function VoteScreen() {
  const { getCatList } = useCatAPI();
  const [cats, setCats] = useState<Cat[]>([]);
  const [active, setActive] = useState<number>(0);
  const [activeSegment, setActiveSegment] = useState<number>(0);

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
      <View style={styles.segmentControl}>
        <SegmentedControl
          selectedIndex={activeSegment}
          segments={["tinder", "star"]}
          onChange={setActiveSegment}
          backgroundColor="#E3E3E4"
          activeSegmentColor="#FFFFFF"
          activeTextColor="#FD267D"
          inactiveTextColor="#BFBFC0"
        />
      </View>
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
      {cats.length > 0 && (
        <ButtonsAction
          discardHandler={() => activeCard.current?.discard()}
          voteHandler={() => activeCard.current?.like()}
        />
      )}
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
  segmentControl: {
    width: 84,
  },
});
