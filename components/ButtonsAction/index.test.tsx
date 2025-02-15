import { render, screen } from "@testing-library/react-native";
import ButtonsAction from "./index";

jest.mock("@expo/vector-icons", () => ({
  AntDesign: "",
}));

describe("ButtonsAction", () => {
  it("renders correctly", () => {
    render(<ButtonsAction />);
    expect(screen.getByTestId("close-icon")).toBeTruthy();
    expect(screen.getByTestId("heart-icon")).toBeTruthy();
    expect(screen).toMatchSnapshot();
  });
});
