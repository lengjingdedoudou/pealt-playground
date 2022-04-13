import dayjs from 'dayjs';

function format(time: dayjs.ConfigType, template: dayjs.OptionType = 'YYYY-MM-DD HH:mm:ss') {
	return dayjs(time, template);
}

export function dateTime(time: string | number | Date) {
	if (!time || time === '0000-00-00 00:00:00') return '--';
	return format(new Date(time), 'YYYY-MM-DD HH:mm:ss');
}

export function date(time: string | number | Date) {
	if (!time || time === '0000-00-00 00:00:00') return '--';
	return format(new Date(time), 'YYYY-MM-DD');
}

export function time(time: string | number | Date) {
	if (!time || time === '0000-00-00 00:00:00') return '--';
	return format(new Date(time), 'HH:mm:ss');
}
