from pydantic import BaseModel

class TasteFeatures(BaseModel):
    # 7 taste sensor readings
    sensor_1: float
    sensor_2: float
    sensor_3: float
    sensor_4: float
    sensor_5: float
    sensor_6: float
    sensor_7: float

    # 15 phytochemical values
    phytochem_1: float
    phytochem_2: float
    phytochem_3: float
    phytochem_4: float
    phytochem_5: float
    phytochem_6: float
    phytochem_7: float
    phytochem_8: float
    phytochem_9: float
    phytochem_10: float
    phytochem_11: float
    phytochem_12: float
    phytochem_13: float
    phytochem_14: float
    phytochem_15: float

    # Environmental features
    pH: float
    temperature: float
    TDS: float
