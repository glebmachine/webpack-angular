const Q = require('q');

module.exports = (app) => {
  app.config(function ($stateProvider, $locationProvider, $urlRouterProvider, $controllerProvider) {
    'ngInject';

    $locationProvider.hashPrefix('!');
    $urlRouterProvider.otherwise('/index');

    // allow to rewrite controllers in runtime
    app._controller = app.controller;
    app.controller = function (name, constructor){
      $controllerProvider.register(name, constructor);
      return (this);
    };

    require('./index')(app, 'index', $stateProvider, Q);


    $stateProvider.state('about', {
      url: '/about',
      templateProvider: () => {
        let deferred = Q.defer();
        require.ensure([], () => {
          deferred.resolve(require('./about/about.jade'));
        });
        return deferred.promise;
      },
      controller: require('./about/about.js'),
    });
  });
};