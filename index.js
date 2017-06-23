'use strict';
const RRule = require('RRule');

// Defining day constants passed by RRule
const MO = RRule.MO;
const TU = RRule.TU;
const WE = RRule.WE;
const TH = RRule.TH;
const FR = RRule.FR;
const SA = RRule.SA;
const SU = RRule.SU;

// Maps the Constant to WebEx Day Constant
const webexDay = {};
webexDay[MO] = 'MONDAY';
webexDay[TU] = 'TUESDAY';
webexDay[WE] = 'WEDNESDAY';
webexDay[TH] = 'THURSDAY';
webexDay[FR] = 'FRIDAY';
webexDay[SA] = 'SATURDAY';
webexDay[SU] = 'SUNDAY';


// Helper to check if a array contains invalid values or not
const arrayValid = (unsureArray, validOptions) => {
	// Returns item if not valid
	const checkValid = item => validOptions.indexOf(item) === -1 ? false : true;
	// returns false if array contains an invalid value
	return unsureArray.reduce((acc, day) => (acc === false) ? false : checkValid(day));
}


module.exports = (input, opts) => {
	if (typeof input !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof input}`);
	}

	opts = opts || {};

	return input + ' & ' + (opts.postfix || 'rainbows');
};

function convert() {

}

module.exports.count = count;

function count (num) {
	rangeCheck(num, 999, 1);
	return `<afterMeetingNumber>${num}</afterMeetingNumber>`;
}

module.exports.interval = interval;

function interval (num) {
	rangeCheck(num, 99, 1);
	return `<interval>${num}</interval>`;
}

module.exports.byweekday = byweekday;

function byweekday (day) {
	const days = (Array.isArray(day)) ? day : [day];
	const supportedDays = [MO, TU, WE, TH, FR, SA, SU];
	const isSupported = arrayValid(days, supportedDays);

	if (!isSupported) {
		throw new Error(`Expected valid days, received ${days}`);
	}

	const dayXml = days.map(day => `<day>${webexDays[day]}</day>`);
	return `<dayInWeek>${dayXml}</dayInWeek>`;
}

module.exports.bymonthday = bymonthday;

function bymonthday (num) {
	rangeCheck(num, 31, 1);
	return `<dayInMonth>${num}</dayInMonth>`;
}

module.exports.byweekno = byweekno;

function byweekno (num) {
	rangeCheck(num, 5, 1);
	return `<weekInMonth>${num}</weekInMonth>`;
}

module.exports.bymonth = bymonth;

function bymonth (num) {
	rangeCheck(num, 12, 1);
	return `<monthInYear>${num}</monthInYear>`;
}

module.exports.freq = freq;

function freq (freqConstant) {

}


// Throws error if numbers are pass max/min conditions, max and min are inclusive to range
function rangeCheck(num, max, min) {
	if (num > max) {
		throw new Error(`Expected a number less than ${max + 1}, received ${num}`);
	}

	if (num < min) {
		throw new Error(`Expected a number greater than ${min - 1}, received ${num}`);
	}

	return num
}
