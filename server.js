// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dhurilh-bank_db',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database.');
});

app.use(bodyParser.json());

// Transfer Funds API Endpoint
app.post('/api/transfer', (req, res) => {
  const { senderAccount, recipientAccount, amount, note } = req.body;

  // Fetch sender's current balance
  db.query('SELECT balance FROM users WHERE accountNumber = ?', [senderAccount], (err, senderResult) => {
    if (err) return res.status(500).send('Database error');

    const senderBalance = senderResult[0].balance;

    if (senderBalance < amount) {
      return res.status(400).send('Insufficient funds');
    }

    // Process the transfer
    db.query('UPDATE users SET balance = balance - ? WHERE accountNumber = ?', [amount, senderAccount], (err) => {
      if (err) return res.status(500).send('Failed to update sender account');

      db.query('UPDATE users SET balance = balance + ? WHERE accountNumber = ?', [amount, recipientAccount], (err) => {
        if (err) return res.status(500).send('Failed to update recipient account');

        // Log the transaction
        const transaction = {
          senderAccount,
          recipientAccount,
          amount,
          note,
          date: new Date(),
        };
        
        db.query('INSERT INTO transactions SET ?', transaction, (err) => {
          if (err) return res.status(500).send('Failed to log transaction');
          res.status(200).send('Transfer successful');
			
			// server.js
app.post('/api/support', (req, res) => {
  const { userAccount, message } = req.body;

  const supportMessage = {
    userAccount,
    message,
    date: new Date(),
  };

  db.query('INSERT INTO support_messages SET ?', supportMessage, (err) => {
    if (err) return res.status(500).send('Failed to submit support message');
    res.status(200).send('Message sent successfully');
  });
});
        });
      });
    });
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});