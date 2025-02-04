const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expensesController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new expense
router.post('/', authMiddleware, expenseController.createExpense);

// Get all expenses for a user
router.get('/', authMiddleware, expenseController.getExpenses);

// Update an expense
router.put('/:id', authMiddleware, expenseController.updateExpense);

// Delete an expense
router.delete('/:id', authMiddleware, expenseController.deleteExpense);

module.exports = router;