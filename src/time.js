const React = require("react");
const PropTypes = require("prop-types");

class Time extends React.Component {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div className="row">
				<div className="col currentTime">
					{this.props.moment.format("HH:mm:ss, dddd, DD.MM.YYYY г.")}
				</div>
			</div>
		);
	}
}

Time.propTypes = {
	moment: PropTypes.object
};

module.exports = Time;