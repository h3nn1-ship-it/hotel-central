// Fixed timezone so server-rendered times match Stuttgart, not the server's UTC
export const formatDateTime = (isoString: string) => {
	const format = (options: Intl.DateTimeFormatOptions) =>
		new Date(isoString).toLocaleString('de-DE', { timeZone: 'Europe/Berlin', ...options });

	return `${format({ day: 'numeric' })}. ${format({ month: 'long' })} | ${format({ hour: 'numeric' })}`;
};
