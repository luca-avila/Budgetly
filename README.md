# 💸 Budgetly

**Budgetly** is a minimal personal finance tracker that helps you log income and expenses, visualize spending categories, and stay focused on your financial goals.

---

## 🚀 Features

- Add transactions (income or expense)
- Categorize each transaction
- Automatic date tracking
- View recent transactions
- Simple dashboard with summaries
- Visualize spending with charts
- Light interactivity via JavaScript

---

## 🛠️ Built With

- **Python**
- **Flask** (web framework)
- **SQLAlchemy Core** (database)
- **SQLite** (local storage)
- **HTML + CSS + Bootstrap + JavaScript** (basic frontend)

---

## 🧱 Project Structure

```
budgetly/
├── backend/
│   ├── app.py              # Main Flask app
│   ├── models.py           # SQLAlchemy table definitions
│   ├── config.py           # Config settings
│   ├── database.db         # SQLite database
│   ├── requirements.txt    # Python dependencies
│   ├── routes/
│   │   └── transactions.py # Blueprint or route handlers
│   ├── templates/
│   │   └── index.html      # Main HTML template
│   └── static/
│       ├── style.css
│       ├── main.js
│       ├── charts.js
│       └── filters.js
├── README.md
```

---

## ▶️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/budgetly.git
cd budgetly/backend
```

### 2. (Optional) Create and activate a virtual environment

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the app

```bash
python app.py
```

### 5. Open your browser

Go to:
```
http://127.0.0.1:5000
```

---

## 📦 Dependencies

Listed in `requirements.txt`. Core dependencies:

- Flask
- SQLAlchemy

To generate/update the list:
```bash
pip freeze > requirements.txt
```

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Author

Made with 💻 and ☕ by **Luca 🇦🇷**
