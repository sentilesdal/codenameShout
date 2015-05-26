describe('Inbox Controller', function(){
    var scope, state, rootScope, InboxFactory, AlbumFactory, CameraFactoryMock, createController;

    // load the controller's module
    beforeEach(module('ui.router'));
    beforeEach(module('shout.inbox'));

    beforeEach(inject(function($injector) {
        CameraFactoryMock = jasmine.createSpyObj('CameraFactory', ['data', 'obj', 'takePicture', 'query']);
        rootScope = $injector.get('$rootScope');
        scope = rootScope.$new();
        state = $injector.get('$state');
        InboxFactory = $injector.get('InboxFactory');
        AlbumFactory = $injector.get('AlbumFactory');
        var $controller = $injector.get('$controller');

        spyOn(state, 'go');

        createController = function() {
            return $controller('InboxCtrl as vm', {
                $scope: scope, 
                $state: state,
                InboxFactory: InboxFactory,
                AlbumFactory: AlbumFactory,
                CameraFactory: CameraFactoryMock
            });
        }

        createController(); 
    }))

    // tests start here
    it('should have an array of photos', function(){
        expect(scope.vm.photos).toEqual(jasmine.any(Array));
    });

});

