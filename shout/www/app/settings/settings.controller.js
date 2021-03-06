angular
  .module('shout.settings')
  .controller('SettingsCtrl', SettingsCtrl);

SettingsCtrl.$inject = ['$http', '$state', '$timeout', '$ionicHistory', 'ionicMaterialInk', 'SettingsFactory', '$localstorage', 'CameraFactory', 'LocationFactory', 's3', 'API_HOST', 'User'];

function SettingsCtrl($http, $state, $timeout, $ionicHistory, ionicMaterialInk, SettingsFactory, $localstorage, CameraFactory, LocationFactory, s3, API_HOST, User) {
  console.log('SettingsCtrl');

  var vm = this;

  vm.settings = User.settings();
  vm.toggleEnable = toggleEnable;
  //vm.setTrickle = setTrickle;
  vm.saveSettings = saveSettings;
  vm.logOut = logOut;
  vm.takePhoto = CameraFactory.takePicture;

  function saveSettings() {
    console.log(vm.settings);
    User.settings(vm.settings);
  }

  function toggleEnable() {
    User.settings('enabled', vm.settings.enabled);
    SettingsFactory.setWatch(vm.settings.enabled);
  }

  // function setTrickle() {
  //   User.settings(vm.settings.trickle);
  // }

  function logOut() {
    User.isSignedIn(false);
    $timeout(function() {
      $state.go('login');
    },500);
  }

}
