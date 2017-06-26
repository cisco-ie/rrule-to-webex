'use strict';
const RRule = require('RRule');
const legit = require('arr-u-legit');
const moment = require('moment');
const forOwn = require('lodash.forown');

// Defining day constants passed by RRule
const MO = RRule.MO;
const TU = RRule.TU;
const WE = RRule.WE;
const TH = RRule.TH;
const FR = RRule.FR;
const SA = RRule.SA;
const SU = RRule.SU;

const DAILY = RRule.DAILY;
const WEEKLY = RRule.WEEKLY;
const MONTHLY = RRule.MONTHLY;
const YEARLY = RRule.YEARLY;

// Maps the Constant to WebEx Day Constant
const webexDay = {};
webexDay[MO] = 'MONDAY';
webexDay[TU] = 'TUESDAY';
webexDay[WE] = 'WEDNESDAY';
webexDay[TH] = 'THURSDAY';
webexDay[FR] = 'FRIDAY';
webexDay[SA] = 'SATURDAY';
webexDay[SU] = 'SUNDAY';

const webexFreq = {};
webexFreq[DAILY] = 'DAILY';
webexFreq[WEEKLY] = 'WEEKLY';
webexFreq[MONTHLY] = 'MONTHLY';
webexFreq[YEARLY] = 'YEARLY';

const mapFn = {
	count,
	freq,
	interval,
	until,
	bymonthday,
	byweekno,
	byweekday,
	bymonth
};

// Main Function
module.exports = (rule) => {
	let RR;
	if (typeof rule === 'string') {
		const RFCstring = rule;
		RR = RRule.fromString(RFCstring);
	}

	if (typeof rule === 'object') {
		RR = new RRule(rule);
	}

	// Iterate through the RR Original Options
	// Pass the key & value into the mapFn to generate
	// proper xml

	let xmlString = '<repeat>';
	forOwn(RR.origOptions, (value, key) => {
		const xml = mapFn[key](value);
		xmlString += xml;
	});

	xmlString += '</repeat>';
	return xmlString;
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
	let days = (Array.isArray(day)) ? day : [day];
	// Convert to string for comparison check
	days = days.map(day => day.toString());
	const supportedDays = Object.keys(webexDay).map(day => day.toString());
	const isSupported = legit(days, supportedDays);

	if (isSupported === false) {
		throw new Error(`Expected valid inputs (${supportedDays}), received ${days}`);
	}

	const dayXml = days
		  .map(day => `<day>${webexDay[day]}</day>`)
		  .join('');
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

function freq (freqType) {
	// Convert to string for comparison check
	let frequency = freqType.toString();
	const supported = Object.keys(webexFreq);
	const isCorrect = supported.indexOf(frequency) !== -1;

	if (!isCorrect) {
		throw new Error(`Expected valid frequency ${supported.toString()}, received ${freqType}`);
	}

	return `<repeatType>${webexFreq[frequency]}</repeatType>`;
}

module.exports.until = until;

function until(inputDate) {
	if (!moment(inputDate).isValid()) {
		throw new Error('Invalid date received');
	}

	const momentDate = moment(inputDate);

	const webexDate = momentDate.format('MM/DD/YYYY HH:mm:ss');
	return `<expirationDate>${webexDate}</expirationDate>`;
}


// Throws error if numbers are pass max/min conditions, max and min are inclusive to range
function rangeCheck(num, max, min) {
	if (num > max) {
		throw new Error(`Expected a number less than ${max + 1}, received ${num}`);
	}

	if (num < min) {
		throw new Error(`Expected a number greater than ${min - 1}, received ${num}`);
	}

	return num;
}
