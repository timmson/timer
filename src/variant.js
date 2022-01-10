const React = require("react");
const PropTypes = require("prop-types");

class Variant extends React.Component {

	static propTypes = {
		id: PropTypes.number,
		value: PropTypes.string,
		onClick: PropTypes.func
	};

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div key={this.props.id} className="variants col-sm">
				<a href="#" onClick={() => this.props.onClick(this.props.value)}>{this.props.value}</a>
			</div>
		);
	}
}

module.exports = Variant;