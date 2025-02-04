const mongoose = require('mongoose');

const expensesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    description: {
        type: String,
        required: true,
        default: "null"
    },

}, { timestamps: true });

const Expenses = mongoose.model('Expenses', expensesSchema);

module.exports = Expenses;