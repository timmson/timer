import React from "react"
import renderer from "react-test-renderer"

import Variant from "../src/variant"

describe("Variant should", () => {

	test("return variant", () => {
		const component = renderer.create(<Variant id={1} value={"01:00"}/>)
		expect(component.toJSON()).toMatchSnapshot()
		component.unmount()
	});

	test("contain properties", () => {
		expect(Variant.propTypes).toHaveProperty("value")
	});
});