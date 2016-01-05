import Q from 'q';

module.exports = (app) => {
  app.config(($stateProvider, $locationProvider, $urlRouterProvider, $controllerProvider) => {
    'ngInject';

    $locationProvider.hashPrefix('!');
    $urlRouterProvider.otherwise('/index');

    if (module.hot) {
      // allow to rewrite controllers in runtime, whet HMR enabled
      app._controller = app.controller;
      app.controller = function(name, constructor) {
        $controllerProvider.register(name, constructor);
        return (this);
      };
    }

    require('./index')(app, 'index', $stateProvider, Q);
    require('./about')(app, 'about', $stateProvider, Q);
  });
};
