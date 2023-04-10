import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
export function formatUTC(UTCString: string) {
	return dayjs.utc(UTCString).format('YYYY-MM-DD HH:mm:ss')
}
