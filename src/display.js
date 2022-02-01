import React, {useContext} from "react";
import PropTypes from "prop-types";

import {ACTION_TOGGLE, DISPLAY_ALERTED, DISPLAY_STARTED} from "./constants";
import Context from "./context";

export default function Display(props) {

	const dispatch = useContext(Context);

	const computedClassName = props.status !== DISPLAY_ALERTED ? "timer normal" : "timer alert";
	const dotStyle = props.status === DISPLAY_STARTED ? {animation: "blinker 1s linear infinite"} : {};

	const padZeros = (number) => (number).toString().padStart(2, "0");
	const getSeconds = () => padZeros(props.value % 60);
	const getMinutes = () => padZeros((Math.floor(props.value / 60)));

	return (
		<div className="row">
			<div className="col">
				<div className={computedClassName} onClick={() => dispatch({type: ACTION_TOGGLE})}>
					{getMinutes()}
					<span style={dotStyle}>{":"}</span>
					{getSeconds()}
				</div>
			</div>
		</div>
	);
}

Display.propTypes = {
	status: PropTypes.string.isRequired,
	value: PropTypes.number.isRequired
};
