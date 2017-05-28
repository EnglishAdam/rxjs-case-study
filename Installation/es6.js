/**
 * Installation
 * - npm install rxjs -save
 */

// ES6
// Import all Functionality
import Rx from 'rxjs/Rx';

Rx.Observable.of(1,2,3)


// Import part Functionality
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

Observable.of(1,2,3).map(x => x + '!!!');

// With ES7 binding syntax
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operator/map';

Observable::of(1,2,3)::map(x => x + '!!!');