import { showTransactions, showAddForm, showTransactionDetails, showEditForm } from './ui.js';
import { getFromApi, postToApi, deleteFromApi, patchToApi } from './api.js';

// CONFIGURATION VARIABLES
const API_BASE_URL = 'http://localhost:5000';
const TRANSACTIONS_ENDPOINT = `${API_BASE_URL}/transactions`;
const APP_CONTAINER_ID = 'app';

const appContainer = document.querySelector('#app');

// UTILITY FUNCTIONS

function showError(message) {
    if (appContainer) {
        appContainer.innerHTML = '';
        
        const errorMessage = document.createElement('div');
        errorMessage.textContent = message;
        appContainer.appendChild(errorMessage);
    }
}

// UI HELPER FUNCTIONS

function loadAddButton(){
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Transaction';
    addButton.addEventListener('click', loadAddForm);
    appContainer.appendChild(addButton);
}

function loadBackButton(){
    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.addEventListener('click', initApp);
    appContainer.appendChild(backButton);
}


// DATA OPERATIONS

async function loadTransactions() {
    try {
        const transactions = await getFromApi(TRANSACTIONS_ENDPOINT);
        showTransactions(
            transactions, 
            APP_CONTAINER_ID, 
            handleTransactionClick
        );
    } catch (error) {
        console.error('Error loading transactions:', error);
        showError('Failed to load transactions. Please try again.');
    }
}

// FORM HANDLERS

async function loadAddForm(){
    showAddForm(APP_CONTAINER_ID, onSubmitClick, initApp);
    async function onSubmitClick(newTransaction) {
        try {
            await postToApi(TRANSACTIONS_ENDPOINT, newTransaction);
            await initApp();
        } catch (error) {
            console.error('Error adding transaction:', error);
            showError('Failed to add transaction. Please try again.');
        }
    }
}

// TRANSACTION DETAILS HANDLERS

async function handleTransactionClick(transaction) {
    try {
        await displayTransactionDetails(transaction);
    } catch (error) {
        console.error('Error handling transaction click:', error);
        showError('Failed to load transaction details.');
    }
}

// TRANSACTION DETAILS HANDLERS

async function displayTransactionDetails(transaction) {

    function onEditClick(transactionToEdit) {
        showEditForm(transactionToEdit, APP_CONTAINER_ID, onSubmitClick);
        loadBackButton();
    }
    

    function onBackClick() {
        initApp();
    }
    

    async function onSubmitClick(transactionId, updatedTransaction) {
        try {
            await patchToApi(TRANSACTIONS_ENDPOINT, transactionId, updatedTransaction);
            await initApp();
        } catch (error) {
            console.error('Error updating transaction:', error);
            showError('Failed to update transaction. Please try again.');
        }
    }

    async function onDeleteClick(transactionToDelete){
        try {
            await deleteFromApi(TRANSACTIONS_ENDPOINT, String(transactionToDelete.id));
            await initApp();
        } catch (error) {
            console.log('Error deleting transaction:', error);
            showError('Failed to delete transaction. Please try again.');
        }
    }

    showTransactionDetails(
        transaction, 
        APP_CONTAINER_ID, 
        onDeleteClick,
        onEditClick,
        onBackClick
    );
}

// APP INITIALIZATION

async function initApp() {
    try {
        await loadTransactions();
        loadAddButton();
    } catch (error) {
        console.error('Failed to initialize app:', error);
        showError('Failed to load transactions. Please refresh the page.');
    }
}

document.addEventListener('DOMContentLoaded', initApp);