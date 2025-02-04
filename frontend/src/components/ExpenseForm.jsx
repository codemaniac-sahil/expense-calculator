import { useState, useEffect } from "react";
import { TextField, Button, Box, MenuItem, Typography, FormControl, InputLabel, Select } from "@mui/material";

const categories = ["Food", "Travel", "Entertainment", "Utilities", "Other"];

function ExpenseForm({ addExpense, updateExpense, editingExpense }) {
    const [expense, setExpense] = useState({

        amount: "",
        category: "",
        date: "",
        description: "",
    });
    useEffect(() => {
        if (editingExpense) {
            setExpense({

                amount: editingExpense.amount,
                category: editingExpense.category,
                date: new Date(editingExpense.date).toISOString().split("T")[0],
                description: editingExpense.description,
            });
        } else {
            setExpense({
                amount: "",
                category: "",
                date: "",
                description: "",
            });
        }
    }, [editingExpense]);
    console.log(expense)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpense({ ...expense, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (expense.amount && expense.category && expense.date) {
            if (editingExpense) {
                updateExpense({ ...expense, id: editingExpense._id });
            } else {
                addExpense({ ...expense, amount: Number.parseFloat(expense.amount), date: new Date(expense.date) });
            }
            setExpense({ amount: "", category: "", date: "", description: "" });
        }
    };

    return (
        <Box sx={{ p: 3, bgcolor: "#fff", borderRadius: 2, boxShadow: 1, }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                {editingExpense ? "Update Expense" : "Add New Expense"}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} >
                <Box sx={{ display: 'flex', gap: '2em' }}>

                    <TextField
                        label="Amount"
                        name="amount"
                        type="number"
                        value={expense.amount}
                        onChange={handleChange}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Select category</InputLabel>
                        <Select
                            name="category"
                            value={expense.category}
                            onChange={handleChange}
                            required
                        >
                            {categories.map((category) => (
                                <MenuItem key={category} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ display: 'flex', gap: '2em' }}>
                    <TextField
                        label="Date"
                        name="date"
                        type="date"
                        value={expense.date}
                        onChange={handleChange}
                        required
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Description (optional)"
                        name="description"
                        value={expense.description}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        mt: 2,
                        bgcolor: "black",
                        color: "white",
                        "&:hover": { bgcolor: "gray" },
                    }}
                >
                    {editingExpense ? "Update Expense" : "Add Expense"}
                </Button>
            </Box>
        </Box>

    );
}

export default ExpenseForm;