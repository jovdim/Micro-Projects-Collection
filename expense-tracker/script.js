document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");
    const totalAmount = document.getElementById("total-amount");
    const filterCategory = document.getElementById("filter-category");
    const submitButton = document.getElementById("submit-button");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let editingId = null;

    // Initialize the UI with saved expenses
    updateUI(expenses);

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("expense-name").value;
        const amount = parseFloat(document.getElementById("expense-amount").value);
        const category = document.getElementById("expense-category").value;
        const date = document.getElementById("expense-date").value;

        if (editingId !== null) {
            // Update the existing expense
            const expense = expenses.find(exp => exp.id === editingId);
            expense.name = name;
            expense.amount = amount;
            expense.category = category;
            expense.date = date;
            editingId = null;
            submitButton.textContent = "Add Expense";
        } else {
            // Add a new expense
            const newExpense = { id: Date.now(), name, amount, category, date };
            expenses.push(newExpense);
        }

        saveExpenses();
        updateUI(expenses);
        expenseForm.reset();
    });

    expenseList.addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id);

        if (e.target.classList.contains("delete-btn")) {
            expenses = expenses.filter(exp => exp.id !== id);
            saveExpenses();
            updateUI(expenses);
        } else if (e.target.classList.contains("edit-btn")) {
            const expense = expenses.find(exp => exp.id === id);
            document.getElementById("expense-name").value = expense.name;
            document.getElementById("expense-amount").value = expense.amount;
            document.getElementById("expense-category").value = expense.category;
            document.getElementById("expense-date").value = expense.date;
            editingId = id;
            submitButton.textContent = "Update Expense";
        }
    });

    filterCategory.addEventListener("change", (e) => {
        const category = e.target.value;
        const filteredExpenses = category === "All" ? expenses : expenses.filter(exp => exp.category === category);
        updateUI(filteredExpenses);
    });

    function updateUI(expenses) {
        expenseList.innerHTML = expenses.map(expense => `
            <tr>
                <td>${expense.name}</td>
                <td>$${expense.amount.toFixed(2)}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>
                    <button class="edit-btn" data-id="${expense.id}">Edit</button>
                    <button class="delete-btn" data-id="${expense.id}">Delete</button>
                </td>
            </tr>
        `).join("");

        const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
        totalAmount.textContent = total.toFixed(2);
    }

    function saveExpenses() {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }
});
