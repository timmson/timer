import React from "react"
import {render, screen} from "@testing-library/react"
import user from "@testing-library/user-event"
import "@testing-library/jest-dom"
import "regenerator-runtime/runtime"

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
