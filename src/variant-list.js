const React = require("react");
const PropTypes = require("prop-types");

class VariantList extends React.Component {

	static propTypes = {
		variant: PropTypes.any.isRequired,
		onClick: PropTypes.func.isRequired,
		variants: PropTypes.array.isRequired,
	};

	constructor(props, context) {
		super(props, context);
	}

	render() {
		const Variant = this.props.variant;

		return (
			<div className="row">
				{this.props.variants.map((v, i) => <Variant key={i} onClick={this.props.onClick} value={v}/>)}
			</div>
		);
	}
}

module.exports = VariantList;