from flask import Flask
from backend.routes.transactions import transactions_bp

app = Flask(__name__)

app.config.from_object('backend.config.Config')

app.register_blueprint(transactions_bp)

if __name__ == '__main__':
    app.run(debug=True)
