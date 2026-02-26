import React from "react"
import "@testing-library/jest-dom"
import user from "@testing-library/user-event"
import {render, screen} from "@testing-library/react"

import VariantList from "../src/variant-list"
import Context from "../src/context"

describe("VariantList should", () => {

	const expectedAction = {type: "ACTION_SET_TIME", value: "01:00"}

	test("give possibility to click", async () => {
		render(
			<Context.Provider value={(action) => expect(action).toEqual(expectedAction)}>
				<VariantList variants={[1, 2]}/>
			</Context.Provider>
		)

		expect(screen.getByText(/02:00/)).toBeInTheDocument()
		await user.click(screen.getByText(/01:00/))

		expect.assertions(2)

	})
})
