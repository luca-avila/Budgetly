function validateUrl(url) {
    if (typeof url !== 'string' || !url.trim()) {
        throw new Error('Invalid URL provided');
    }
}

function validateTransaction(transaction) {
    if (!transaction || typeof transaction !== 'object') {
        throw new Error('Invalid transaction data provided');
    }
}

function validateId(id) {
    if (!id || typeof id !== 'string') {
        throw new Error('Invalid ID provided');
    }
}

async function handleJsonResponse(response){
    if (response.ok){
        return await response.json();
    }
    throw new Error(response.status);
}

async function getJson(url, id = undefined){
    const fullUrl = id ? `${url}/${id}` : url;

    const response = await fetch(fullUrl);
    return handleJsonResponse(response);
}

async function postJson(url, data) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return handleJsonResponse(response);
}

async function deleteJson(url, id){
    const response = await fetch(`${url}/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return handleJsonResponse(response);
}

async function patchJson(url, id, data) {
    const response = await fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return handleJsonResponse(response);
}

export async function getFromApi(url, id = undefined) {
    validateUrl(url);
    return await getJson(url, id);
}

export async function postToApi(url, transaction) {
    validateUrl(url);
    validateTransaction(transaction);
    return await postJson(url, transaction);
}

export async function deleteFromApi(url, id) {
    validateUrl(url);
    validateId(id);
    return await deleteJson(url, id);
}

export async function patchToApi(url, id, data) {
    validateUrl(url);
    validateId(id);
    validateTransaction(data);
    return await patchJson(url, id, data);
}