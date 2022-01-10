const React = require("react");
const PropTypes = require("prop-types");

const Version = (props) =>
	<div className="row">
		<div className="col" style={{textAlign: "right", color: "#666"}}>
			Версия {props.year} года. Ищете <a href={props.oldUrl}>старую версию</a>?
		</div>
	</div>;

Version.propTypes = {
	year: PropTypes.string,
	oldUrl: PropTypes.string
};

module.exports = Version;