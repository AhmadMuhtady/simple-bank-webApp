class AccountService {
	static deposit(accountId, amount, description = '') {
		const accounts = StorageService.getAccounts();
		const account = accounts.find((acc) => acc.id === accountId);

		if (!account) {
			return { success: false, error: 'Account not found' };
		}

		if (!Validator.isValidAmount(amount)) {
			return { success: false, error: 'Invalid amount' };
		}

		account.balance += parseFloat(amount);

		const newTransaction = new Transaction(
			'deposit',
			parseFloat(amount),
			null,
			account.id,
			description || 'Deposit',
			account.currency,
		);

		account.transactions.push(newTransaction);
		StorageService.saveAccounts(accounts);

		return {
			success: true,
			account: account,
			transaction: newTransaction,
		};
	}

	static withdraw(accountId, amount, description = '') {
		const accounts = StorageService.getAccounts();
		const account = accounts.find((acc) => acc.id === accountId);

		if (!account) {
			return { success: false, error: 'Account not found' };
		}

		if (!Validator.isValidAmount(amount)) {
			return { success: false, error: 'Invalid amount' };
		}

		const withdrawAmount = parseFloat(amount);

		if (withdrawAmount > account.balance) {
			return { success: false, error: 'Insufficient funds' };
		}

		account.balance -= withdrawAmount;

		const newTransaction = new Transaction(
			'withdraw',
			withdrawAmount,
			account.id,
			null,
			description || 'Withdrawal',
			account.currency,
		);

		account.transactions.push(newTransaction);
		StorageService.saveAccounts(accounts);

		return {
			success: true,
			account: account,
			transaction: newTransaction,
		};
	}
	static transfer(fromId, toEmail, amount, description = '') {
		const accounts = StorageService.getAccounts();
		const senderAccount = accounts.find((acc) => acc.id === fromId);

		if (!senderAccount) {
			return { success: false, error: 'Sender account not found' };
		}

		const receiverAccount = accounts.find(
			(acc) => acc.email === toEmail.toLowerCase().trim(),
		);

		if (!receiverAccount) {
			return { success: false, error: 'Recipient not found' };
		}

		if (senderAccount.id === receiverAccount.id) {
			return { success: false, error: 'Cannot transfer to yourself' };
		}

		if (!Validator.isValidAmount(amount)) {
			return { success: false, error: 'Invalid amount' };
		}

		const transferAmount = parseFloat(amount);

		if (transferAmount > senderAccount.balance) {
			return { success: false, error: 'Insufficient funds' };
		}

		// ✨ NEW: Handle currency conversion
		let receivedAmount = transferAmount;
		let exchangeRate = 1;

		if (senderAccount.currency !== receiverAccount.currency) {
			receivedAmount = Currency.convert(
				transferAmount,
				senderAccount.currency,
				receiverAccount.currency,
			);

			// Calculate exchange rate for display
			exchangeRate = receivedAmount / transferAmount;
		}

		// Update balances
		senderAccount.balance -= transferAmount;
		receiverAccount.balance += receivedAmount;

		// Create transactions for both accounts
		const senderTransaction = new Transaction(
			'transfer',
			transferAmount,
			senderAccount.id,
			receiverAccount.id,
			description || 'Transfer',
			senderAccount.currency,
		);

		const receiverTransaction = new Transaction(
			'transfer',
			receivedAmount,
			senderAccount.id,
			receiverAccount.id,
			description || 'Transfer',
			receiverAccount.currency,
		);

		// ✨ NEW: Store exchange info if conversion happened
		if (senderAccount.currency !== receiverAccount.currency) {
			senderTransaction.exchangeRate = exchangeRate;
			senderTransaction.originalAmount = transferAmount;
			senderTransaction.originalCurrency = senderAccount.currency;

			receiverTransaction.exchangeRate = exchangeRate;
			receiverTransaction.originalAmount = transferAmount;
			receiverTransaction.originalCurrency = senderAccount.currency;
		}

		senderAccount.transactions.push(senderTransaction);
		receiverAccount.transactions.push(receiverTransaction);

		StorageService.saveAccounts(accounts);

		return {
			success: true,
			fromAccount: senderAccount,
			toAccount: receiverAccount,
			senderTransaction: senderTransaction,
			receiverTransaction: receiverTransaction,
			exchangeRate: exchangeRate,
		};
	}
}

console.log('\n=== TESTING EXCHANGE RATES ===\n');

// Create Alice with USD
const alice = AuthService.createAccount(
	'Alice',
	'alice@test.com',
	'1111',
	'USD',
	1000,
);
console.log('✅ Alice created (USD):', alice.balance);

// Create Bob with EUR
const bob = AuthService.createAccount(
	'Bob',
	'bob@test.com',
	'2222',
	'EUR',
	500,
);
// console.log('✅ Bob created (EUR):', bob.balance);

// // Alice sends $100 to Bob
// console.log('\n--- Transfer 1: Alice sends $100 to Bob (EUR) ---');
// const transfer1 = AccountService.transfer(
// 	alice.id,
// 	'bob@test.com',
// 	100,
// 	'Payment for dinner',
// );

// console.log('Success:', transfer1.success);
// console.log('Exchange rate:', transfer1.exchangeRate.toFixed(4));
// console.log(
// 	'Alice sent:',
// 	transfer1.senderTransaction.amount,
// 	transfer1.senderTransaction.currency,
// );
// console.log(
// 	'Bob received:',
// 	transfer1.receiverTransaction.amount,
// 	transfer1.receiverTransaction.currency,
// );
// console.log('Alice balance:', transfer1.fromAccount.balance, 'USD');
// console.log('Bob balance:', transfer1.toAccount.balance, 'EUR');

// // Create Charlie with JPY
// const charlie = AuthService.createAccount(
// 	'Charlie',
// 	'charlie@test.com',
// 	'3333',
// 	'JPY',
// 	50000,
// );
// console.log('\n✅ Charlie created (JPY):', charlie.balance);

// // Bob sends €50 to Charlie
// console.log('\n--- Transfer 2: Bob sends €50 to Charlie (JPY) ---');
// const transfer2 = AccountService.transfer(
// 	bob.id,
// 	'charlie@test.com',
// 	50,
// 	'Sushi lunch',
// );

// console.log('Success:', transfer2.success);
// console.log('Exchange rate:', transfer2.exchangeRate.toFixed(4));
// console.log('Bob sent:', transfer2.senderTransaction.amount, 'EUR');
// console.log('Charlie received:', transfer2.receiverTransaction.amount, 'JPY');
// console.log('Bob balance:', transfer2.fromAccount.balance, 'EUR');
// console.log('Charlie balance:', transfer2.toAccount.balance, 'JPY');

// // Test same currency (no conversion)
// console.log("\n--- Transfer 3: Alice sends $50 to Alice's friend (USD) ---");
// const friend = AuthService.createAccount(
// 	'Friend',
// 	'friend@test.com',
// 	'4444',
// 	'USD',
// 	200,
// );
// const transfer3 = AccountService.transfer(
// 	alice.account.id,
// 	'friend@test.com',
// 	50,
// 	'Gift',
// );

// console.log('Success:', transfer3.success);
// console.log('Exchange rate:', transfer3.exchangeRate); // Should be 1
// console.log('Alice sent:', transfer3.senderTransaction.amount, 'USD');
// console.log('Friend received:', transfer3.receiverTransaction.amount, 'USD');
