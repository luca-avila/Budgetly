from flask import Blueprint, request, jsonify
from backend.models import transactions, engine
from datetime import date

transactions_bp = Blueprint('transactions', __name__)

@transactions_bp.route('/transactions', methods=['POST'])
def add_transaction():
    data = request.json

    with engine.begin() as conn:
        insert_statement = transactions.insert().values(
            type = data['type'], 
            amount = data['amount'],
            category = data['category'], 
            description = data.get('description', ''),
            date = date.today()
        )
        conn.execute(insert_statement)
        
    return jsonify({'message': 'Transaction added succesfully'}), 201