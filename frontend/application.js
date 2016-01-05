import angular from 'angular';
import uirouter from 'ui-router';

// exports jqLite as $/jQuery
if (window) {
  window.jQuery = window.$ = angular.element;
}

var app = angular.module('app', [uirouter]);

require('./application.run.js')(app);
require('./application.config.js')(app);
require('./_components/menu/menu.js')(app);
