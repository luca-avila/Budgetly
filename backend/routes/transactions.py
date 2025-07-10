from flask import Blueprint, request, jsonify
from backend.models import transactions, engine
from datetime import date
from sqlalchemy import desc

transactions_bp = Blueprint('transactions', __name__)

@transactions_bp.route('/transactions', methods=['POST'])
def add_transaction():
    # Get json
    data = request.json

    # Return error if not all required fields are received
    required_fields = ['type', 'amount', 'category']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing field: {field}'}), 400

    # Return error if amount is not a number
    try:
        r_amount = float(data['amount'])
    except (ValueError, TypeError):
        return jsonify({'error': 'Amount must be a number'}), 400

    # Return error if wrong transaction type is sended
    if data['type'] not in ['Buy', 'Income']:
        return jsonify({'error': 'Transaction type should be Buy or Income'}), 400

    # Add to the database
    with engine.begin() as conn:
        insert_statement = transactions.insert().values(
            type = data['type'], 
            amount = r_amount,
            category = data['category'], 
            description = data.get('description', ''),
            date = date.today()
        )
        conn.execute(insert_statement)

    # Return success message
    return jsonify({'message': 'Transaction added successfully'}), 201

@transactions_bp.route('/transactions', methods=['GET'])
def get_transactions():
    # Get all transactions
    with engine.begin() as conn:
        stmt = transactions.select().order_by(desc(transactions.c.date))  # ordena por fecha descendente
        result = conn.execute(stmt).fetchall()
    
    # Add every transaction in dict format
    transaction_list = [
            {
                'id': t['id'],
                'type': t['type'],
                'amount': t['amount'],
                'category': t['category'],
                'description': t['description'],
                'date': t['date'].isoformat() if t['date'] else None
            }
            for t in result
        ]
    # Return transactions in json format
    return jsonify(transaction_list), 200

@transactions_bp.route('/transactions/<int:id>', methods=['PATCH'])
def modify_transaction(id):
    # Get json
    data = request.json
    to_update = {}

    # Check what fields should be updated and save in to_update
    if 'amount' in data:
        to_update['amount'] = data['amount']
    
    if 'category' in data:
        to_update['category'] = data['category']

    if 'description' in data:
        to_update['description'] = data['description']
    
    if 'type' in data:
        if data['type'] not in ['Buy', 'Income']:
            return jsonify({'error': 'Transaction type should be Buy or Income'}), 400
        to_update['type'] = data['type']
    
    # If no fields to update, return error
    if not to_update:
        return jsonify({'error': 'No fields to update'}), 400
    
    # Update the transaction in the database
    with engine.begin() as conn:
        update_statement = transactions.update().where(transactions.c.id == id).values(**to_update)
        result = conn.execute(update_statement)

    # If no rows were updated, return error
    if result.rowcount == 0:
        return jsonify({'error': 'Transaction not found'}), 404
    
    # Return success message
    return jsonify({'message': 'Transaction updated successfully'}), 200
