class AuthService {
	// Create new account
	static createAccount(fullName, email, pin, currency, initialDeposit = 0) {
		if (!Validator.isNotEmpty(fullName)) {
			return { success: false, error: 'Name is required' };
		}

		if (!Validator.isValidEmail(email)) {
			return { success: false, error: 'Invalid email address' };
		}

		if (!Validator.isValidPIN(pin)) {
			return { success: false, error: 'PIN must be 4-6 digits' };
		}

		if (!Currency.isValid(currency)) {
			return { success: false, error: 'Invalid currency selected' };
		}

		if (initialDeposit < 0) {
			return { success: false, error: 'Initial deposit cannot be negative' };
		}

		const accounts = StorageService.getAccounts();
		if (Validator.accountExists(email, accounts)) {
			return { success: false, error: 'Email already registered' };
		}

		const newAccount = new Account(
			crypto.randomUUID(),
			fullName,
			email.toLowerCase().trim(),
			pin,
			currency,
			initialDeposit,
		);

		if (initialDeposit > 0) {
			const depositTransaction = new Transaction(
				'deposit', // type
				initialDeposit, // amount
				null, // from (no sender for deposits)
				newAccount.id, // to (this account)
				'Initial deposit', // description
				currency, // currency
			);

			newAccount.transactions.push(depositTransaction);
		}

		accounts.push(newAccount);
		StorageService.saveAccounts(accounts);

		StorageService.setCurrentUser(newAccount.id);
		StorageService.updateLastActivity();

		return { success: true, account: newAccount };
	}

	// Login existing user
	static login(email, pin) {
		// 1. VALIDATE INPUTS
		if (!Validator.isValidEmail(email)) {
			return { success: false, error: 'Invalid email address' };
		}

		if (!Validator.isValidPIN(pin)) {
			return { success: false, error: 'PIN must be 4-6 digits' };
		}

		// 2. GET ALL ACCOUNTS
		const accounts = StorageService.getAccounts();

		// 3. FIND ACCOUNT BY EMAIL
		const signInAccount = accounts.find(
			(acc) => acc.email === email.toLowerCase().trim(),
		);

		if (!signInAccount) {
			return { success: false, error: 'Account not found' };
		}

		// 4. VERIFY PIN
		if (signInAccount.pin !== pin) {
			return { success: false, error: 'Incorrect PIN' };
		}

		// 5. LOGIN SUCCESS
		StorageService.setCurrentUser(signInAccount.id);
		StorageService.updateLastActivity();

		return { success: true, account: signInAccount };
	}

	// Logout current user
	static logout() {
		StorageService.clearSession();
		return { success: true };
	}

	// Check if user is logged in
	static isAuthenticated() {
		return !!StorageService.getCurrentUser();
	}

	// Check if session has timed out (auto-logout)
	static checkSessionTimeout(timeoutMinutes = 5) {
		const lastActivity = StorageService.getLastActivity();

		// If no last activity, no session exists
		if (!lastActivity) {
			return false; // No session to timeout
		}

		const now = Date.now();
		const diffMinutes = (now - lastActivity) / 60000;

		if (diffMinutes > timeoutMinutes) {
			this.logout();
			return true; // Session expired
		}

		return false; // Still active
	}

	// Get currently logged-in account object
	static getCurrentAccount() {
		const currentUserId = StorageService.getCurrentUser();

		if (!currentUserId) {
			return null;
		}

		const accounts = StorageService.getAccounts();

		const account = accounts.find((acc) => acc.id === currentUserId);

		return account || null;
	}
}
