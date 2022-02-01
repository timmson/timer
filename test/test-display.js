import React from "react"
import renderer from "react-test-renderer"

import Display from "../src/display"

describe("Display should", () => {

	test("return stopped timer", () => {
		const component = renderer.create(<Display status={"STOPPED"} value={60}/>)
		expect(component.toJSON()).toMatchSnapshot()
		component.unmount()
	})

	test("return started timer", () => {
		const component = renderer.create(<Display status={"STARTED"} value={60}/>);
		expect(component.toJSON()).toMatchSnapshot();
		component.unmount();
	});

	test("return alerted timer", () => {
		const component = renderer.create(<Display status={"ALERTED"} value={0}/>)
		expect(component.toJSON()).toMatchSnapshot()
		component.unmount()
	});

	test("contain properties", () => {
		expect(Display.propTypes).toHaveProperty("status")
		expect(Display.propTypes).toHaveProperty("value")
	});

});