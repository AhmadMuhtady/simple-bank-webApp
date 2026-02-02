class Transaction {
	constructor(type, amount, from, to, description, currency) {
		this.id = crypto.randomUUID();
		this.type = type;
		this.amount = parseFloat(amount);
		this.currency = currency;
		this.from = from;
		this.to = to;
		this.description = description || '';
		this.timestamp = new Date().toISOString();
		this.status = 'completed';
	}

	getIcon() {
		if (this.type === 'deposit') return 'savings';
		if (this.type === 'withdraw') return 'account_balance_wallet';
		if (this.type === 'transfer') return 'send';
		return 'receipt';
	}

	getColorClass() {
		if (this.type === 'deposit') return '#50C878';
		if (this.type === 'withdraw') return '#DC143C';
		if (this.type === 'transfer') return '#0F52BA';
	}
}
