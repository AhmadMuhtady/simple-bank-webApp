class Currency {
	static CURRENCIES = {
		USD: {
			code: 'USD',
			symbol: '$',
			name: 'US Dollar',
			locale: 'en-US',
			decimals: 2,
		},
		EUR: {
			code: 'EUR',
			symbol: '€',
			name: 'Euro',
			locale: 'de-DE',
			decimals: 2,
		},
		GBP: {
			code: 'GBP',
			symbol: '£',
			name: 'British Pound',
			locale: 'en-GB',
			decimals: 2,
		},
		JPY: {
			code: 'JPY',
			symbol: '¥',
			name: 'Japanese Yen',
			locale: 'ja-JP',
			decimals: 0,
		},
		AUD: {
			code: 'AUD',
			symbol: 'A$',
			name: 'Australian Dollar',
			locale: 'en-AU',

			decimals: 2,
		},
		CAD: {
			code: 'CAD',
			symbol: 'C$',
			name: 'Canadian Dollar',
			locale: 'en-CA',
			decimals: 2,
		},
		CHF: {
			code: 'CHF',
			symbol: 'CHF',
			name: 'Swiss Franc',
			locale: 'de-CH',
			decimals: 2,
		},
		CNY: {
			code: 'CNY',
			symbol: '¥',
			name: 'Chinese Yuan',
			locale: 'zh-CN',
			decimals: 2,
		},
		INR: {
			code: 'INR',
			symbol: '₹',
			name: 'Indian Rupee',
			locale: 'en-IN',
			decimals: 2,
		},
		AED: {
			code: 'AED',
			symbol: 'د.إ',
			name: 'UAE Dirham',
			locale: 'ar-AE',
			decimals: 2,
		},
		SAR: {
			code: 'SAR',
			symbol: '﷼',
			name: 'Saudi Riyal',
			locale: 'ar-SA',
			decimals: 2,
		},
		BRL: {
			code: 'BRL',
			symbol: 'R$',
			name: 'Brazilian Real',
			locale: 'pt-BR',
			decimals: 2,
		},
		MXN: {
			code: 'MXN',
			symbol: 'Mex$',
			name: 'Mexican Peso',
			locale: 'es-MX',
			decimals: 2,
		},
		ZAR: {
			code: 'ZAR',
			symbol: 'R',
			name: 'South African Rand',
			locale: 'en-ZA',
			decimals: 2,
		},
		LBP: {
			code: 'LBP',
			symbol: 'ل.ل.',
			name: 'Lebanese Lira',
			locale: 'ar-LB',
			decimals: 2,
		},
	};

	static EXCHANGE_RATES = {
		USD: 1,
		EUR: 0.92,
		GBP: 0.79,
		JPY: 149.5,
		AUD: 1.52,
		CAD: 1.35,
		CHF: 0.88,
		CNY: 7.24,
		INR: 83.12,
		AED: 3.67,
		SAR: 3.75,
		BRL: 4.97,
		MXN: 17.08,
		ZAR: 18.76,
		LBP: 89500,
	};

	// NEW: Convert amount from one currency to another
	static convert(amount, fromCurrency, toCurrency) {
		// If same currency, no conversion needed
		if (fromCurrency === toCurrency) {
			return amount;
		}

		// Convert to USD first (base currency)
		const amountInUSD = amount / this.EXCHANGE_RATES[fromCurrency];

		// Then convert from USD to target currency
		const convertedAmount = amountInUSD * this.EXCHANGE_RATES[toCurrency];

		// Round to 2 decimals (except JPY which has 0)
		const targetCurrency = this.get(toCurrency);
		return parseFloat(convertedAmount.toFixed(targetCurrency.decimals));
	}

	// Existing methods stay the same
	static getAll() {
		return Object.values(this.CURRENCIES);
	}

	static get(code) {
		return (
			this.CURRENCIES[code] || this.CURRENCIES.USD || { code: 'USD', rate: 1 }
		);
	}

	static isValid(code) {
		return this.CURRENCIES[code] ? true : false;
	}

	static getAll() {
		return Object.values(this.CURRENCIES);
	}

	static get(code) {
		return (
			this.CURRENCIES[code] || this.CURRENCIES.USD || { code: 'USD', rate: 1 }
		);
	}

	static isValid(code) {
		return !!this.CURRENCIES[code];
	}
}
