'use strict';
const RRule = require('RRule');

module.exports = (input, opts) => {
	if (typeof input !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof input}`);
	}

	opts = opts || {};

	return input + ' & ' + (opts.postfix || 'rainbows');
};




function convert() {

}

module.exports.count = function count (num) {
	numCheck(num, 999, 0);
	return `<afterMeetingNumber>${num}</afterMeetingNumber>`;
}

module.exports.interval = function interval (num) {

}


function numCheck(num, max, min) {
	if (num > max) {
		throw new Error(`Expected a number less than ${max}, received ${num}`);
	}

	if (num < min) {
		throw new Error(`Expected a number greater than ${min}, received ${num}`);
	}

	return num
}
