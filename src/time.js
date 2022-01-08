class Time {

	constructor(moment) {
		this.moment = moment;
	}

	getCurrentDate() {
		return this.moment().locale("ru").format("DD.MM.YYYY, dddd");
	}

	getCurrentTime() {
		return this.moment().format("HH:mm:ss");
	}
}

module.exports = Time;