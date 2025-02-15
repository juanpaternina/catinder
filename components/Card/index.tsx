import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Image } from "expo-image";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { forwardRef, useCallback, useImperativeHandle } from "react";
import { useCatAPI } from "@/hooks/useCatAPI";

type Props = {
  image: string;
  name: string;
  age: number;
  catID: string;
  origin: string;
  active: number;
  index: number;
  discardHandler?: (index: number) => void;
  likeHandler?: (index: number) => void;
  testID?: string;
};

export type CardRef = {
  discard: () => void;
  like: () => void;
};

const Card = forwardRef<CardRef, Props>(
  (
    {
      image,
      name,
      age,
      origin,
      active,
      index,
      catID,
      discardHandler,
      likeHandler,
    }: Props,
    ref
  ) => {
    const translateX = useSharedValue(0);
    const { width } = useWindowDimensions();
    const { voteCat } = useCatAPI();

    const discard = useCallback(async () => {
      translateX.value = withTiming(-width, { duration: 200 }, () => {
        if (discardHandler) runOnJS(discardHandler)(index);
      });
      const r = await voteCat(catID, -1);
      console.log(r);
    }, [active]);

    const like = useCallback(async () => {
      translateX.value = withTiming(width, { duration: 200 }, () => {
        if (likeHandler) runOnJS(likeHandler)(index);
      });
      const r = await voteCat(catID, 1);
      console.log(r);
    }, [active]);

    const tap = Gesture.Pan()
      .onUpdate((e) => {
        if (active === index) {
          translateX.value = e.translationX;
        }
      })
      .onEnd((e) => {
        if (active === index) {
          if (e.translationX > 150) {
            return runOnJS(like)();
          }
          if (e.translationX < -150) {
            return runOnJS(discard)();
          }
          translateX.value = withSpring(0, { duration: 1400 });
        }
      });

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateX: translateX.value,
          },
        ],
      };
    });

    useImperativeHandle(ref, () => ({
      discard,
      like,
    }));

    return (
      <GestureDetector gesture={tap}>
        <Animated.View
          style={[
            { position: "absolute", width: "100%", height: "100%" },
            animatedStyle,
          ]}
        >
          <View style={styles.container}>
            <Image
              testID="cat-image"
              contentFit="cover"
              source={{ uri: image }}
              style={styles.image}
            />
            <View style={styles.infoContainer}>
              <View style={styles.titleDescriptionContainer}>
                <Text testID="cat-name" style={styles.title}>
                  {name}
                </Text>
                <Text testID="cat-age" style={styles.title}>
                  {age}
                </Text>
              </View>
              <Text testID="cat-origin" style={styles.description}>
                {origin}
              </Text>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    );
  }
);
export default Card;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    boxShadow: "0px 10px 16px 0px #BFBFC04D",
    borderRadius: 16,
    justifyContent: "flex-end",
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    position: "absolute",
    backgroundColor: "#FFF",
  },
  infoContainer: {
    width: 307,
    height: 48,
    alignSelf: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingTop: 8,
    borderTopEndRadius: 16,
    borderTopLeftRadius: 16,
  },
  titleDescriptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 20,
  },
  description: {
    fontSize: 10,
    lineHeight: 10,
    fontWeight: "bold",
    color: "#BFBFC0",
    marginTop: 2,
  },
});
