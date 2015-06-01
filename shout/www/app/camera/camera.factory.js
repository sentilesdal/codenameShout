angular
  .module('shout.camera')
  .factory('CameraFactory', CameraFactory);

CameraFactory.$inject = [];

function CameraFactory() {
  console.log('CameraFactory');

  var pictureSource;
  var destinationType; 
  var options;

  var services = {};
  services.takePicture = takePicture;
  services.getFile = getFile;
  services.filePath = '';

  return services;


  function takePicture(callback) {
    console.log('CameraFactory.takePicture');
    initialize(function() {
      getPicture(callback);
    });
  }

  function initialize(callback) {
    console.log('CameraFactory.initialize');
    ionic.Platform.ready(function() {
      if (!navigator.camera) {
        // error handling
        console.log('no camera found');
      } else {
        //pictureSource=navigator.camera.PictureSourceType.PHOTOLIBRARY;
        pictureSource = navigator.camera.PictureSourceType.CAMERA;
        destinationType = navigator.camera.DestinationType.FILE_URI;
        options = {
          quality: 50,
          destinationType: destinationType,
          sourceType: pictureSource,
          encodingType: Camera.EncodingType.JPEG 
        };
      }
      callback();
    });
  }

  function getPicture(callback) {
    console.log('CameraFactory.getPicture');
    navigator.camera.getPicture(success, failure, options);

    function success(imageURI) {
      console.log('getPicture success with:' + imageURI);
      services.filePath = imageURI;
      callback(imageURI);
    }

    function failure(message) {
      console.log('getPicture failed because: ' + message);
    }
  }

  function getFile(callback) {
    console.log('CameraFactory.getFile');
    window.resolveLocalFileSystemURL(services.filePath, success, failure);

    function success(fileEntry) {
      console.log('getFile success');

      fileEntry.file(function(file) {
        services.photo = file; 
        console.log('File Object', file);
        callback(file);
      });
    }

    function failure(message) {
        console.log('getFile failed because: ' + message);
    }
  }
}
