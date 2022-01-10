const React = require("react");
const renderer = require("react-test-renderer");

const Version = require("../src/version");

describe("Version should", () => {

	test("return version", () => {
		const component = renderer.create(
			<Version year={"1000"} oldUrl={"old"}/>
		);
		expect(component.toJSON()).toMatchSnapshot();
		component.unmount();
	});
});