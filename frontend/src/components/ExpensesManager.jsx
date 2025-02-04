import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import ExpenseFilter from './ExpenseFilter';

const ExpensesManager = () => {
    const [expenses, setExpenses] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [editingExpense, setEditingExpense] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch('/api/expenses', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();


                if (response.ok) {
                    setExpenses(data);
                    setFilteredExpenses(data);
                } else {
                    setError(data.msg);
                }
            } catch (err) {
                setError('An error occurred. Please try again.');
            }
        };

        fetchExpenses();
    }, []);

    const addExpense = async (expense) => {
        try {
            const response = await fetch('/api/expenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(expense),
            });

            const data = await response.json();

            if (response.ok) {
                setExpenses([...expenses, data]);
                setFilteredExpenses([...expenses, data]);
            } else {
                setError(data.msg);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    const updateExpense = async (expense) => {
        try {

            const response = await fetch(`/api/expenses/${expense.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(expense),
            });

            const data = await response.json();

            if (response.ok) {
                const updatedExpenses = expenses.filter((expense) => expense._id !== id);
                setExpenses(updatedExpenses);
                setFilteredExpenses(updatedExpenses);

                setEditingExpense(null);
            } else {
                setError(data.msg);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    const deleteExpense = async (id) => {
        try {
            const response = await fetch(`/api/expenses/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const updatedExpenses = expenses.filter((expense) => expense._id !== id);
                setExpenses(updatedExpenses);
                setFilteredExpenses(updatedExpenses);
            } else {
                const data = await response.json();
                setError(data.msg);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    const filterExpenses = (category, startDate, endDate) => {
        const filtered = expenses.filter((expense) => {
            const categoryMatch = !category || expense.category === category;
            const dateMatch = (!startDate || new Date(expense.date) >= new Date(startDate)) && (!endDate || new Date(expense.date) <= new Date(endDate));
            return categoryMatch && dateMatch;
        });
        setFilteredExpenses(filtered);
    };

    const editExpense = (expense) => {
        setEditingExpense(expense);
    };

    return (
        <Container sx={{ maxWidth: "100%", display: 'flex', flexDirection: 'column', gap: '2em' }} >
            <Box sx={{ my: 4 }}>
                <Typography variant="h5" component="h1" gutterBottom>
                    Expense Manager
                </Typography>
            </Box>
            {error && <Typography color="error">{error}</Typography>}
            <ExpenseForm addExpense={addExpense} updateExpense={updateExpense} editingExpense={editingExpense} />
            <ExpenseFilter filterExpenses={filterExpenses} />
            <ExpenseList expenses={filteredExpenses} deleteExpense={deleteExpense} editExpense={editExpense} />
        </Container>
    );
};

export default ExpensesManager;