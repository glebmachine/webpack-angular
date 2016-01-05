module.exports = (app) => {
  app.run(($state) => {
    // for hot module replacement
    if (module.hot) {
      window.$state = $state;
    }
  });
};
