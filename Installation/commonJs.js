// CommonJS
// Installation
// npm install rxjs --save 

// Import all Functionality
var Rx = require('rxjs/Rx');
Rx.Observable.of(1,2,3);

// Import part Functionality
var Observable = require('rxjs/Observable').Observable;
// patch Observable with appropriate methods
require('rxjs/add/observable/of');
require('rxjs/add/operator/map');
Observable.of(1,2,3).map(function (x) { return x + '!!!'; });

// Importing part to use manually, or for own module export
var of = require('rxjs/observable/of').of;
var map = require('rxjs/operator/map').map;
map.call(of(1,2,3), function (x) { return x + '!!!'; });