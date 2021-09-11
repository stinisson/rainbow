const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const CronJob = require('cron').CronJob;

// Setup MongoDB
const MongoClient = mongodb.MongoClient;
const dbURL = "mongodb://localhost";

let lastPrice = 0;
function saveLastPrice() {
  const priceDocument = {"price": lastPrice, "timestamp": parseInt(Date.now()/1000)}   ;

  MongoClient.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    else {
      const db = client.db('rainbow');
      db.collection("prices").insertOne(priceDocument, function(err, res) {
        if (err) throw err;
        console.log("Saved last price");
      })
    }
  });

}

const {BitstampStream, CURRENCY} = require("node-bitstamp");

/* STREAMS */
// @ https://www.bitstamp.net/websocket/v2/

// Live trades
const bitstampStream = new BitstampStream();


bitstampStream.on("connected", () => {
  const btcUsdTickerChannel = bitstampStream.subscribe(bitstampStream.CHANNEL_LIVE_TRADES, CURRENCY.BTC_USD);
  bitstampStream.on(btcUsdTickerChannel, ({ data, event }) => {
    console.log(data.price);
    lastPrice = data.price;

  });
});

bitstampStream.on("disconnected", () => {});


router.get('/',function(req, res, next) {
  res.json({"lastPrice": lastPrice});
});

module.exports = router;

// Save last price five seconds past midnight everyday
// cronTime, onTick, onComplete, start, timezone, context, runOnInit
const job = new CronJob('5 0 0 * * *', saveLastPrice, null, null, null, null, false);
job.start();
