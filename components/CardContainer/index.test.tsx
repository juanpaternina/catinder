import { Text } from "react-native";
import { render, screen } from "@testing-library/react-native";
import CardsContainer from "./index";

describe("CardsContainer", () => {
  it("renders correctly", () => {
    render(
      <CardsContainer>
        <Text>Test</Text>
      </CardsContainer>
    );
    expect(screen.getByText("Test")).toBeTruthy();
    expect(screen).toMatchSnapshot();
  });
});
