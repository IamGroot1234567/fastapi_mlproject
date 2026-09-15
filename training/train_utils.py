import os

"""DATA_DIR = 'data'
DATA_FILE_NAME = 'car-details.csv'
DATA_FILE_PATH = os.path.join(DATA_DIR,DATA_FILE_NAME)


APP_DIR = 'app'
MODEL_DIR_NAME = 'models'
MODEL_NAME = 'model.joblib'
MODEL_DIR = os.path.join(APP_DIR,MODEL_DIR_NAME)
MODEL_PATH = os.path.join(MODEL_DIR,MODEL_NAME)"""

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

DATA_DIR = BASE_DIR / "data"
DATA_FILE_NAME = "car-details.csv"
DATA_FILE_PATH = DATA_DIR / DATA_FILE_NAME

APP_DIR = BASE_DIR / "app"
MODEL_DIR_NAME = "models"
MODEL_NAME = "model.joblib"
MODEL_DIR = APP_DIR / MODEL_DIR_NAME
MODEL_PATH = MODEL_DIR / MODEL_NAME

