import { useState } from "react";
import { TextField, Button, Box, MenuItem } from "@mui/material";

const categories = ["All", "Food", "Travel", "Entertainment", "Utilities", "Other"];

function ExpenseFilter({ filterExpenses }) {
    const [filter, setFilter] = useState({
        category: "",
        startDate: "",
        endDate: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        filterExpenses(
            filter.category === "All" ? "" : filter.category,
            filter.startDate ? new Date(filter.startDate) : null,
            filter.endDate ? new Date(filter.endDate) : null,
        );
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ bgcolor: "#fff", borderRadius: 2, boxShadow: 1, p: 3 }}>

            <Box sx={{ display: 'flex', gap: '2em' }}>
                <TextField
                    select
                    label="Category"
                    name="category"
                    value={filter.category}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                >
                    {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Start Date"
                    name="startDate"
                    type="date"
                    value={filter.startDate}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="End Date"
                    name="endDate"
                    type="date"
                    value={filter.endDate}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
            </Box>
            <Button type="submit" variant="contained" sx={{
                mt: 2,
                bgcolor: "black",
                color: "white",
                "&:hover": { bgcolor: "gray" },
            }}>
                Filter Expenses
            </Button>
        </Box>
    );
}

export default ExpenseFilter;