import { Text } from "react-native";
import { render, screen } from "@testing-library/react-native";
import Card from "./index";

describe("Card", () => {
  it("renders correctly", () => {
    render(
      <Card
        image="https://picsum.photos/343/440"
        name="Cat Name"
        age={6}
        origin="Egypt"
      />
    );
    expect(screen.getByTestId("cat-image")).toBeTruthy();
    expect(screen.getByTestId("cat-name")).toBeTruthy();
    expect(screen.getByTestId("cat-age")).toBeTruthy();
    expect(screen.getByTestId("cat-origin")).toBeTruthy();
    expect(screen.getByText("Cat Name")).toBeTruthy();
    expect(screen.getByText("6")).toBeTruthy();
    expect(screen.getByText("Egypt")).toBeTruthy();
    expect(screen).toMatchSnapshot();
  });
});
