const Expenses = require('../model/Expenses');

exports.createExpense = async (req, res) => {
    const { amount, category, date, description } = req.body;

    try {
        const newExpense = new Expenses({
            userId: req.user,
            amount,
            category,
            date,
            description,
        });

        const expense = await newExpense.save();
        res.status(201).json(expense);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expenses.find({ userId: req.user });
        res.json(expenses);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.updateExpense = async (req, res) => {
    const { amount, category, date, description } = req.body;

    try {
        const expense = await Expenses.findOneAndUpdate(
            { _id: req.params.id, userId: req.user },
            { amount, category, date, description },
            { new: true }
        );

        if (!expense) {
            return res.status(404).json({ msg: 'Expense not found' });
        }

        res.json(expense);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const expense = await Expenses.findOneAndDelete({ _id: req.params.id, userId: req.user });

        if (!expense) {
            return res.status(404).json({ msg: 'Expense not found' });
        }

        res.json({ msg: 'Expense removed' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};