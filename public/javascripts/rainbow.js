import {CHART_COLORS, CHART_COLORS_TRANSPARENT} from '/javascripts/utils.js';


function getCurrentPrice() {
  const endpoint = "/last-price";
  $.getJSON(endpoint, {})
    .done((priceData) => {

      $("#current-price").text(Number(priceData.lastPrice/1000).toPrecision(4));
      //console.log("Updating current price to: ", Number(priceData.lastPrice/1000).toPrecision(4))

    })
    .fail((xhr) => {
      alert('Problem contacting server');
      console.log(xhr);
    });
}


function downloadPrice() {
  return new Promise((resolve, reject) => {
    const endpoint = "/price-data";
    $.getJSON(endpoint, {})
      .done((prices) => {

        const priceData = []
        prices.forEach((price) => {
          if (price.timestamp && price.price) {
            const date = new Date(price.timestamp*1000);
            priceData.push( {"x": price.timestamp*1000, "y":  Number.parseFloat(price.price).toPrecision(4)} );
          }
        });
        resolve(priceData);

      })
      .fail((error) => {
        console.log(error);
        reject();
      });
  });
}

function downloadRainbow() {
  return new Promise((resolve, reject) => {
    $.getJSON("/price-data/rainbow7fields", {})
      .done((points) => {
        const rainbowDatas = [];
        for (let idx = 0; idx < 8; idx++) {
          rainbowDatas.push([]);
        }
        let dayCount = 0;
        points.forEach((point) => {
          if (dayCount === 0) {
            for (let idx = 0; idx < 8; idx++) {
              rainbowDatas[idx].push({x: point.timestamp * 1000, y: Number.parseFloat(point["y" + idx]).toPrecision(3)});
            }
          }
          dayCount = (dayCount + 1) % 7; // Only add every 7 days to limit number of data points
        });
        resolve(rainbowDatas);
      })
      .fail((error) => {
        console.log(error);
        reject();
      });
  });
}


$(document).ready(() => {

  getCurrentPrice();
  setInterval ( function() {getCurrentPrice();}, 5000 );


  // Line chart
  const ctx = document.getElementById('myChart').getContext('2d');


  let priceData;
  let rainbowData;

  downloadPrice().then((value) => {
    priceData = value;

    downloadRainbow().then((value) => {
      rainbowData = value;

      const config = {
        type: 'line',
        data: {
          labels: [],
          datasets: [
            {
              data: priceData,
              label: "Price",
              borderColor: CHART_COLORS.white,
              fill: false,
              borderWidth: 2
            },
            {
              data: rainbowData[0],
              borderColor: CHART_COLORS_TRANSPARENT.transparent,
              fill: false,
              borderWidth: 1
            },
            {
              data: rainbowData[1],
              label: "If you are given something, take it",
              borderColor: CHART_COLORS.purple,
              fill: 1,
              backgroundColor: CHART_COLORS_TRANSPARENT.purple,
              borderWidth: 1
            },
            {
              data: rainbowData[2],
              label: "What are you waiting for?",
              borderColor: CHART_COLORS.indigo,
              fill: 2,
              backgroundColor: CHART_COLORS_TRANSPARENT.indigo,
              borderWidth: 1
            },
            {
              data: rainbowData[3],
              label: "Ride slower, advance further",
              borderColor: CHART_COLORS.blue,
              fill: 3,
              backgroundColor: CHART_COLORS_TRANSPARENT.blue,
              borderWidth: 1
            },
            {
              data: rainbowData[4],
              label: "Calling all hodlers",
              borderColor: CHART_COLORS.green,
              fill: 4,
              backgroundColor: CHART_COLORS_TRANSPARENT.green,
              borderWidth: 1
            },
            {
              data: rainbowData[5],
              label: "Tension is rising",
              borderColor: CHART_COLORS.yellow,
              fill: 5,
              backgroundColor: CHART_COLORS_TRANSPARENT.yellow,
              borderWidth: 1
            },
            {
              data: rainbowData[6],
              label: "Sell of time",
              borderColor: CHART_COLORS.orange,
              fill: 6,
              backgroundColor: CHART_COLORS_TRANSPARENT.orange,
              borderWidth: 1
            },
            {
              data: rainbowData[7],
              label: "??????????!",
              borderColor: CHART_COLORS.red,
              fill: 7,
              backgroundColor: CHART_COLORS_TRANSPARENT.red,
              borderWidth: 1
            }
            ],
        },
        options: {
          legend: {
            labels: {
              filter: function(item, chart) {
                // Do not show a legend for the delimiting bottom layer of the rainbow (rainbowData[0])
                return item.datasetIndex !== 1;
              }
            }
          },
          title: {
            display: true,
            text: "BTC price chart",
            fontColor: "#212121",
            fontSize: 20
          },
          responsive: true,
          scales: {
            xAxes: [{
              type: 'time',
              time: {
                unit: 'quarter',
                displayFormats: {
                  'month': 'YYYY-DD-MM'
                }
              }
            }],
            yAxes: [{
              type: 'logarithmic',
              ticks: {
                callback: (val) => (parseFloat(val).toString()),
                padding: 5,
                autoSkip: true,
                autoSkipPadding: 15,
                min: 1
              },
              scaleLabel: {
                labelString: "USD/BTC",
                display: true,
                fontSize: 13
              }
            }]
          },
          elements: {
            point:{
              radius: 0
            }
          }
        }
      };

      document.myChart = new Chart(ctx, config);

    }, reason => {
      //console.log("rainbow data rejected!");
    });

  }, reason => {
    //console.log("price data rejected!");
  });

});
