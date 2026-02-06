class Account {
	constructor(id, fullName, email, pin, currency = 'USD', balance = 0) {
		this.id = id;
		this.fullName = fullName;
		this.email = email.toLowerCase();
		this.pin = pin;
		this.currency = currency;
		this.balance = parseFloat(balance);
		this.createdAt = new Date().toISOString();
		this.transactions = [];
	}

	getCurrencyInfo() {
		return Currency.get(this.currency);
	}

	getFormattedBalance() {
		return `${this.getCurrencyInfo().symbol}${this.balance.toFixed(2)}`;
	}
}
