import Reducer from "../src/reducer"
import {ACTION_SET_TIME, ACTION_TICK, ACTION_TOGGLE, DISPLAY_ALERTED, DISPLAY_STARTED, DISPLAY_STOPPED} from "../src/constants"

const getTestCaseDescription = (t, i) =>
	`#${i}: return ${JSON.stringify(t.expected)} when state:${JSON.stringify(t.state)} and action:${JSON.stringify(t.action)}`

describe("Reducer should", () => {

	[
		{
			state: {status: DISPLAY_STOPPED, remainingSeconds: 1},
			action: {type: ACTION_TOGGLE},
			expected: {status: DISPLAY_STARTED, remainingSeconds: 1}
		},
		{
			state: {status: DISPLAY_STARTED, remainingSeconds: 1},
			action: {type: ACTION_TOGGLE},
			expected: {status: DISPLAY_STOPPED, remainingSeconds: 1}
		},
		{
			state: {status: DISPLAY_STOPPED, remainingSeconds: 1},
			action: {type: ACTION_SET_TIME, value: "03:00"},
			expected: {status: DISPLAY_STARTED, remainingSeconds: 180}
		},
		{
			state: {status: DISPLAY_STARTED, remainingSeconds: 2},
			action: {type: ACTION_TICK},
			expected: {status: DISPLAY_STARTED, remainingSeconds: 1}
		},
		{
			state: {status: DISPLAY_STARTED, remainingSeconds: 0},
			action: {type: ACTION_TICK},
			expected: {status: DISPLAY_ALERTED, remainingSeconds: 0}
		},
		{
			state: {status: DISPLAY_STARTED},
			action: {type: "ANY"},
			expected: {status: DISPLAY_STARTED}
		}
	].map((t, i) => {
		test(getTestCaseDescription(t, i), () => {
			const actual = Reducer(t.state, t.action)
			expect(actual).toEqual(t.expected)
		})
	})

})