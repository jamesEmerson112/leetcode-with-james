class BankManagement:
    def __init__(self):
        self.accounts = {}  # account_name -> {total_amount, total_amount_transaction}

    def create_account(self, timestamp: int, account_name: str) -> bool:
        if account_name in self.accounts:
            return False
        self.accounts[account_name] = {
            'total_amount': 0,
            'total_amount_transaction': 0
        }
        return True

    def deposit(self, timestamp: int, account_name: str, amount: int) -> int:
        if account_name not in self.accounts:
            return -1
        self.accounts[account_name]['total_amount'] += amount
        self.accounts[account_name]['total_amount_transaction'] += amount
        return self.accounts[account_name]['total_amount']

    def pay(self, timestamp: int, account_name: str, amount: int) -> int:
        if account_name not in self.accounts:
            return -1
        if self.accounts[account_name]['total_amount'] < amount:
            return -1
        self.accounts[account_name]['total_amount'] -= amount
        self.accounts[account_name]['total_amount_transaction'] += amount
        return self.accounts[account_name]['total_amount']

    def top_k_ranking(self, k: int) -> list:
        # Build list of tuples: (-transaction_amount, account_name)
        # Negative so highest transaction comes first when sorted
        ranking_list = []
        for account_name in self.accounts:
            transaction_amount = self.accounts[account_name]['total_amount_transaction']
            ranking_list.append((-transaction_amount, account_name))

        # Sort: first by -transaction (descending), then by name (alphabetical tie-breaker)
        ranking_list.sort()

        # Extract just the account names for top k
        result = []
        for i in range(min(k, len(ranking_list))):
            result.append(ranking_list[i][1])  # [1] is the account_name

        return result


# Test the fix
if __name__ == "__main__":
    bank = BankManagement()

    # Create 3 accounts with no transactions
    bank.create_account(1, "alice")
    bank.create_account(2, "bob")
    bank.create_account(3, "charlie")

    # Test: top 2 should return exactly 2 (alphabetically: alice, bob)
    print("Top 2 with no transactions:", bank.top_k_ranking(2))

    # Add some transactions
    bank.deposit(4, "charlie", 100)
    bank.deposit(5, "alice", 50)

    # Now charlie has 100 transactions, alice has 50, bob has 0
    print("Top 2 after deposits:", bank.top_k_ranking(2))
