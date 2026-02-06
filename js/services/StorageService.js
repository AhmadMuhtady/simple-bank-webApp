class StorageService {
	// Define keys as constants (prevents typos!)
	static KEYS = {
		ACCOUNTS: 'bank_accounts',
		CURRENT_USER: 'current_user',
		LAST_ACTIVITY: 'last_activity',
	};

	// Save array of accounts to localStorage
	static saveAccounts(accounts) {
		localStorage.setItem(this.KEYS.ACCOUNTS, JSON.stringify(accounts));
	}

	// Get all accounts from localStorage
	static getAccounts() {
		try {
			const data = localStorage.getItem(this.KEYS.ACCOUNTS);
			if (!data) return [];
			return JSON.parse(data);
		} catch (error) {
			console.error('Error loading accounts:', error);
			return [];
		}
	}

	// Save current logged-in user ID
	static setCurrentUser(accountId) {
		localStorage.setItem(this.KEYS.CURRENT_USER, accountId);
	}

	// Get current logged-in user ID
	static getCurrentUser() {
		return localStorage.getItem(this.KEYS.CURRENT_USER);
	}

	// Clear current user (logout)
	static clearSession() {
		localStorage.removeItem(this.KEYS.CURRENT_USER);
	}

	// Update last activity timestamp (for auto-logout)
	static updateLastActivity() {
		localStorage.setItem(this.KEYS.LAST_ACTIVITY, Date.now().toString());
	}

	// Get last activity timestamp
	static getLastActivity() {
		const timestamp = localStorage.getItem(this.KEYS.LAST_ACTIVITY);

		return timestamp ? parseInt(timestamp) : null;
	}
}
