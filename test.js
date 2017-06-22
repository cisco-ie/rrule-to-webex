import test from 'ava';
import convert from '.';

test('Convert FREQ', t => {
	const PREFIX = "RRULE:FREQ=";
	// iCal: "HOURLY" / "DAILY" / "WEEKLY" / "MONTHLY" / "YEARLY"
	// WX: DAILY, WEEKLY, NO_REPEAT, MONTHLY, YEARLY and CONSTANT
	const DAILY = 'DAILY';
	const WEEKLY = 'WEEKLY';
	const MONTHLY = 'MONTHLY';
	const YEARLY = 'YEARLY';

	t.is(convert.freq(WEEKLY), '<repeatType>WEEKLY</repeatType>');
	t.is(convert.freq(DAILY), '<repeatType>DAILY/repeatType>');
	t.is(convert.freq(MONTHLY), '<repeatType>MONTHLY</repeatType>');
	t.is(convert.freq(YEARLY), '<repeatType>YEARLY</repeatType>');
});

test('Convert COUNT', t => {
	// iCAL: COUNT -
	// WX: interval - [1 ... 99]
	t.is(convert.count(1), '<afterMeetingNumber>1</afterMeetingNumber>');
	t.is(convert.count(99), '<afterMeetingNumber>99</afterMeetingNumber>');
	t.throws(() => convert.count(99), 'WebEx does not support numbers greater than 99');
	t.throws(() => convert.count(0), 'Expects a number greater than 0, received 0');
});
