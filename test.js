import test from 'ava';
import {
	MO, TU, WE, TH, FR, SA, SU,
	YEARLY, MONTHLY, WEEKLY, DAILY
} from 'rrule';
import convert from '.';

test('Convert FREQ', t => {
	// WX: DAILY, WEEKLY, NO_REPEAT, MONTHLY, YEARLY and CONSTANT
	t.is(convert.freq(WEEKLY), '<repeatType>WEEKLY</repeatType>');
	t.is(convert.freq(DAILY), '<repeatType>DAILY</repeatType>');
	t.is(convert.freq(MONTHLY), '<repeatType>MONTHLY</repeatType>');
	t.is(convert.freq(YEARLY), '<repeatType>YEARLY</repeatType>');
});

test('Convert COUNT', t => {
	// iCAL: COUNT -
	// WX: afterMeetingNumb - [1 ... 999]
	t.is(convert.count(1), '<afterMeetingNumber>1</afterMeetingNumber>');
	t.is(convert.count(999), '<afterMeetingNumber>999</afterMeetingNumber>');
	t.throws(() => convert.count(1000), 'Expected a number less than 1000, received 1000');
	t.throws(() => convert.count(0), 'Expected a number greater than 0, received 0');
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
		 '<dayInWeek><day>TUESDAY</day></dayInWeek>');
	t.is(convert.byweekday(WE),
		 '<dayInWeek><day>WEDNESDAY</day></dayInWeek>');
	t.is(convert.byweekday(TH),
		 '<dayInWeek><day>THURSDAY</day></dayInWeek>');
	t.is(convert.byweekday(FR),
		 '<dayInWeek><day>FRIDAY</day></dayInWeek>');
	t.is(convert.byweekday(SA),
		 '<dayInWeek><day>SATURDAY</day></dayInWeek>');
	t.throws(() => convert.byweekday('FROOODAY'), 'Expected valid inputs (MO,TU,WE,TH,FR,SA,SU), received FROOODAY');
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
	t.is(convert.until(new Date(2015, 10, 31, 8, 30)), '<expirationDate>12/01/2015 08:30:00</expirationDate>');

	t.throws(() => convert.until('tee hee'), 'Invalid date received');
});

test('Convert BYWEEKNO', t => {
	// iCal: byweekno
	// W: <weekInMonth>

	t.is(convert.byweekno(1), '<weekInMonth>1</weekInMonth>');
	t.is(convert.byweekno(5), '<weekInMonth>5</weekInMonth>');

	const errorMax = t.throws(() => convert.byweekno(6), Error);
	t.is(errorMax.message, 'Expected a number less than 6, received 6');
	const errorMin = t.throws(() => convert.byweekno(0), Error);
	t.is(errorMin.message, 'Expected a number greater than 0, received 0');
});

test('Convert BYMONTH', t => {
	// iCal: BYMONTH
	// W: <monthInYear>

	t.is(convert.bymonth(1), '<monthInYear>1</monthInYear>');
	t.is(convert.bymonth(12), '<monthInYear>12</monthInYear>');

	t.throws(() => convert.bymonth(13), 'Expected a number less than 13, received 13');
	t.throws(() => convert.bymonth(0), 'Expected a number greater than 0, received 0');
});
