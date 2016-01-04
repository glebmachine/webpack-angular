
module.exports = (app) => {
  app.run(function($state){

    // for hot module replacement
    if (module.hot) {
      window.$state = $state;
    }
    
  });
};