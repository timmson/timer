import React from "react"
import renderer from "react-test-renderer"

import Time from "../src/time"

function moment() {
	return {
		format: (format) => (format === "HH:mm:ss, dddd, DD.MM.YYYY г.") ? "xxx" : null
	}
}

describe("Time should", () => {

	test("return formatted time", () => {
		const component = renderer.create(<Time moment={moment()} calendarURL={"url"}/>)
		expect(component.toJSON()).toMatchSnapshot()
		component.unmount()
	})

	test("contain properties", () => {
		expect(Time.propTypes).toHaveProperty("moment")
		expect(Time.propTypes).toHaveProperty("calendarURL")
	})

})