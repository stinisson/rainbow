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

    csv_data_ = gzip.GzipFile(fileobj=compressed_data).read().decode('utf-8')

    #with open("cache/bitstampusd.pickle", 'wb') as file:
    #    pickle.dump(csv_data_, file, protocol=pickle.HIGHEST_PROTOCOL)

    return csv_data_

    #with open("cache/bitstampusd.pickle", 'rb') as file:
    #    return pickle.load(file)


bitcoin_inception = string_to_datetime("2009-01-09 00:00:00.0")


def rainbow_regression_f(x, prices, timestamps):
    y = []
    for timestamp in timestamps:
        price = 10 ** (x[0] * math.log((timestamp - bitcoin_inception).days) + x[1])
        y.append(price)
    return np.log(prices) - np.log(y)


def rainbow_regression(timestamps, prices):
    # days_since_inception = (first_timestamp - bitcoin_inception).days
    prices = (np.array(prices))
    x0 = np.ones(2)
    result = leastsq(func=rainbow_regression_f, x0=x0, args=(prices, timestamps))
    # print(result)
    return result[0]


def rainbow_generate(timestamps, params):
    days_since_inception = (timestamps[0] - bitcoin_inception).days
    prices = []
    for timestamp in timestamps:
        price = 10 ** (params[0] * math.log((timestamp - bitcoin_inception).days) + params[1])
        prices.append(price)
    return np.array(prices)


def make_rainbow(rainbow_n=7):
    timestamps_extended = []
    timestamp = string_to_datetime("2011-01-01 00:00:00.0")
    while timestamp < string_to_datetime("2024-06-01 00:00:00.0"):
        timestamps_extended.append(timestamp)
        timestamp += timedelta(days=1)

    timestamps_top = [string_to_datetime("2011-06-08 00:00:00.0"),
                      string_to_datetime("2013-11-30 00:00:00.0"),
                      string_to_datetime("2017-12-17 00:00:00.0")]
    prices_top = [32.0, 1150.0, 19500.0]
    rainbow_top_params = rainbow_regression(timestamps_top, prices_top)
    rainbow_top = rainbow_generate(timestamps_extended, rainbow_top_params)

    timestamps_bot = [string_to_datetime("2012-10-27 00:00:00.0"),
                      string_to_datetime("2016-05-22 00:00:00.0"),
                      string_to_datetime("2017-03-25 00:00:00.0"),
                      string_to_datetime("2020-10-08 00:00:00.0")]
    prices_bot = [9.5, 438.0, 900.0, 10557.0]
    regr_bot_params = rainbow_regression(timestamps_bot, prices_bot)
    rainbow_bot = rainbow_generate(timestamps_extended, regr_bot_params)

    #with open(f"cache/rainbow_params.pickle", 'wb') as f:
    #    pickle.dump((rainbow_top_params, regr_bot_params), f, pickle.HIGHEST_PROTOCOL)

    print("Tops")
    for timestamp_find in timestamps_top:
        for timestamp, price in zip(timestamps_extended, rainbow_top):
            if timestamp > timestamp_find:
                print(" ", timestamp, price)
                break

    print("Bots")
    for timestamp_find in timestamps_bot:
        for timestamp, price in zip(timestamps_extended, rainbow_bot):
            if timestamp > timestamp_find:
                print(" ", timestamp, price)
                break

    log_top, log_bot = np.log(rainbow_top), np.log(rainbow_bot)
    log_diff = (log_top - log_bot) / (rainbow_n - 2)
    log_bot = log_bot - log_diff
    log_diffs = np.arange(rainbow_n + 1)[..., np.newaxis] * log_diff
    rainbows = np.exp(log_diffs + log_bot)
    rainbows = rainbows * 0.9  # Lower the rainbow a bit

    with open(f"C:/slask/rainbow_{rainbow_n}.csv", 'w+', newline='') as f:
        csv_writer = csv.writer(f)
        csv_writer.writerow(["timestamp"] + [f"y{x}" for x in range(rainbow_n)])

        for idx in range(rainbows.shape[1]):
            row = [int(timestamps_extended[idx].timestamp())]
            row.extend(rainbows[:, idx])
            csv_writer.writerow(row)


if __name__ == '__main__':
    make_rainbow(rainbow_n=7)
    #make_rainbow(rainbow_n=9)

    """
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
    """
