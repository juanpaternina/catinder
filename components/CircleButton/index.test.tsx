import { Text } from "react-native";
import { render, screen } from "@testing-library/react-native";
import CircleButton from "./index";

describe("CircleButton", () => {
  it("renders correctly", () => {
    render(
      <CircleButton onPress={() => {}}>
        <Text>Test</Text>
      </CircleButton>
    );
    expect(screen.getByText("Test")).toBeTruthy();
    expect(screen).toMatchSnapshot();
  });
});
