import React from "react"
import renderer from "react-test-renderer"

import Display from "../src/display"
import Context from "../src/context"

describe("Display should", () => {

	test("return stopped timer", () => {
		const component = renderer.create(<Display status={"STOPPED"} value={60}/>)
		expect(component.toJSON()).toMatchSnapshot()
		component.unmount()
	})

	test("return started timer", () => {
		const component = renderer.create(<Display status={"STARTED"} value={60}/>)
		expect(component.toJSON()).toMatchSnapshot()
		component.unmount()
	})

	test("return alerted timer", () => {
		const component = renderer.create(<Display status={"ALERTED"} value={0}/>)
		expect(component.toJSON()).toMatchSnapshot()
		component.unmount()
	})

	test("give possibility to click", () => {
		const expectedAction = {type: "ACTION_TOGGLE"}

		const component = renderer.create(
			<Context.Provider value={(action) => expect(action).toEqual(expectedAction)}>
				<Display status={"ALERTED"} value={0}/>
			</Context.Provider>
		)
		component.root.findByType("span").parent.props.onClick()

		expect.assertions(1)

		component.unmount()
	})

})