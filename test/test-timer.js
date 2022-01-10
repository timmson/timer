const React = require("react");
const renderer = require("react-test-renderer");
const Timer = require("../src/timer");

class MockAudio {

}

class MockWindow {

	addEventListener() {

	}

}

class MockTime {

	getCurrentTime() {
		return "XXX";
	}
}

describe("Timer should", () => {

	test("create app", () => {
		const component = renderer.create(
			<Timer audio={new MockAudio()} window={new MockWindow()} time={new MockTime()} variants={["01:00", "02:00"]}/>
		);
		expect(component.toJSON()).toMatchSnapshot();
		component.unmount();
	});

});
