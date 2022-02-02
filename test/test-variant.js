import React from "react"
import renderer from "react-test-renderer"

import Variant from "../src/variant"
import Context from "../src/context";

describe("Variant should", () => {

	const expectedAction = {type: "ACTION_SET_TIME", value: "01:00"}

	test("return variant", () => {
		const component = renderer.create(<Variant id={1} value={expectedAction.value}/>)

		expect(component.toJSON()).toMatchSnapshot()

		component.unmount()
	})

	test("give possibility to click", () => {
		const component = renderer.create(
			<Context.Provider value={(action) => expect(action).toEqual(expectedAction)}>
				<Variant id={1} value={expectedAction.value}/>
			</Context.Provider>
		)
		component.root.findByType("a").props.onClick()

		expect.assertions(1)

		component.unmount()
	})

	test("contain properties", () => {
		expect(Variant.propTypes).toHaveProperty("value")
	})
})