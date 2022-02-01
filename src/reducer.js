import {ACTION_SET_TIME, ACTION_TICK, ACTION_TOGGLE, DISPLAY_ALERTED, DISPLAY_STARTED, DISPLAY_STOPPED} from "./constants"

export default function (state, action) {
	switch (action.type) {

		case ACTION_TOGGLE:
			return {
				status: (state.remainingSeconds > 0 && state.status === DISPLAY_STOPPED) ? DISPLAY_STARTED : DISPLAY_STOPPED,
				remainingSeconds: state.remainingSeconds,
				currentTime: state.currentTime
			}

		case ACTION_SET_TIME:
			const [seconds, minutes] = action.value.split(":").map((i) => parseInt(i, 10)).reverse()
			state.remainingSeconds = minutes * 60 + seconds
			return {
				status: DISPLAY_STARTED,
				remainingSeconds: minutes * 60 + seconds,
				currentTime: state.currentTime
			}

		case ACTION_TICK:
			if (state.status === DISPLAY_STARTED) {
				if (state.remainingSeconds > 0) {
					state.remainingSeconds--
				} else {
					state.status = DISPLAY_ALERTED
				}
			}

			return {
				status: state.status,
				remainingSeconds: state.remainingSeconds,
				currentTime: action.currentTime
			}


		default:
			return state
	}
}