import { DateTime, Interval } from 'luxon';

/**
 *
 * @param date
 */
export function parseDateTime(date?: Date | string | null): DateTime {
	if (!date) {
		return DateTime.local();
	}
	if (typeof date === 'string') {
		if (date.includes('T')) {
			return DateTime.fromISO(date);
		} else {
			return DateTime.fromSQL(date);
		}
	} else {
		return DateTime.fromJSDate(date);
	}
}

/**
 *
 * @param date
 */
export function parseDate(date?: Date | string | null): DateTime {
	const dateTime = parseDateTime(date);
	return dateTime.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
}

export function daysBetweenDateTime(date1: DateTime, date2: DateTime): number {
	return Math.floor(Interval.fromDateTimes(date1, date2).length('days'));
}

export function daysBetween(date1: Date | string, date2: Date | string): number {
	const d1 = parseDate(date1);
	const d2 = parseDate(date2);
	return daysBetweenDateTime(d1, d2);
}
