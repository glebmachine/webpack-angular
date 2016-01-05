module.exports = (app, name, $stateProvider, Q) => {


  $stateProvider.state(name, {
    url: `/${name}`,

    templateProvider: () => {
      let deferred = Q.defer();
      require.ensure([], () => {
        deferred.resolve(require('./index.jade'));
      });
      return deferred.promise;
    },

    controller:`${name.charAt(0).toUpperCase() + name.slice(1)}Controller`,
    resolve: {
      foo: () => {
        let deferred = Q.defer();
        require.ensure([], function() {
          app.controller(`${name.charAt(0).toUpperCase() + name.slice(1)}Controller`, require('./controller.js'));
          deferred.resolve(module);
        });

        return deferred.promise;
      },
    },
  });

  if (module.hot) {
    // hot module replacement этому господину
    module.hot.accept(['./controller.js', './index.jade'], () => {
      app.controller(`${name.charAt(0).toUpperCase() + name.slice(1)}Controller`, require('./controller.js'));
      window.$state.transitionTo(window.$state.current, window.$state.params, {
        reload: true,
        inherit: false,
        notify: true,
      });
    });
  }
};
