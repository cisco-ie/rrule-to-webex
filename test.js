import test from 'ava';
import convert from '.';

test('Convert FREQ', t => {
	const PREFIX = "RRULE:FREQ=";
	// iCal: "HOURLY" / "DAILY" / "WEEKLY" / "MONTHLY" / "YEARLY"
	// WX: DAILY, WEEKLY, NO_REPEAT, MONTHLY, YEARLY and CONSTANT
	const DAILY = `${PREFIX}DAILY`;
	const WEEKLY = `${PREFIX}WEEKLY`;
	const MONTHLY = `${PREFIX}MONTHLY`;
	const YEARLY = `${PREFIX}YEARLY`;

	t.is(convert.freq(WEEKLY), '<repeatType>WEEKLY</repeatType>');
	t.is(convert.freq(DAILY), '<repeatType>DAILY/repeatType>');
	t.is(convert.freq(MONTHLY), '<repeatType>MONTHLY</repeatType>');
	t.is(convert.freq(YEARLY), '<repeatType>YEARLY</repeatType>');
});
