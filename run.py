from flask import Flask
from backend.app.routes.transactions import transactions_bp
from backend.app.config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    
    app.register_blueprint(transactions_bp)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
