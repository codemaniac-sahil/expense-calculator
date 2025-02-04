import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { format } from 'date-fns';

function ExpenseList({ expenses, deleteExpense, editExpense }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            {console.log(expenses)}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Amount</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {expenses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((expense) => (
                        <TableRow key={expense._id}>
                            <TableCell>${expense.amount.toFixed(2)}</TableCell>
                            <TableCell>{expense.category}</TableCell>
                            <TableCell>{format(new Date(expense.date), 'PP')}</TableCell>
                            <TableCell>{expense.description}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => editExpense(expense)} size="small">
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => deleteExpense(expense._id)} size="small">
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[2, 5, 10]}
                component="div"
                count={expenses.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}

export default ExpenseList;