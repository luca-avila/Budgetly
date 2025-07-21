export function displayTransactions(transactions, containerId, onClick) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    if (!transactions.length) {
        container.innerHTML = 'No transactions found';
        return;
    }

    const list = document.createElement('div');
    
    transactions.forEach(transaction => {
        const item = document.createElement('div');

        const type = document.createElement('span');
        type.textContent = transaction.type;

        const amount = document.createElement('span');
        amount.textContent = transaction.amount;

        const category = document.createElement('span');
        category.textContent = transaction.category;

        item.appendChild(type);
        item.appendChild(amount);
        item.appendChild(category);

        item.addEventListener('click', () => onClick(transaction));

        list.appendChild(item);
    });
    
    container.appendChild(list);
}

export function showAddForm(containerId, onSubmit) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    const form = document.createElement('form');

    const fields = [
        { type: 'text', placeholder: 'Type (e.g. Income, Expense)', name: 'type' },
        { type: 'number', placeholder: 'Amount', name: 'amount' },
        { type: 'text', placeholder: 'Category', name: 'category' },
        { type: 'text', placeholder: 'Description', name: 'description' }
    ];

    const inputs = {};

    fields.forEach(field => {
        const input = document.createElement('input');
        input.type = field.type;
        input.placeholder = field.placeholder;
        input.name = field.name;
        input.required = true;
        inputs[field.name] = input;
        form.appendChild(input);
    });

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.textContent = 'Add';
    form.appendChild(submit);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = parseFloat(inputs.amount.value);
        if (isNaN(amount)) {
            alert('Please enter a valid amount');
            return;
        }
        const transaction = {
            type: inputs.type.value,
            amount: amount,
            category: inputs.category.value,
            description: inputs.description.value
        };
        try {
            onSubmit(transaction);
            form.reset();
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    });

    container.appendChild(form);
}

export function showTransactionDetails(transaction, containerId, onDelete, onEdit, onBack) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    const details = document.createElement('div');
    details.innerHTML = `
        <h3>${transaction.type}</h3>
        <p>Amount: $${transaction.amount}</p>
        <p>Category: ${transaction.category}</p>
        <p>Description: ${transaction.description}</p>
        <p>Date: ${transaction.date}</p>
    `;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        onDelete(transaction);
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
        onEdit(transaction);
    });

    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.addEventListener('click', onBack);

    container.appendChild(details);
    container.appendChild(deleteButton);
    container.appendChild(editButton);
    container.appendChild(backButton);
}

export function showEditForm(transaction, containerId, onSubmit) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    const form = document.createElement('form');

    const fields = [
        { type: 'text', placeholder: 'Type (e.g. Income, Expense)', name: 'type' },
        { type: 'number', placeholder: 'Amount', name: 'amount' },
        { type: 'text', placeholder: 'Category', name: 'category' },
        { type: 'text', placeholder: 'Description', name: 'description' }
    ];

    const inputs = {};

    fields.forEach(field => {
        const input = document.createElement('input');
        input.type = field.type;
        input.placeholder = field.placeholder;
        input.name = field.name;
        input.required = true;
        input.value = transaction[field.name] || '';
        inputs[field.name] = input;
        form.appendChild(input);
    });

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.textContent = 'Save';
    form.appendChild(submit);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = parseFloat(inputs.amount.value);
        if (isNaN(amount)) {
            alert('Please enter a valid amount');
            return;
        }
        const updatedTransaction = {
            type: inputs.type.value,
            amount: amount,
            category: inputs.category.value,
            description: inputs.description.value
        };
        onSubmit(transaction.id, updatedTransaction);
    });

    container.appendChild(form);
}