import {CHART_COLORS, CHART_COLORS_TRANSPARENT, CHART_COLORS_COMPLEMENTARY} from '/javascripts/utils.js';


$(document).ready(() => {

  const options = {
    bottom: '64px', // default: '32px'
    right: 'unset', // default: '32px'
    left: '32px', // default: 'unset'
    time: '0.5s', // default: '0.3s'
    mixColor: '#fff', // default: '#fff'
    backgroundColor: '#d5d5d5',  // default: '#fff'
    buttonColorDark: '#212121',  // default: '#100f2c' 1A1A1A
    buttonColorLight: '#d5d5d5', // default: '#fff'
    saveInCookies: false, // default: true,
    label: '<i id="dark-mode-icon" class="fas fa-moon"></i>', // default: ''
    autoMatchOsTheme: true // default: true
  }

  const darkmode = new Darkmode(options);
  darkmode.showWidget();

  // Change dark mode toggle button icon moon/sun
  $( ":button.darkmode-toggle" ).click(function() {
    console.log("Handler for .click() called") // will return true

    if(darkmode.isActivated()) {
      $("#dark-mode-icon").removeClass("fa-moon");
      $("#dark-mode-icon").addClass("fa-sun");
      $("#dark-mode-icon").css("color", "#2A2A2A");

      document.myChart.data.datasets[0].borderColor = CHART_COLORS_TRANSPARENT.grey;
      document.myChart.data.datasets[2].borderColor = CHART_COLORS_COMPLEMENTARY.purple;
      document.myChart.data.datasets[2].backgroundColor = CHART_COLORS_COMPLEMENTARY.purple;
      document.myChart.data.datasets[3].borderColor = CHART_COLORS_COMPLEMENTARY.indigo;
      document.myChart.data.datasets[3].backgroundColor = CHART_COLORS_COMPLEMENTARY.indigo;
      document.myChart.data.datasets[4].borderColor = CHART_COLORS_COMPLEMENTARY.blue;
      document.myChart.data.datasets[4].backgroundColor = CHART_COLORS_COMPLEMENTARY.blue;
      document.myChart.data.datasets[5].borderColor = CHART_COLORS_COMPLEMENTARY.green;
      document.myChart.data.datasets[5].backgroundColor = CHART_COLORS_COMPLEMENTARY.green;
      document.myChart.data.datasets[6].borderColor = CHART_COLORS_COMPLEMENTARY.yellow;
      document.myChart.data.datasets[6].backgroundColor = CHART_COLORS_COMPLEMENTARY.yellow;
      document.myChart.data.datasets[7].borderColor = CHART_COLORS_COMPLEMENTARY.orange;
      document.myChart.data.datasets[7].backgroundColor = CHART_COLORS_COMPLEMENTARY.orange;
      document.myChart.data.datasets[8].borderColor = CHART_COLORS_COMPLEMENTARY.red;
      document.myChart.data.datasets[8].backgroundColor = CHART_COLORS_COMPLEMENTARY.red;
    } else {
      $("#dark-mode-icon").css("color", "#fff");
      $("#dark-mode-icon").removeClass("fa-sun");
      $("#dark-mode-icon").addClass("fa-moon");
      document.myChart.data.datasets[0].borderColor = CHART_COLORS.white;
      document.myChart.data.datasets[2].borderColor = CHART_COLORS.purple;
      document.myChart.data.datasets[2].backgroundColor = CHART_COLORS_TRANSPARENT.purple;
      document.myChart.data.datasets[3].borderColor = CHART_COLORS.indigo;
      document.myChart.data.datasets[3].backgroundColor = CHART_COLORS_TRANSPARENT.indigo;
      document.myChart.data.datasets[4].borderColor = CHART_COLORS.blue;
      document.myChart.data.datasets[4].backgroundColor = CHART_COLORS_TRANSPARENT.blue;
      document.myChart.data.datasets[5].borderColor = CHART_COLORS.green;
      document.myChart.data.datasets[5].backgroundColor = CHART_COLORS_TRANSPARENT.green;
      document.myChart.data.datasets[6].borderColor = CHART_COLORS.yellow;
      document.myChart.data.datasets[6].backgroundColor = CHART_COLORS_TRANSPARENT.yellow;
      document.myChart.data.datasets[7].borderColor = CHART_COLORS.orange;
      document.myChart.data.datasets[7].backgroundColor = CHART_COLORS_TRANSPARENT.orange;
      document.myChart.data.datasets[8].borderColor = CHART_COLORS.red;
      document.myChart.data.datasets[8].backgroundColor = CHART_COLORS_TRANSPARENT.red;
    }
    document.myChart.update()
  });
});
