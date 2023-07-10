import React from "react"
import {render, screen} from "@testing-library/react"
import user from "@testing-library/user-event"
import "@testing-library/jest-dom"
import "regenerator-runtime/runtime"

import Display from "../src/display"
import Context from "../src/context"

describe("Display should", () => {

	test("return stopped timer", () => {
		render(<Display status={"STOPPED"} value={60}/>)

		expect(screen.getByText(/01/)).toBeInTheDocument()
		expect(screen.getByText(/:/)).toBeInTheDocument()
		expect(screen.getByText(/00/)).toBeInTheDocument()
	})

	test("return started timer", () => {
		render(<Display status={"STARTED"} value={60}/>)

		expect(screen.getByText(/01/)).toBeInTheDocument()
		expect(screen.getByText(/:/)).toBeInTheDocument()
		expect(screen.getByText(/00/)).toBeInTheDocument()
	})

	test("return alerted timer", () => {
		render(<Display status={"ALERTED"} value={0}/>)

		expect(screen.getByText(/0/)).toBeInTheDocument()
	})

	test("give possibility to click", async () => {
		const expectedAction = {type: "ACTION_TOGGLE"}

		render(
			<Context.Provider value={(action) => {
				expect(action).toEqual(expectedAction)
			}}>
				<Display status={"ALERTED"} value={0}/>
			</Context.Provider>
		)

		await user.click(screen.getByText(/:/).parentElement)

		expect.assertions(1)
	})

})
