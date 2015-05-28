angular
  .module('shout')
  .run(run);

run.$inject = ['$http', '$rootScope', '$location'];

function run($http, $rootScope, $location) {
  console.log('shout run');
  ionic.Platform.ready(function() {
    console.log('ionic platform ready');

    $rootScope.config = {awsConfig: {
      bucket: 'ripple-photos'}
    };
    //$http.get('/api/config').success(function(config) {
    //  $rootScope.config = config;
    //});

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
}
