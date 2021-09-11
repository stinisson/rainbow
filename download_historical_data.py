import csv
import gzip
import math
import pickle
import numpy as np
from io import BytesIO, StringIO
from scipy.optimize import leastsq
from datetime import datetime, timezone, timedelta


def string_to_timestamp(date, fmt='%Y-%m-%d %H:%M:%S.%f'):
    return datetime.timestamp(datetime.strptime(date, fmt))


def string_to_datetime(date, fmt='%Y-%m-%d %H:%M:%S.%f'):
    return datetime.fromtimestamp(string_to_timestamp(date, fmt), tz=timezone.utc)


def download_data():
    import urllib.request
    response = urllib.request.urlopen('http://api.bitcoincharts.com/v1/csv/bitstampUSD.csv.gz')
    compressed_data = BytesIO(response.read())

    csv_data = gzip.GzipFile(fileobj=compressed_data).read().decode('utf-8')
    return csv_data


if __name__ == '__main__':
    # Download all BitStamp data
    csv_data = download_data()
    last_day = string_to_datetime("2011-09-14 02:00:00.0")
    with open("stin_prices.csv", 'w', newline='') as f:
        csv_writer = csv.writer(f)
        csv_writer.writerow(["timestamp", "price"])
        timestamps, prices = [], []
        with StringIO(csv_data) as csv_file:
            for row in csv.reader(csv_file):
                timestamp = datetime.fromtimestamp(float(row[0]), tz=timezone.utc)
                if timestamp > last_day:
                    price = float(row[1])
                    csv_writer.writerow([int(last_day.timestamp()), price])
                    last_day += timedelta(days=1)
