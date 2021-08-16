import * as Utils from '/javascripts/utils.js';

$(document).ready(() => {

  // Get price data from db
  const priceData = []
  const endpoint = "/price-data";
  $.getJSON(endpoint, {})

    .done((prices) => {
      prices.forEach((price) => {
        if (price.timestamp && price.price) {

          const date = new Date(price.timestamp*1000);
          //console.log("date");
          //console.log(date);

          priceData.push( {"x": price.timestamp*1000, "y": price.price} );
        }
        console.log(typeof price.timestamp)
      });
      const myChart = new Chart(ctx, config);

    })
    .fail((error) => {
      console.log(error);
    });

  console.log("Price data");
  console.log(priceData)

  // Create line chart

  const ctx = document.getElementById('myChart').getContext('2d');

  const config = {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        //data: [{x:'2016-12-25 01:00:00', y:12}, {x:'2016-12-26 02:00:00', y:15}, {x:'2016-12-27 03:00:00', y:13}, {x:'2016-12-28 04:00:00', y:14}],
        //data: [{x:1628931514001, y:12}, {x:1629104314000, y:15}, {x:1629244800000, y:13}, {x:1629417600000, y:14}],
        data: priceData,
        label: "Price",
        borderColor: "#3e95cd",
        fill: false
      }]
    },
    options: {
      scales: {
        xAxes: [{
          type: 'time',
          distribution: 'linear',

          time: {
          //parser: 'YYYY-MM-DD',
            unit: 'month',
            displayFormats: {
              'month': 'YYYY-DD-MM HH:mm:ss'
            }
          }
        }],
        title: {
          display: false,
        }
      }
    }
  };
  //new Chart(ctx, config);

  /*

  const date1 = new Date(1618358400000);
  const date2 = new Date(1618531200000);
  const date3 = new Date(1629244800000);
  const date4 = new Date(1629417600000);

  const priceData3 = [{"a":1618358400000, "b":11}, {"a":1618531200000, "b":15}, {"a":1629244800000, "b":13}, {"a":1629417600000, "b":14}]
*/

  /*
  const priceData2 = [{x: date1, y: 50.69},{x: date2, y: 63247.24}]
  const data = {
    datasets: [
      {
        label: 'Ground truth',
        fill: true,
        backgroundColor: Utils.CHART_COLORS.green,
        borderColor: Utils.CHART_COLORS.green,
        data: priceData3
      }
    ]
  };
  */



  /*const data = {
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
*/
/*
  const config = {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        data: [{x:'2016-12-25 01:00:00', y:12}, {x:'2016-12-26 02:00:00', y:15}, {x:'2016-12-27 03:00:00', y:13}, {x:'2016-12-28 04:00:00', y:14}],
        label: 'price',
        borderColor: "#3e95cd",
        fill: false
        //data: [{x:date1.toString(), y:12}, {x:date2.toString(), y:15}, {x:date3.toString(), y:13}, {x:date4.toString(), y:14}]
        //parsing: {
        //  xAxisKey: 'x',
        //  yAxisKey: 'y'
        //}
      }]
    },
    options: {
      scales: {
        xAxes: [{
          //axis: 'x',
          type: 'time',
          distribution: 'linear'
          //ticks: {
          //  source: "data"
          //},
          //time: {
            //parser: 'YYYY-MM-DD',
            //unit: 'minute',
            //displayFormats: {
            //  'minute': 'DD-MM HH:mm'
            //}
          //}
        }],
        title: {
          display: false
        }
      }
    }
  }

*/
/*
  const config2 = {
    type: 'line',
    data: {
      //labels: [1, 2, 3, 4],
      datasets: [{
        //type: 'time',
        //label: 'my time',
        data: priceData3,
        parsing: {
          xAxisKey: 'x',
          yAxisKey: 'y'
        }
      }]
    },
    options: {
      //responsive: true,
      //plugins: {
      //  title: {
      //    display: true,
     //     text: 'Rainbow chart'
      //  },
      //},
      //interaction: {
      //  mode: 'index',
     //   intersect: false
      //},
      scales: {
        xTime: {
          'axis': 'x'
        }

        xAxes: [{
          //type: 'time', //this kills the app
          time: {
            //unit: 'day'
          },
          ticks: {
            //source: 'data'
          },
          display: true,
          title: {
            display: true,
            //text: 'Day'
          },
          parsing: false
        }],

        y: {
          display: true,
          min: -5,
          title: {
            display: true,
            text: 'USD/mBTC'
          }
        }

      }
    },
  };
  */
  //const myChart = new Chart(ctx, config);



});

