import React from "react";
import { create } from "react-test-renderer";
import Button from "../components/Button/Button";

describe("Button component", () => {
  test("Matches the snapshot", () => {
    const button = create(<Button styleType="small" />);
    expect(button.toJSON()).toMatchSnapshot();
  });
});
