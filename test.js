import test from 'ava';
import { MO, TU, WE, TH, FR, SA, SU } from 'rrule';
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
	// WX: afterMeetingNumb - [1 ... 999]
	t.is(convert.count(1), '<afterMeetingNumber>1</afterMeetingNumber>');
	t.is(convert.count(999), '<afterMeetingNumber>999</afterMeetingNumber>');
	const errorMax = t.throws(() => convert.count(1000), Error);
	t.is(errorMax.message, 'Expected a number less than 1000, received 1000');
	const errorMin = t.throws(() => convert.count(0), Error);
	t.is(errorMin.message, 'Expected a number greater than 0, received 0');
});

test('Convert INTERVAL', t => {
	// iCAL: COUNT -
	// WX: INTERVAL - [1 ... 99]

	t.is(convert.interval(1), '<interval>1</interval>');
	t.is(convert.interval(99), '<interval>99</interval>');

	const errorMax = t.throws(() => convert.interval(100), Error);
	t.is(errorMax.message, 'Expected a number less than 100, received 100');
	const errorMin = t.throws(() => convert.interval(0), Error);
	t.is(errorMin.message, 'Expected a number greater than 0, received 0');
});

test('Convert BYDAY/byweekday', t => {
	t.is(convert.byweekday([MO, SU]),
		 '<dayInWeek><day>MONDAY</day><day>SUNDAY</day></dayInWeek>');
	t.is(convert.byweekday(TU),
		 '<dayInWeek><day>MONDAY</day><day>TUESDAY</day></dayInWeek>');
	t.is(convert.byweekday(WE),
		 '<dayInWeek><day>MONDAY</day><day>WEDNESDAY</day></dayInWeek>');
	t.is(convert.byweekday(TH),
		 '<dayInWeek><day>MONDAY</day><day>THURSDAY</day></dayInWeek>');
	t.is(convert.byweekday(FR),
		 '<dayInWeek><day>MONDAY</day><day>FRIDAY</day></dayInWeek>');
	t.is(convert.byweekday(SA),
		 '<dayInWeek><day>MONDAY</day><day>SATURDAY</day></dayInWeek>');
});

test('Convert BYMONTHDAY', t => {
	t.is(convert.bymonthday(31), '<dayInMonth>31</dayInMonth>');
	t.is(convert.bymonthday(1), '<dayInMonth>1</dayInMonth>');

	t.throws(() => convert.bymonthday(0), 'Expected a number greater than 0, received 0');
	t.throws(() => convert.bymonthday(32), 'Expected a number less than 32, received 32');
});

test('Convert UNTIL', t => {
	// Thu Jan 31 2013 00:00:00
	t.is(convert.until(new Date(2012, 12, 31)), '<expirationDate>01/31/2013 00:00:00</expirationDate>');

	t.throws(() => convert.until('tee hee'), 'Expected type object, received type string');
	t.throws(() => convert.until(1300), 'Expected type object, received type number');
});

test('Convert BYWEEKNO', t => {
	// iCal: byweekno
	// W: <weekInMonth>

	t.is(convert.byweekno(1), '<weekInMonth>1</weekInMonth>');
	t.is(convert.byweekno(5), '<weekInMonth>5</weekInMonth>');

	t.throws(() => convert.bymonth(6), 'Expected a number less than 6, received 6');
	t.throws(() => convert.bymonth(0), 'Expected a number greater than 0, received 0');
});

test('Convert BYMONTH', t => {
	// iCal: BYMONTH
	// W: <monthInYear>

	t.is(convert.bymonth(1), '<monthInYear>1</monthInYear>');
	t.is(convert.bymonth(12), '<monthInYear>12</monthInYear>');


	const errorMax = t.throws(() => convert.bymonth(13), Error);
	t.is(errorMax.message, 'Expected a number less than 13, received 13');
	const errorMin = t.throws(() => convert.bymonth(0), Error);
	t.is(errorMin.message, 'Expected a number greater than 0, received 0');
});
