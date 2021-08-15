import * as Utils from '/javascripts/utils.js';

$(document).ready(() => {

  const ctx = document.getElementById('myChart').getContext('2d');

  const data = {


    //labels: ["1629058062", "1629058122", "1629058182", "1629058242", "1629058302", "1629058362", "1629058422"],
    datasets: [
      {
        label: 'Hoodl',
        fill: true,
        backgroundColor: Utils.CHART_COLORS.green,
        borderColor: Utils.CHART_COLORS.green,
        data: [{x:'2016-12-25', y:5}, {x:'2016-12-26', y:5}, {x:'2016-12-27', y:5}, {x:'2016-12-28', y:5}]
      },
      {
        label: 'Ground truth',
        fill: true,
        backgroundColor: Utils.CHART_COLORS.yellow,
        borderColor: Utils.CHART_COLORS.yellow,
        data: [{x:'2016-12-25', y:10}, {x:'2016-12-26', y:10}, {x:'2016-12-27', y:10}, {x:'2016-12-28', y:10}],
      },
      {
        label: 'FOMO',
        fill: true,
        backgroundColor: Utils.CHART_COLORS.red,
        borderColor: Utils.CHART_COLORS.red,
        data: [{x:'2016-12-25', y:15}, {x:'2016-12-26', y:15}, {x:'2016-12-27', y:15}, {x:'2016-12-28', y:15}],
      }
    ]
  };


  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Rainbow chart'
        },
      },
      interaction: {
        mode: 'index',
        intersect: false
      },
      scales: {
        x: {
          //type: 'time', //this kills the app
          time: {
            unit: 'month'
          },
          display: true,
          title: {
            display: true,
            text: 'Month'
          }
        },
        y: {
          display: true,
          min: -5,
          max: 20,
          title: {
            display: true,
            text: 'USD/mBTC'
          }
        }
      }
    },
  };

  const myChart = new Chart(ctx, config);

  const endpoint = "/price-data";
  $.getJSON(endpoint, {})
    .done((prices) => {
      prices.forEach((price) => {
        console.log("timestamp: ", price.timestamp);
        console.log("price: ", price.price);
      });


    })
    .fail((error) => {
      console.log(error);
  });


});


