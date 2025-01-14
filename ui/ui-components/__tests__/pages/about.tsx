import { render, screen } from "@testing-library/react";
import mockAxios from "jest-mock-axios";
import Page from "../../pages/about";
import commonProps from "../__utils__/commonProps";

describe("pages/about", () => {
  beforeEach(() => {
    render(<Page {...commonProps} plugins={[]} />);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  test("should display the current api version", async () => {
    const testVersion = screen.getByTestId("apiVersion");
    expect(testVersion).not.toHaveTextContent("...");
    expect(testVersion).toHaveTextContent("v1");
  });
});
