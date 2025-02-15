import { render, screen } from "@testing-library/react-native";
import EmptyTab from "./index";

describe("EmptyTab", () => {
  it("renders correctly", () => {
    render(<EmptyTab title="Test" />);
    expect(screen.getByText("Test")).toBeTruthy();
    expect(screen).toMatchSnapshot();
  });
});
