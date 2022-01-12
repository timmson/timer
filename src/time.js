const React = require("react");
const PropTypes = require("prop-types");

const Time = (props) =>
	<div className="row">
		<div className="col currentTime">
			{props.moment.format("HH:mm:ss, dddd, ")}
			<a target={"_blank"} href={props.calendarURL} rel="noreferrer">{props.moment.format("DD.MM.YYYY г.")}</a>
		</div>
	</div>;

Time.propTypes = {
	moment: PropTypes.object.isRequired,
	calendarURL: PropTypes.string.isRequired
};

module.exports = Time;