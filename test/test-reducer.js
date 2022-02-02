import Reducer from "../src/reducer"

describe("Reducer should", () => {

	test("start timer when toggled", () => {
		const state = Reducer({status: "STOPPED", remainingSeconds: 1}, {type: "ACTION_TOGGLE"})
		expect(state.status).toEqual("STARTED")
	})

	test("stop timer when toggled", () => {
		const state = Reducer({status: "STARTED", remainingSeconds: 1}, {type: "ACTION_TOGGLE"})
		expect(state.status).toEqual("STOPPED")
	})

	test("start timer and set time when time is set", () => {
		const state = Reducer({status: "STOPPED", remainingSeconds: 1}, {type: "ACTION_SET_TIME", value: "03:00"})
		expect(state.status).toEqual("STARTED")
		expect(state.remainingSeconds).toEqual(180)
	})

	test("tick down", () => {
		const state = Reducer({status: "STARTED", remainingSeconds: 2}, {type: "ACTION_TICK"})
		expect(state.status).toEqual("STARTED")
		expect(state.remainingSeconds).toEqual(1)
	})

	test("tick down and alert", () => {
		const state = Reducer({status: "STARTED", remainingSeconds: 0}, {type: "ACTION_TICK"})
		expect(state.status).toEqual("ALERTED")
		expect(state.remainingSeconds).toEqual(0)
	})

	test("default action", () => {
		const prevState = {status: "STARTED"}

		const state = Reducer({status: "STARTED"}, {type: "ANY"})

		expect(state).toEqual(prevState)
	})

})