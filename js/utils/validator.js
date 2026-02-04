const Validator = {
	isValidEmail(email) {
		const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailReg.test(email);
	},

	isValidPIN(pin) {
		const pinReg = /^\d{4,6}$/;
		return pinReg.test(pin);
	},

	isValidAmount(amount) {
		const regex = /^\d+(\.\d{1,2})?$/;
		return regex.test(amount) && parseFloat(amount) > 0;
	},

	isNotEmpty(value) {
		return value && value.trim().length > 0;
	},

	sanitizeInput(input) {
		if (!input) return '';

		return input
			.trim()
			.replace(/[<>]/g, '')
			.replace(/javascript:/gi, '')
			.replace(/on\w+=/gi, '');
	},

	hasEnoughBalance(amount, balance) {
		return parseFloat(amount) <= parseFloat(balance);
	},

	accountExists(email, accounts) {
		return accounts.some((acc) => acc.email === email);
	},
};
