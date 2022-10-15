import React from "react"
import renderer, {act} from "react-test-renderer"

import Timer from "../src/timer"

class MockWindow {
	removeEventListener() {
		return 0
	}

	addEventListener() {
		return 0
	}
}

class Moment {

	locale(locale) {
		return (locale === "ru") ? this : null
	}

	format(format) {
		return (format === "HH:mm:ss, dddd, DD.MM.YYYY г.") ? "xxx" : null
	}
}

describe("Timer should", () => {

	test("create app", () => {
		let component
		act(() => {
			component = renderer.create(
				<Timer audio={{}} window={new MockWindow()} moment={() => new Moment()} variants={[1, 2]} calendarURL={"#"}/>
			)
		})

		expect(component.toJSON()).toMatchSnapshot()
		component.unmount()
	})

})
