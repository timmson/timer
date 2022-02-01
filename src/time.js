import React from "react";
import PropTypes from "prop-types";

export default function Time(props) {
	return (
		<div className="row">
			<div className="col currentTime">
				{props.moment.format("HH:mm:ss, dddd, ")}
				<a target={"_blank"} href={props.calendarURL} rel={"noreferrer"}>{props.moment.format("DD.MM.YYYY г.")}</a>
			</div>
		</div>
	);
}

Time.propTypes = {
	moment: PropTypes.object.isRequired,
	calendarURL: PropTypes.string.isRequired
};