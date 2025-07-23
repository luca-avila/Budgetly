# 💸 Budgetly

**Budgetly** is a minimal full-stack personal finance tracker with a web interface. It lets you log income and expenses, track spending visually, and view summaries — all from the browser.

> ⚠️ This is a practice project built to sharpen my skills in full-stack development. It’s not a production app, but a clean showcase of functionality and structure.

📽️ [Ver demo en YouTube](https://youtu.be/jbmCdf7egbI?si=mSjs2pYSpknHaMNh)
---

## 🚀 Features

- Add transactions (income or expense)
- Categorize each transaction
- Automatic date tracking
- View recent transactions
- Summary dashboard (totals, balance)
- Spending visualization (basic charts)
- Responsive UI with Bootstrap
- Interactive behavior with vanilla JavaScript

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
│   ├── app/
│   │    ├── __init__.py
│   │    ├── routes/
│   │    │   └── transactions.py
│   │    ├── models/
│   │    │   └── models.py
│   │    └── config.py
│   └── database.py
│  
├── frontend/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── api.js
│   │   ├── main.js
│   │   └── ui.js
│   └── index.html
├── run.py
├── README.md
└── requirements.txt

```

---

## ▶️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/luca-avila/Budgetly.git
cd Budgetly
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
python run.py
cd frontend
python3 -m http.server 8000
```

### 5. Open your browser

Go to:
```
http://127.0.0.1:8000
```

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Author

Made with 💻 and ☕ by **Luca 🇦🇷**
