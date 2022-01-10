const React = require("react");
const PropTypes = require("prop-types");

class Version extends React.Component {

	static propTypes = {
		year: PropTypes.string,
		oldUrl: PropTypes.string
	};

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div className="row">
				<div className="col" style={{textAlign: "right", color: "#666"}}>
					Версия {this.props.year} года. Ищете <a href={this.props.oldUrl}>старую версию</a>?
				</div>
			</div>
		);
	}
}

module.exports = Version;