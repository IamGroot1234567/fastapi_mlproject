import joblib
import pandas as pd
from app.cache.redis_cache import get_cashed_prediction, set_cashed_prediction
from app.core.config import settings

model = joblib.load(settings.MODEL_PATH)


def predict_car_price(data: dict):
    cache_key = ' '.join([str(val) for val in data.values()])
    cached = get_cashed_prediction(cache_key)
    if cached:
        return cached
    input_data = pd.DataFrame([data])
    prediction = model.predict(input_data)[0]
    set_cashed_prediction(cache_key, prediction)
    return prediction
