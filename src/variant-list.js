const React = require("react");
const PropTypes = require("prop-types");

class VariantList extends React.Component {

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

VariantList.propTypes = {
	variant: PropTypes.any,
	onClick: PropTypes.func,
	variants: PropTypes.arrayOf(PropTypes.string),
};

module.exports = VariantList;