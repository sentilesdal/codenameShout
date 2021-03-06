var React = require('react');
var Navigation = require('./components/Navigation');
var ExploreContent = require('./components/ExploreContent');
var SearchContent = require('./components/SearchContent');
var LoginContent = require('./components/LoginContent');
var MapComponent = require('./components/MapComponent');
var MapStore = require('./stores/MapStore');
var MapConstants = require('./constants/MapConstants');
var PhotoEntry = require('./components/PhotoEntry');


var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Dashboard = React.createClass({
  getInitialState: function() {
    return {
      data: {}
    };
  },

  componentWillMount : function () {
    MapStore.addListener(MapConstants.GET_DATA, this.handleNewData)
  },

  componentWillUnmount : function () {
    MapStore.removeDaListener(MapConstants.GET_DATA, null);
  },

  handleNewData: function(data) {
    //set state so chart renders
    this.setState({
      data: data
    }, function(){
      console.log('set data state in dashboard: ', this.state.data);
    })
  },
  
  render: function () {
    if (this.state.data.photoId){
      return (
        <div className="viewPort">

          <Navigation className="nav-bar"items={ [
            {name:'Explore'},
            {name:'Search'}
          ] } />

          <div className="content">
            <div className="side-content">
              <RouteHandler />
            </div>
            <div className="middle">
              <div className="title-bar">
              Welcome to the Ripple Dashboard
              </div>
              <div className="Map">
                <MapComponent data={this.state.data} />
              </div>
              <div className="photo-info">
                <div className="photo-holder">
                  <PhotoEntry photoId={this.state.data.photoId}/>
                </div>
                <div className="stats">
                  Ripple Id: {this.state.data.photoId} <br/>
                  Broadcasts: {this.state.data.broadcasts} <br/>
                  Recipients: {this.state.data.recipients} <br/>
                </div>
              </div>
            </div>  
          </div>
          <div className="bottom-bar">
          </div>
        </div>
      );
    } else {
      return (
        <div className="viewPort">

          <Navigation className="nav-bar"items={ [
            {name:'Explore'},
            {name:'Search'},
          ] } />

          <div className="content">
            <div className="side-content">
              <RouteHandler />
            </div>
            <div className="middle">
              <div className="title-bar">
              Welcome to the Ripple Dashboard
              </div>
              <div className="Map">
                <MapComponent data={this.state.data} />
              </div>
              <div className="photo-info">
                <div className="photo-holder">
                  <PhotoEntry photoId={this.state.data.photoId}/>
                </div>
              </div>
            </div>  
          </div>
          <div className="bottom-bar">
          </div>
        </div>
      );
    }
  }
});

var routes = (
      <Route path="/" handler={Dashboard}>
        <Route name="Explore" handler={ExploreContent} />
        <Route name="Search" handler={SearchContent} />
        <DefaultRoute handler={ExploreContent} />
      </Route>
    );

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('dashboard'));
});




