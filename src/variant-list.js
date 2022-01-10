const React = require("react");
const PropTypes = require("prop-types");

const VariantList = (props) => {
	const Variant = props.variant;

	return (
		<div className="row">
			{props.variants.map((v, i) => <Variant key={i} onClick={props.onClick} value={v}/>)}
		</div>
	);
};

VariantList.propTypes = {
	variant: PropTypes.any.isRequired,
	onClick: PropTypes.func.isRequired,
	variants: PropTypes.array.isRequired,
};

module.exports = VariantList;