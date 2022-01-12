const React = require("react");
const renderer = require("react-test-renderer");

const Time = require("../src/time");

class Moment {

	format(format) {
		return (format === "HH:mm:ss, dddd, DD.MM.YYYY г.") ? "xxx" : null;
	}
}

function moment() {
	return new Moment();
}

describe("Time should", () => {

	test("return formatted time", () => {
		const component = renderer.create(
			<Time moment={moment()} calendarURL={"url"}/>
		);
		expect(component.toJSON()).toMatchSnapshot();
		component.unmount();
	});

});