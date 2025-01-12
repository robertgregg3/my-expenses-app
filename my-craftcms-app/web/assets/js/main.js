const expenseWhat = document.getElementById('expense-what');
const expenseHowMuch = document.getElementById('expense-how-much');
const expenseWhen = document.getElementById('expense-when');
const saveExpense = document.getElementById('save-expense');
const createdExpenses = document.getElementById('created-expenses');
const totalExpenses = document.querySelector('.total-expenses');

let expenses = [];

saveExpense.addEventListener('click', () => {
    const expense = { 
        what: expenseWhat.value,
        howMuch: expenseHowMuch.value,
        when: expenseWhen.value
    }

    if (!expense.what || !expense.howMuch || !expense.when) {
        alert('Please fill out all fields.');
        return;
    }

    expenses.push(expense);
    console.log(expenses);
    displayExpenses();
});

function displayExpenses() {
    // Clear the existing list to avoid duplication
    createdExpenses.innerHTML = ``;

    // Loop through the expenses and display them
    expenses.length && expenses.forEach((expense, index) => {
        const expenseItem = document.createElement('li');
        expenseItem.classList.add('expense-item');
        expenseItem.innerHTML = `
            <span><strong>What:</strong> ${expense.what}</span>
            <span><strong>How Much:</strong> £${expense.howMuch}</span>
            <span><strong>When:</strong> ${expense.when}</span>
            <button class="delete-expense" data-index="${index}">X</button>
        `;
        createdExpenses.appendChild(expenseItem);
    });

    const deleteButtons = document.querySelectorAll('.delete-expense');

    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const buttonIndex = event.target.dataset.index;
            deleteExpense(buttonIndex)
        });
    })

    localStorage.setItem('expenses', JSON.stringify(expenses));
    totalExpenses.innerHTML = expenses.length ? expenses.length : 0;

}

function displayStoredExpeses() {
    let storedExpenses = JSON.parse(localStorage.getItem('expenses'));
    
    if (storedExpenses) {
        expenses = storedExpenses;
        displayExpenses();
    }
};

displayStoredExpeses();

// Function to delete an expense
function deleteExpense(index) {
    // Remove the expense from the array
    expenses.splice(index, 1);
    displayExpenses(); // Re-render the updated list
}