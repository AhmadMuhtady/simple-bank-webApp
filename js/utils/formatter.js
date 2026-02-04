const Formatter = {
	currency(amount, currencyCode = 'USD') {
		const currencyInfo = Currency.get(currencyCode);

		return new Intl.NumberFormat(currencyInfo.locale, {
			style: 'currency',
			currency: currencyCode,
			minimumFractionDigits: currencyInfo.decimals,
			maximumFractionDigits: currencyInfo.decimals,
		}).format(amount);
	},

	date(isoString) {
		const date = new Date(isoString);

		return new Intl.DateTimeFormat('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
			hour: 'numeric',
			minute: '2-digit',
		}).format(date);
	},

	relativeTime(isoString) {
		const date = new Date(isoString);
		const now = new Date();
		const diffMs = now - date;
		const diffMins = Math.floor(diffMs / 60000);
		const diffHours = Math.floor(diffMs / 3600000);
		const diffDays = Math.floor(diffMs / 86400000);
		const diffWeeks = Math.floor(diffMs / 604800000);

		if (diffMins < 1) return 'Just now';

		if (diffMins < 60)
			return `${diffMins} ${diffMins > 1 ? 'mins' : 'min'} ago`;

		if (diffHours < 24)
			return `${diffHours} ${diffHours > 1 ? 'hours' : 'hour'} ago`;

		if (diffDays < 7) return `${diffDays} ${diffDays > 1 ? 'days' : 'day'} ago`;

		if (diffWeeks < 4)
			return `${diffWeeks} ${diffWeeks > 1 ? 'weeks' : 'week'} ago`;

		return this.date(isoString);
	},

	accountNumber(id) {
		const idStr = String(id);
		return '****' + idStr.slice(-4);
	},
};
