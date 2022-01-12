const React = require("react");
const renderer = require("react-test-renderer");

const Timer = require("../src/timer");

class MockAudio {

}

class MockWindow {

	addEventListener() {

	}

}

class Moment {

	locale(locale) {
		return (locale === "ru") ? this : null;
	}

	format(format) {
		return (format === "HH:mm:ss, dddd, DD.MM.YYYY г.") ? "xxx" : null;
	}
}

function moment() {
	return new Moment();
}

describe("Timer should", () => {

	test("create app", () => {
		const component = renderer.create(
			<Timer audio={new MockAudio()} window={new MockWindow()} moment={moment} variants={[1, 2]} calendarURL={"#"}/>
		);
		expect(component.toJSON()).toMatchSnapshot();
		component.unmount();
	});

});
