from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, Float, Date, func
from config import Config

# Create engine and metadata
engine = create_engine(Config.DATABASE_URL, echo=True)
meta = MetaData()

# Define transactions table
transactions = Table(
    'transactions',
    meta,
    Column('id', Integer, primary_key=True),
    Column('type', String, nullable=False),
    Column('amount', Float, nullable=False),
    Column('category', String, nullable=False),
    Column('description', String),
    Column('date', Date, server_default=func.current_date())
)

# Create transactions table
meta.create_all(engine)