import React, {useContext} from "react";
import PropTypes from "prop-types";

import Context from "./context";
import {ACTION_SET_TIME} from "./constants";

export default function Variant(props) {

	const dispatch = useContext(Context);

	return (
		<div className="variants col-sm">
			<a href="#" onClick={() => dispatch({type: ACTION_SET_TIME, value: props.value})}>{props.value}</a>
		</div>
	);
}

Variant.propTypes = {
	value: PropTypes.string.isRequired
};