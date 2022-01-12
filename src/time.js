const React = require("react");
const PropTypes = require("prop-types");

const Time = (props) =>
	<div className="row">
		<div className="col currentTime">
			{props.moment.format("HH:mm:ss ")}
			<a href={props.calendarURL}>{props.moment.format("dddd, DD.MM.YYYY г.")}</a>
		</div>
	</div>;

Time.propTypes = {
	moment: PropTypes.object.isRequired,
	calendarURL: PropTypes.string.isRequired
};

module.exports = Time;