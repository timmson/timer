const Time = require("../src/time");

class Moment {

	locale(locale) {
		return (locale === "ru") ? this : null;
	}

	format(format) {
		switch (format) {
		case "DD.MM.YYYY, dddd":
			return "yyy";
		case "HH:mm:ss":
			return "xxx";
		default:
			return null;
		}
	}
}

function moment() {
	return new Moment();
}

describe("Time should", () => {

	const time = new Time(moment);

	test("return formatted date", () => {
		expect(time.getCurrentDate()).toEqual("yyy");
	});

	test("return formatted time", () => {
		expect(time.getCurrentTime()).toEqual("xxx");
	});

});