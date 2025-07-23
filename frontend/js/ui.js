export function getTransactions(transactions, onClick) {
    if (!transactions.length) {
        const noTransactionsMessage = document.createElement('p');
        noTransactionsMessage.textContent = 'No transactions found';
        return noTransactionsMessage;
    }

    const list = document.createElement('div');
    list.classList.add('transaction-list');
    
    transactions.forEach(transaction => {
        const item = document.createElement('div');
        const type = document.createElement('span');
        const amount = document.createElement('span');
        const category = document.createElement('span');

        item.classList.add('transaction-item');
        type.classList.add('fw-bold');
        amount.classList.add('fw-bold');
        
        if (transaction.type === 'Income') {
            item.classList.add('income-item');
        } else if (transaction.type === 'Buy') {
            item.classList.add('buy-item');
        } else {
            item.classList.add('expense-item');
        }

        type.textContent = transaction.type;
        amount.textContent = `$${transaction.amount}`;
        category.textContent = transaction.category;

        item.addEventListener('click', () => onClick(transaction));

        item.appendChild(type);
        item.appendChild(amount);
        item.appendChild(category);
        list.appendChild(item);
    });
    
    return list;
}

export function getAddForm(onSubmitClick) {
    const form = document.createElement('form');
    const submit = document.createElement('button');

    const fields = [
        { type: 'select', name: 'type', label: 'Transaction Type', options: ['Income', 'Buy'] },
        { type: 'number', placeholder: 'Amount', name: 'amount', label: 'Amount' },
        { type: 'text', placeholder: 'Category', name: 'category', label: 'Category' },
        { type: 'text', placeholder: 'Description', name: 'description', label: 'Description' }
    ];

    const inputs = {};

    form.classList.add('container', 'mt-4', 'p-4', 'bg-light', 'rounded', 'shadow-sm');
    form.setAttribute('autocomplete', 'off');

    fields.forEach(field => {
        const formGroup = document.createElement('div');
        const label = document.createElement('label');
        
        formGroup.classList.add('mb-3');
        
        label.classList.add('form-label', 'fw-bold');
        label.textContent = field.label;
        label.setAttribute('for', field.name);
        
        let input;
        if (field.type === 'select') {
            input = document.createElement('select');
            input.classList.add('form-select');
            
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Select transaction type...';
            defaultOption.disabled = true;
            defaultOption.selected = true;
            input.appendChild(defaultOption);
            
            field.options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.textContent = option;
                input.appendChild(optionElement);
            });
        } else {
            input = document.createElement('input');
            input.classList.add('form-control');
            input.setAttribute('autocomplete', 'off');
            input.type = field.type;
            input.placeholder = field.placeholder;
        }
        
        input.name = field.name;
        input.id = field.name;
        input.required = true;
        
        formGroup.appendChild(label);
        formGroup.appendChild(input);
        inputs[field.name] = input;
        form.appendChild(formGroup);
    });

    submit.type = 'submit';
    submit.textContent = 'Add Transaction';
    submit.classList.add('btn', 'btn-primary', 'w-100', 'mt-3');
    form.appendChild(submit);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const transactionType = inputs.type.value;
        if (!transactionType) {
            alert('Please select a transaction type');
            return;
        }
        
        const amount = parseFloat(inputs.amount.value);
        if (isNaN(amount)) {
            alert('Please enter a valid amount');
            return;
        }
        
        const transaction = {
            type: transactionType,
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
    const buttons = document.createElement('div');
    const title = document.createElement('h3');
    const amountPara = document.createElement('p');
    const categoryPara = document.createElement('p');
    const descriptionPara = document.createElement('p');
    const datePara = document.createElement('p');
    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');
    const backButton = document.createElement('button');

    const detailsElements = [
        title,
        amountPara,
        categoryPara,
        descriptionPara,
        datePara
    ];

    const buttonsElements = [
        deleteButton,
        editButton,
        backButton
    ];

    details.classList.add('transaction-details', 'container', 'text-center');
    buttons.classList.add('d-flex', 'gap-3', 'justify-content-center');
    buttonsElements.forEach(element => {
        element.classList.add('btn');
    });
    
    if (transaction.type === 'Income') {
        title.classList.add('income-transaction');
    } else {
        title.classList.add('expense-transaction');
    }

    title.textContent = transaction.type;
    amountPara.textContent = `Amount: $${transaction.amount}`;
    categoryPara.textContent = `Category: ${transaction.category}`;
    descriptionPara.textContent = `Description: ${transaction.description}`;
    datePara.textContent = `Date: ${transaction.date}`;
    deleteButton.textContent = 'Delete';
    editButton.textContent = 'Edit';
    backButton.textContent = 'Back';

    deleteButton.addEventListener('click', () => {
        onDelete(transaction);
    });
    editButton.addEventListener('click', () => {
        onEdit(transaction);
    });
    backButton.addEventListener('click', onBack);

    detailsElements.forEach(element => {
        details.appendChild(element);
    });
    buttonsElements.forEach(element => {
        buttons.appendChild(element);
    });

    details.appendChild(buttons);

    return details;
}

export function getEditForm(transaction, onSubmit) {
    const form = document.createElement('form');
    const submit = document.createElement('button');

    const fields = [
        { type: 'select', name: 'type', label: 'Transaction Type', options: ['Income', 'Buy'] },
        { type: 'number', placeholder: 'Amount', name: 'amount', label: 'Amount' },
        { type: 'text', placeholder: 'Category', name: 'category', label: 'Category' },
        { type: 'text', placeholder: 'Description', name: 'description', label: 'Description' }
    ];

    const inputs = {};

    form.classList.add('container', 'mt-4', 'p-4', 'bg-light', 'rounded', 'shadow-sm');

    fields.forEach(field => {
        const formGroup = document.createElement('div');
        const label = document.createElement('label');
        
        formGroup.classList.add('mb-3');
        
        label.classList.add('form-label', 'fw-bold');
        label.textContent = field.label;
        label.setAttribute('for', field.name);
        
        let input;
        if (field.type === 'select') {
            input = document.createElement('select');
            input.classList.add('form-select');
            
            field.options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.textContent = option;
                if (option === transaction[field.name]) {
                    optionElement.selected = true;
                }
                input.appendChild(optionElement);
            });
        } else {
            input = document.createElement('input');
            input.classList.add('form-control');
            input.type = field.type;
            input.placeholder = field.placeholder;
            input.value = transaction[field.name] || '';
        }
        
        input.name = field.name;
        input.id = field.name;
        input.required = true;
        
        formGroup.appendChild(label);
        formGroup.appendChild(input);
        inputs[field.name] = input;
        form.appendChild(formGroup);
    });

    submit.type = 'submit';
    submit.textContent = 'Save Changes';
    submit.classList.add('btn', 'btn-success', 'w-100', 'mt-3');
    form.appendChild(submit);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const transactionType = inputs.type.value;
        if (!transactionType) {
            alert('Please select a transaction type');
            return;
        }
        
        const amount = parseFloat(inputs.amount.value);
        if (isNaN(amount)) {
            alert('Please enter a valid amount');
            return;
        }
        
        const transactionId = transaction.id;
        if (!transactionId) {
            alert('Error: Transaction ID not found. Cannot update transaction.');
            return;
        }
        
        const updatedTransaction = {
            type: transactionType,
            amount: amount,
            category: inputs.category.value,
            description: inputs.description.value
        };
        onSubmit(String(transactionId), updatedTransaction);
    });

    return form;
}