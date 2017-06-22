import test from 'ava';
import RRule from 'rrule';
import convert from '.';

test('Convert FREQ', () => {
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

test('Convert COUNT', () => {
	// iCAL: COUNT -
	// WX: afterMeetingNumb - [1 ... 999]
	t.is(convert.count(1), '<afterMeetingNumber>1</afterMeetingNumber>');
	t.is(convert.count(999), '<afterMeetingNumber>99</afterMeetingNumber>');
	t.throws(() => convert.count(1000), 'WebEx does not support numbers greater than 999');
	t.throws(() => convert.count(-1), 'Expects a number greater than 0, received -1');
});

test('Convert INTERVAL', () => {
	// iCAL: COUNT -
	// WX: INTERVAL - [1 ... 99]

	t.is(convert.interval(1), '<interval>1</interval>');
	t.is(convert.interval(99), '<interval>99</interval>');
	t.throws(() => convert.interval(100), 'WebEx does not support numbers greater than 99');
	t.throws(() => convert.interval(0), 'Expects a number greater than 1, received -1');
});

test('Convert BYDAY/byweekday', () => {
	t.is(convert.byweekday([RRule.MO, RRule.SU]),
		 '<dayInWeek><day>MONDAY</day><day>SUNDAY</day></dayInWeek>');
	t.is(convert.byweekday(RRule.TU),
		 '<dayInWeek><day>MONDAY</day><day>TUESDAY</day></dayInWeek>');
	t.is(convert.byweekday(RRule.WE),
		 '<dayInWeek><day>MONDAY</day><day>WEDNESDAY</day></dayInWeek>');
	t.is(convert.byweekday(RRule.TH),
		 '<dayInWeek><day>MONDAY</day><day>THURSDAY</day></dayInWeek>');
	t.is(convert.byweekday(RRule.FR),
		 '<dayInWeek><day>MONDAY</day><day>FRIDAY</day></dayInWeek>');
	t.is(convert.byweekday(RRule.SA),
		 '<dayInWeek><day>MONDAY</day><day>SATURDAY</day></dayInWeek>');
});

test('Convert BYMONTHDAY', () => {
	t.is(convert.bymonthday(31), '<dayInMonth>31</dayInMonth>');
	t.is(convert.bymonthday(1), '<dayInMonth>1</dayInMonth>');

	t.throws(() => convert.bymonthday(0), 'Expects a number greater than 0, received 0');
	t.throws(() => convert.bymonthday(32), 'Expects a number less than 32, received 32');
});

test('Convert UNTIL', () => {

});

test('Convert BYWEEKNO', () => {

});

test('convert BYMONTH', () => {
	// iCal: BYMONTH
	// W: <monthInYear>

	t.is(convert.bymonth(1), '<monthInYear>1</monthInYear>');
	t.is(convert.bymonth(12), '<monthInYear>12</monthInYear>');

	t.throws(() => convert.bymonth(13), 'Expects a number less than 13, received 13');
	t.throws(() => convert.bymonth(0), 'Expects a number greater than 0, received 0');
});
