export function getTransactions(transactions,onClick) {
    if (!transactions.length) {
        const noTransactionsMessage = document.createElement('p');
        noTransactionsMessage.textContent = 'No transactions found';
        return noTransactionsMessage;
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
    
    return list;
}

export function getAddForm(onSubmitClick) {
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
            onSubmitClick(transaction);
            form.reset();
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    });
    return form;
}

export function getTransactionDetails(transaction, onDelete, onEdit, onBack) {
    const details = document.createElement('div');
    
    const title = document.createElement('h3');
    title.textContent = transaction.type;
    details.appendChild(title);
    
    const amountPara = document.createElement('p');
    amountPara.textContent = `Amount: $${transaction.amount}`;
    details.appendChild(amountPara);
    
    const categoryPara = document.createElement('p');
    categoryPara.textContent = `Category: ${transaction.category}`;
    details.appendChild(categoryPara);
    
    const descriptionPara = document.createElement('p');
    descriptionPara.textContent = `Description: ${transaction.description}`;
    details.appendChild(descriptionPara);
    
    const datePara = document.createElement('p');
    datePara.textContent = `Date: ${transaction.date}`;
    details.appendChild(datePara);

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

    details.appendChild(deleteButton);
    details.appendChild(editButton);
    details.appendChild(backButton);

    return details;
}

export function getEditForm(transaction, onSubmit) {
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
        
        // Convert ID to string if it exists, otherwise show error
        const transactionId = transaction.id;
        if (!transactionId) {
            alert('Error: Transaction ID not found. Cannot update transaction.');
            return;
        }
        
        const updatedTransaction = {
            type: inputs.type.value,
            amount: amount,
            category: inputs.category.value,
            description: inputs.description.value
        };
        onSubmit(String(transactionId), updatedTransaction);
    });

    return form;
}