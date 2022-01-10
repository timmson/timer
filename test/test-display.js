const React = require("react");
const renderer = require("react-test-renderer");

const Display = require("../src/display");

describe("Display should", () => {

	test("return stopped timer", () => {
		const component = renderer.create(
			<Display onClick={() => {
			}} status={Display.STOPPED} value={[0, 1]}/>
		);
		expect(component.toJSON()).toMatchSnapshot();
		component.unmount();
	});

	test("return started timer", () => {
		const component = renderer.create(
			<Display onClick={() => {
			}} status={Display.STARTED} value={[0, 1]}/>
		);
		expect(component.toJSON()).toMatchSnapshot();
		component.unmount();
	});

	test("return alerted timer", () => {
		const component = renderer.create(
			<Display onClick={() => {
			}} status={Display.ALERTED} value={[0, 0]}/>
		);
		expect(component.toJSON()).toMatchSnapshot();
		component.unmount();
	});

	test("contain properties", () => {
		expect(Display.propTypes).toHaveProperty("status");
		expect(Display.propTypes).toHaveProperty("value");
		expect(Display.propTypes).toHaveProperty("onClick");
	});

});