import React from "react"
import {render, screen} from "@testing-library/react"
import "@testing-library/jest-dom"

import Version from "../src/version"

describe("Version should", () => {

	test("return version", () => {
		render(<Version year={"1000"} oldUrl={"https://example.com"}/>)

		expect(screen.getByText(/1000/i)).toBeInTheDocument()
	})
}
)


