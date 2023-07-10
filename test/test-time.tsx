import React from "react"
import {render, screen} from "@testing-library/react"
import "@testing-library/jest-dom"

import Time from "../src/time"

function moment() {
	return {
		format: (format) => (["HH:mm:ss, dddd,", "DD.MM.YYYY г."].indexOf(format) >= 0) ? "xxx" : null
	}
}

describe("Time should", () => {

	test("return formatted time", () => {
		render(<Time moment={moment()} calendarURL={"url"}/>)

		expect(screen.getByText("xxx")).toBeInTheDocument()
	})

})
