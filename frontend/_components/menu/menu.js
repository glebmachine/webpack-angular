
module.exports = function(app){

  app.directive('menu', function(){
    require('./menu.sass');

    return {
      restrict : 'E',
      scope : {},
      template : require('./menu.jade'),
      controller : function(){
        "ngInject";
      }
    };
  });
};
