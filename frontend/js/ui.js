// Simple UI for Budgetly MVP

// ===== BASIC DOM FUNCTIONS =====

// Show all transactions in a simple list
export function displayTransactions(transactions) {
    // Get container element
    const container = document.getElementById('app');
    
    // Clear existing content
    container.innerHTML = '';
    
    // Create transactions list
    const list = document.createElement('div');
    
    // Loop through transactions
    transactions.forEach(transaction => {
        const item = document.createElement('div');
        item.innerHTML = `
            <span>${transaction.type}</span>
            <span>$${transaction.amount}</span>
            <span>${transaction.category}</span>
            <span>${transaction.date}</span>
        `;
        list.appendChild(item);
    });
    
    container.appendChild(list);
}

// Show a simple form to add new transaction
export function showAddForm() {
    // Create form with: type, amount, category, description
    // Add submit button
    // Handle form submit
}

// Show simple edit form
export function showEditForm(transaction) {
    // Create form with pre-filled data
    // Handle form submit
}

// Show delete confirmation
export function confirmDelete(id) {
    // Show simple confirm dialog
    // If yes, delete transaction
}

// ===== UTILITY FUNCTIONS =====

// Show loading message
export function showLoading() {
    // Display "Loading..." text
}

// Hide loading message  
export function hideLoading() {
    // Remove loading text
}

// Show error message
export function showError(message) {
    // Display error text
}

// Show success message
export function showSuccess(message) {
    // Display success text
}

// ===== TEST FUNCTION =====
// Test the displayTransactions function
function testDisplayTransactions() {
    const mockTransactions = [
        {
            id: 1,
            type: 'Buy',
            amount: 50.00,
            category: 'Food',
            date: '2024-01-15'
        },
        {
            id: 2,
            type: 'Income',
            amount: 1000.00,
            category: 'Salary',
            date: '2024-01-14'
        },
        {
            id: 3,
            type: 'Buy',
            amount: 25.99,
            category: 'Entertainment',
            date: '2024-01-13'
        }
    ];
    
    displayTransactions(mockTransactions);
}

// Run test when page loads
document.addEventListener('DOMContentLoaded', testDisplayTransactions);
