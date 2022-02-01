import React from "react";
import renderer from "react-test-renderer";

import Version from "../src/version";

describe("Version should", () => {

	test("return version", () => {
		const component = renderer.create(<Version year={"1000"} oldUrl={"old"}/>);
		expect(component.toJSON()).toMatchSnapshot();
		component.unmount();
	});

	test("contain properties", () => {
		expect(Version.propTypes).toHaveProperty("year");
		expect(Version.propTypes).toHaveProperty("oldUrl");
	});
});