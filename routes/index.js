const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');

// Setup MongoDB
const MongoClient = mongodb.MongoClient;
const dbURL = "mongodb://localhost";

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Chart' });

});

router.get('/price-data', function(req, res, next) {

  MongoClient.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    else {
      const db = client.db('rainbow');
      const prices = db.collection('prices');

      prices.find().project({}).toArray( (err, docs) => {
        if (err) throw err;
        else { res.send(docs); }
        client.close();
      });
    }
  });
});

router.get('/price-data/rainbow7fields', function(req, res, next) {

  MongoClient.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    else {
      const db = client.db('rainbow');
      const prices = db.collection('rainbow_7_90');

      prices.find().project({}).toArray( (err, docs) => {
        if (err) throw err;
        else { res.send(docs); }
        client.close();
      });
    }
  });
});



module.exports = router;
