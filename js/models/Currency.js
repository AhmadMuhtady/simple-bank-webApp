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
