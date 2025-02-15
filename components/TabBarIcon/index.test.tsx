import { render, screen } from "@testing-library/react-native";
import TabBarIcon from "./index";

describe("TabBarIcon", () => {
  it("renders correctly", () => {
    render(<TabBarIcon>Test</TabBarIcon>);
    expect(screen.getByTestId("tab-bar-icon")).toBeTruthy();
    expect(screen).toMatchSnapshot();
  });
});
