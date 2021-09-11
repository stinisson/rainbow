import pandas as pd
from pymongo import MongoClient
import json

def mongoimport(csv_path, db_name, coll_name, db_url='localhost', db_port=27017):
    """ Imports a csv file at path csv_name to a mongo colection
    returns: count of the documants in the new collection
    """
    client = MongoClient(db_url, db_port)
    db = client[db_name]
    coll = db[coll_name]
    data = pd.read_csv(csv_path)
    print(data)
    payload = json.loads(data.to_json(orient='records'))
    coll.remove()
    coll.insert(payload)
    return coll.count()


mongoimport("rainbow_7.csv", "rainbow", "rainbow_7")
#mongoimport("stin_prices.csv", "rainbow", "prices")

