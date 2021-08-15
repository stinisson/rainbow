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
    } else {
      $("#dark-mode-icon").css("color", "#fff");
      $("#dark-mode-icon").removeClass("fa-sun");
      $("#dark-mode-icon").addClass("fa-moon");
    }
  });

});
