# rrule-to-webex [![Build Status](https://travis-ci.org/cisco-ie/rrule-to-webex.svg?branch=master)](https://travis-ci.org/cisco-ie/rrule-to-webex) [![Coverage Status](https://coveralls.io/repos/github/cisco-ie/rrule-to-webex/badge.svg?branch=master)](https://coveralls.io/github/cisco-ie/rrule-to-webex?branch=master) [![Stellaris Module](https://img.shields.io/badge/%20✨%20Stellaris-Module-0092ff.svg?style=flat-square)](https://github.com/stellaris-ie/)

> Converts iCalendar RFC-5545 recurrence rule to Cisco's WebEx XML `<repeat>` XML sub tree

This module uses [`RRule.js`](https://github.com/jakubroztocil/rrule) to process iCalendar RFC RRule strings, therefore it also supports the ability to create `<repeat>` trees with `RRule.js`'s objects. It's recommended to please go over the documentation to understand some of the differences between iCalendar RFC. 

## Install

```
$ npm install --save rrule-to-webex
```


## Usage

```js
const convert = require('rrule-to-webex');

const RFCString = "FREQ=WEEKLY;INTERVAL=5;UNTIL=20130130T230000Z;BYDAY=MO,FR";

convert(RFCString);
// === Output ===
// <repeat>
//    <repeatType>WEEKLY</repeatType>
//    <interval>5</interval>
//    <expirationDate>01/30/2013 17:00:00</expirationDate>
//    <dayInWeek>
//      <day>MONDAY</day>
//      <day>FRIDAY</day>
//    </dayInWeek>
// </repeat>
```

## Supported RFC Reccur Parts
WebEx only supports a subset of the available (RFC iCalendar Recurrence parts](https://tools.ietf.org/html/rfc5545#section-3.3.10), this module attempts to map the available properties as defined in the `repeat` schema below to their iCalendar counter parts.

![Repeat Schema](https://user-images.githubusercontent.com/6020066/27402017-dfa99724-568a-11e7-949c-b6e5e479c8f1.png)

### Caveats:
- **dayInYear** is deprecated, thus is not supported by this module

## API

### rruleToWebEx(RRule)

Returns a XML tree defined by the WebEx repeat schema.

#### RRule

Type: `string` (iCalendar RFC String) || `object` (RRule.js Object)

The iCalendar String or RRule.js object to be converted

### Specific Methods
`rrule-to-webex` also provides access to particular RRule conversion methods for custom uses and individual part conversion.

### .freq(frequencyTypes)
#### frequencyTypes
Type: `RRule.[WEEKlY, DAILY, MONTHLY, YEARLY]`

### .count(number)
#### number
Type: `number`<br>
Range: 1 ... 999

### .interval(number)
#### number
Type: `number`<br>
Range: 1 .. 99

### .byweekday(weekday)
#### weekday
Type: `RRule.[MO, TU, WE, TH, FR, SA]`<br>
Range: 1 .. 99

### .bymonthday(number)
#### number
Type: `number`<br>
Range: 1 .. 99

### .until(date)
#### date
> Uses `moment.js` to parse date strings

Type: `date object` || `date string` ([ISO 8601](https://en.wikipedia.org/wiki/ISO_8601), [RFC 2822](https://tools.ietf.org/html/rfc2822#section-3.3), [`new Date(dateString)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date))

## Related
If you found this client useful, don't forget to star this repository and check other related open-source Cisco modules by the Innovation Edge team:

- [webex-api-client](https://github.com/cisco-ie/webex-api-client) - A node module to simplify interacting with Cisco WebEx XML-based APIs from the browser or server
- [cisco-tp-client](https://github.com/cisco-ie/cisco-tp-client) - A node API client to ease interactions with Cisco WebEx Telepresence-enabled endpoints / codecs
- [webex-time-zones](https://github.com/cisco-ie/webex-time-zones) - 🌐 An enumerated list of Cisco WebEx supported time zones 
- [webex-date](https://github.com/cisco-ie/webex-date) - 🕰 Convert a JavaScript date type, RFC 2822, ISO-8601 to the WebEx XML API supported format.
- [webex-enum-types](https://github.com/cisco-ie/webex-enum-types) - 🍭 A JSON mapping of enumerated types for Cisco's WebEx XML API

## License

MIT © [Cisco Innovation Edge](https://github.com/cisco-ie/rrule-to-webex)
