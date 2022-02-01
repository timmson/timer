import React from "react";
import PropTypes from "prop-types";

export default function Version(props) {
	return (
		<div className="row">
			<div className="col" style={{textAlign: "right", color: "#666"}}>
				Версия {props.year} года. Ищете <a href={props.oldUrl}>старую версию</a>?
			</div>
		</div>
	);
}

Version.propTypes = {
	year: PropTypes.string,
	oldUrl: PropTypes.string
};