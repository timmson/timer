import {ACTION_SET_TIME, ACTION_TICK, ACTION_TOGGLE, DISPLAY_ALERTED, DISPLAY_STARTED, DISPLAY_STOPPED} from "./constants"

export default function (state, action) {
	switch (action.type) {

	case ACTION_TOGGLE: {
		return {
			...state,
			status: (state.remainingSeconds > 0 && state.status === DISPLAY_STOPPED) ? DISPLAY_STARTED : DISPLAY_STOPPED
		}
	}

	case ACTION_SET_TIME: {
		const [seconds, minutes] = action.value.split(":").map((i) => parseInt(i, 10)).reverse()
		state.remainingSeconds = minutes * 60 + seconds
		return {
			...state,
			status: DISPLAY_STARTED,
			remainingSeconds: minutes * 60 + seconds
		}
	}

	case ACTION_TICK: {
		if (state.status === DISPLAY_STARTED) {
			if (state.remainingSeconds > 0) {
				state.remainingSeconds--
			} else {
				state.status = DISPLAY_ALERTED
			}
		}

		return {
			...state,
			currentTime: action.currentTime
		}
	}

	default:
		return state
	}
}