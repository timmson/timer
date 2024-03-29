import React, {useEffect, useReducer} from "react"

import Context from "./context"
import Reducer from "./reducer"

import VariantList from "./variant-list"
import Display from "./display"
import Time from "./time"
import Version from "./version"

import {ACTION_TICK, ACTION_TOGGLE, DISPLAY_ALERTED, DISPLAY_STOPPED} from "./constants"

type TimerProps = {
    audio,
    window,
    moment,
    variants: Array<number>,
    calendarURL: string
}

export default function Timer(props: TimerProps) {

	const moment = props.moment
	const window = props.window

	const initialState = {
		status: DISPLAY_STOPPED,
		remainingSeconds: 300,
		currentTime: moment().valueOf()
	}

	const [state, dispatch] = useReducer(Reducer, initialState, () => initialState)

	useEffect(() => {
		const timerID = setInterval(() => dispatch({type: ACTION_TICK, currentTIme: moment.valueOf(), audio: props.audio}), 1000)
		return () => clearTimeout(timerID)
	}, [state])

	if (state.status === DISPLAY_ALERTED) {
		props.audio.play()
	}

	useEffect(() => {
		const startStopHandler = (event) => {
			if (event.key === " ") {
				dispatch({type: ACTION_TOGGLE})
				event.preventDefault()
			}
		}
		window.addEventListener("keyup", startStopHandler)
		return () => window.removeEventListener("keyup", startStopHandler)
	}, [window])

	return (
		<Context.Provider value={dispatch}>
			<div className="container-fluid">
				<VariantList variants={props.variants}/>
				<Display status={state.status} value={state.remainingSeconds}/>
				<Time moment={moment(state.currentTime).locale("ru")} calendarURL={props.calendarURL}/>
				<Version year={"2022"} oldUrl={"./old/"}/>
			</div>
		</Context.Provider>
	)
}
