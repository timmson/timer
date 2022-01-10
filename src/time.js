const React = require("react");
const PropTypes = require("prop-types");

const Time = (props) =>
	<div className="row">
		<div className="col currentTime">
			{props.moment.format("HH:mm:ss, dddd, DD.MM.YYYY г.")}
		</div>
	</div>;

Time.propTypes = {
	moment: PropTypes.object.isRequired
};

module.exports = Time;