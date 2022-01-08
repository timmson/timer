class Time {

	constructor(moment) {
		this.moment = moment;
	}

	getCurrentTime() {
		return this.moment().locale("ru").format("HH:mm:ss, dddd, DD.MM.YYYY г.");
	}
}

module.exports = Time;