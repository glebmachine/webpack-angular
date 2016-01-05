import './menu.sass';

module.exports = function(app) {

  app.directive('menu', () => {

    return {
      restrict: 'E',
      scope: {},
      template: require('./menu.jade'),
      controller: () => {
        'ngInject';
      },
    };
  });
};
