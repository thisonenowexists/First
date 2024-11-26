let successfulTransfers = 0;
let failedLogins = 0;
let accountBlocked = false;

// Simulated Database
const user = {
    balance: 10000,
    otp: ["123456", "654321"], // List of valid OTPs
    iban: "DE12345678901234567890", // Valid IBAN
};

// Open OTP Modal
document.getElementById("send-cash").addEventListener("click", () => {
    if (accountBlocked) {
        showBlockedMessage();
    } else {
        document.getElementById("otp-modal").style.display = "flex";
    }
});

// Validate OTP
function validateOTP() {
    const otpInput = document.getElementById("otp-code").value;
    if (user.otp.includes(otpInput)) {
        document.getElementById("otp-modal").style.display = "none";
        document.getElementById("iban-modal").style.display = "flex";
    } else {
        alert("Transaction Denied: Wrong OTP");
    }
}

// Validate IBAN
function validateIBAN() {
    const ibanInput = document.getElementById("iban-number").value;
    if (ibanInput === user.iban) {
        processTransaction();
        document.getElementById("iban-modal").style.display = "none";
    } else {
        alert("Transaction Denied: Wrong IBAN");
    }
}

// Process Transaction
function processTransaction() {
    const amount = parseFloat(document.getElementById("amount").value);
    if (user.balance >= amount) {
        user.balance -= amount;
        successfulTransfers++;
        alert("Transaction Successful! Remaining Balance: " + user.balance);
        if (successfulTransfers >= 2) {
            blockAccount();
        }
    } else {
        alert("Insufficient Balance");
    }
}

// Block Account
function blockAccount() {
    accountBlocked = true;
    showBlockedMessage();
}

// Show Blocked Message
function showBlockedMessage() {
    document.getElementById("blocked-message").style.display = "block";
}

// Restore Access
function restoreAccess() {
    failedLogins++;
    if (failedLogins >= 3) {
        accountBlocked = false;
        successfulTransfers = 0;
        document.getElementById("blocked-message").style.display = "none";
    }
}
let recentTransactions = []; // Array to store transaction history

function addTransaction(recipient, accountNumber, amount) {
    const timestamp = new Date().toLocaleString();
    const transaction = {
        recipient,
        accountNumber,
        amount,
        timestamp,
    };

    recentTransactions.push(transaction);
    updateTransactionHistory();
}

// Update Recent Transactions Section
function updateTransactionHistory() {
    const transactionList = document.getElementById("recent-transactions");
    if (transactionList) {
        transactionList.innerHTML = ""; // Clear the list
        recentTransactions.forEach((txn, index) => {
            const txnElement = document.createElement("li");
            txnElement.textContent = `${index + 1}. ${txn.timestamp} - ${txn.recipient} (${txn.accountNumber}): $${txn.amount}`;
            transactionList.appendChild(txnElement);
        });
    }
}
function simulateFailedLogin() {
    failedLogins++;
    if (failedLogins >= 3) {
        restoreAccountAccess();
    }
}

// Restore Account Access
function restoreAccountAccess() {
    accountBlocked = false;
    successfulTransfers = 0;
    failedLogins = 0;
    alert("Access Restored: Transfer functions are now available.");
    document.getElementById("blocked-message").style.display = "none";
}
function updateBalance() {
    const balanceElement = document.getElementById("balance");
    if (balanceElement) {
        balanceElement.textContent = `Balance: $${user.balance}`;
    }
}
