import os
SECRET_KEY = os.environ.get('ObjectiveDeckSecretKey')
SQLALCHEMY_DATABASE_URI = "postgresql://postgres:goforit@localhost/objectiveDeckDatabase_dev"