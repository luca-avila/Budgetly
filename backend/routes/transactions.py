from flask import Blueprint, request, jsonify
from backend.models import transactions, engine
from datetime import date

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