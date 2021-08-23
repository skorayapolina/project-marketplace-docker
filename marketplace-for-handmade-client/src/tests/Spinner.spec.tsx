import React from "react";
import { create } from "react-test-renderer";
import Spinner from "../components/Spinner/Spinner";

describe("Spinner component", () => {
    test("Matches the snapshot", () => {
        const spinner = create(<Spinner/>);
        expect(spinner.toJSON()).toMatchSnapshot();
    });
});
