const Time = require("../src/time");

class Moment {

	locale(locale) {
		return (locale === "ru") ? this : null;
	}

	format(format) {
		return (format === "HH:mm:ss, dddd, DD.MM.YYYY г.") ? "xxx" : null;
	}
}

function moment() {
	return new Moment();
}

describe("Time should", () => {

	const time = new Time(moment);

	test("return formatted time", () => {
		expect(time.getCurrentTime()).toEqual("xxx");
	});

});