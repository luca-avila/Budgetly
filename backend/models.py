from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, Float, ForeignKey, Date
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
    Column('date', Date)
)

# Create transactions table
meta.create_all(engine)