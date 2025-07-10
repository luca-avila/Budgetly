from datetime import date
from sqlalchemy import desc
from flask import Blueprint, request, jsonify
from backend.models import transactions, engine

transactions_bp = Blueprint('transactions', __name__)

# Helper function to build the transaction dictionary
def build_transaction_response(transaction):
    return {
        'id': transaction['id'],
        'type': transaction['type'],
        'amount': transaction['amount'],
        'category': transaction['category'],
        'description': transaction['description'],
        'date': transaction['date'].isoformat() if transaction['date'] else None
    }


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
    # Return error if amount is negative
    if r_amount < 0:
        return jsonify({'error': 'Amount must be a positive number'}), 400

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
    try:
        # Get all transactions
        with engine.begin() as conn:
            stmt = transactions.select().order_by(desc(transactions.c.date))  # ordena por fecha descendente
            result = conn.execute(stmt).fetchall()
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    # If no transactions found, return empty list
    if not result:
        return jsonify([]), 200

    # Add every transaction in dict format
    transaction_list = [build_transaction_response(transaction) for transaction in result]

    # Return transactions in json format
    return jsonify(transaction_list), 200

@transactions_bp.route('/transactions/<int:id>', methods=['GET'])
def get_transaction(id):
    try:
        # Get transaction by id
        with engine.begin() as conn:
            stmt = transactions.select().where(transactions.c.id == id)
            result = conn.execute(stmt).fetchone()
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    # If transaction not found, return error
    if result is None:
        return jsonify({'error': 'Transaction not found'}), 404

    # Return transaction in json format
    transaction = build_transaction_response(result)

    # Return transaction
    return jsonify(transaction), 200


@transactions_bp.route('/transactions/<int:id>', methods=['PATCH'])
def modify_transaction(id):
    # Get json
    data = request.json
    to_update = {}

    try:
        # Check if the transaction exists
        with engine.begin() as conn:
            stmt = transactions.select().where(transactions.c.id == id)
            result = conn.execute(stmt).fetchone()
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    # If transaction not found, return error
    if result is None:
        return jsonify({'error': 'Transaction not found'}), 404

    # Check what fields should be updated and save in to_update
    if 'amount' in data:
        to_update['amount'] = data['amount']
    # Check if amount is a number
        try:
            r_amount = float(data['amount'])
        except (ValueError, TypeError):
            return jsonify({'error': 'Amount must be a number'}), 400
    # Check if amount is negative
        if r_amount < 0:
            return jsonify({'error': 'Amount must be a positive number'}), 400
        to_update['amount'] = r_amount

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
    
    try:
        # Update the transaction in the database
        with engine.begin() as conn:
            update_statement = transactions.update().where(transactions.c.id == id).values(**to_update)
            result = conn.execute(update_statement)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    # If no rows were updated, return error
    if result.rowcount == 0:
        return jsonify({'error': 'Transaction not found'}), 404
    
    # Return success message
    return jsonify({'message': 'Transaction updated successfully'}), 200

@transactions_bp.route('/transactions/<int:id>', methods=['DELETE'])
def delete_transaction(id):
    try:
        # Delete the transaction from the database
        with engine.begin() as conn:
            delete_statement = transactions.delete().where(transactions.c.id == id)
            result = conn.execute(delete_statement)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    # If no rows were deleted, return error
    if result.rowcount == 0:
        return jsonify({'error': 'Transaction not found'}), 404
    
    # Return success message
    return jsonify({'message': 'Transaction deleted successfully'}), 200