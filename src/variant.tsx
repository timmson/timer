import React, {useContext} from "react"

import Context from "./context"
import {ACTION_SET_TIME} from "./constants"

type VariantProps = {
	key: number
	value: string
}

export default function Variant(props: VariantProps) {

	const dispatch = useContext(Context)

	return (
		<div className="variants col-sm">
			<a href="#" onClick={() => dispatch({type: ACTION_SET_TIME, value: props.value})}>{props.value}</a>
		</div>
	)
}
