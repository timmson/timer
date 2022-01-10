const React = require("react");
const renderer = require("react-test-renderer");

const Variant = require("../src/variant");

function mockFunction() {

}

describe("Variant should", () => {

	test("return variant", () => {
		const component = renderer.create(
			<Variant id={1} value={"01:00"} onClick={mockFunction}/>
		);
		expect(component.toJSON()).toMatchSnapshot();
		component.unmount();
	});
});