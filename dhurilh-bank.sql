CREATE DATABASE dhurilh_bank;

USE dhurilh_bank;

-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    account_balance DECIMAL(15, 2) DEFAULT 600000.00,  -- Initial account balance
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions Table
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    transaction_type ENUM('deposit', 'withdrawal', 'transfer') NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('completed', 'pending') DEFAULT 'completed',
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Bills Table
CREATE TABLE bills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    biller_name VARCHAR(255),
    amount DECIMAL(15, 2) NOT NULL,
    due_date DATE,
    status ENUM('paid', 'unpaid') DEFAULT 'unpaid',
    FOREIGN KEY (user_id) REFERENCES users(id)
);
-- Inserting a user (you can change this data as needed)
INSERT INTO users (name, email, password) 
VALUES ('John Doe', 'john.doe@example.com', 'password123');

-- Inserting some transactions
INSERT INTO transactions (user_id, transaction_type, amount, status) 
VALUES (1, 'deposit', 50000.00, 'completed'),
       (1, 'withdrawal', 2000.00, 'completed'),
       (1, 'transfer', 10000.00, 'completed');

-- Inserting some bills
INSERT INTO bills (user_id, biller_name, amount, due_date, status) 
VALUES (1, 'Electricity', 150.00, '2024-12-01', 'unpaid'),
       (1, 'Internet', 80.00, '2024-12-05', 'unpaid');