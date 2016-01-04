module.exports = (app, name, $stateProvider, Q) => {
  
  $stateProvider.state(name, {
    url: '/'+name,

    templateProvider: () => {
      let deferred = Q.defer();
      require.ensure([], () => {
        deferred.resolve(require('./index.jade'));
      });
      return deferred.promise;
    },

    controller:'IndexController',
    resolve: {
      foo: () => {
        let deferred = Q.defer();
        require.ensure([], function () {
          app.controller('IndexController', require('./controller.js'));
          deferred.resolve(module);
        });
        return deferred.promise;
      }
    }
  });

  if (module.hot) {
    module.hot.accept(['./controller.js', './index.jade'], function(){
      app.controller('IndexController', require('./controller.js'));
      window.$state.transitionTo(window.$state.current, window.$state.params, {
        reload: true,
        inherit: false,
        notify: true
      });
    });
  }
};