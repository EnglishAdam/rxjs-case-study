/**
 * Subscription
 * Summary:
 *      - Objsct returned from .subscribe()
 *      - Includes .unsubscrib() method if 'function unsubscribe(){}' returned from Observable creation.
 *      - Allows for mutiple unsubscription
 * 
 * They are:
 *      - In short:
 *              "A Subscription essentially just has an unsubscribe() function to release resources or cancel Observable executions."
 *      - An object representing disposable resouce
 *      - Has one important method, 'unsubscribe'.
 *      - Takes no argument.
 *      - Disposes the resource held by subscription.
 *      - Previously called 'dispose'.
 *      - Can collection unsubscriptions as one-time event.
 * 
 */

// ---------------------------------- Setup
var Rx = require('rxjs/Rx');


// ---------------------------------- Example 001
// ---------------------------------- Simple Example
let observable = Rx.Observable.interval(1000);
let subscription = observable.subscribe(x => console.log(x));
// Later:
// This cancels the ongoing Observable execution which
// was started by calling subscribe with an Observer.
subscription.unsubscribe();


// ---------------------------------- Example 002
// ---------------------------------- Combinding Unsubscribe

var observable1 = Rx.Observable.interval(400);
var observable2 = Rx.Observable.interval(300);

var mainSubscription = observable1.subscribe(x => console.log('first: ' + x));
var childSubscription = observable2.subscribe(x => console.log('second: ' + x));

mainSubscription.add(childSubscription);

setTimeout(() => {
  // Unsubscribes BOTH mainSubscription and childSubscription
  mainSubscription.unsubscribe();
}, 1000);

// log output: second: 0
// log output: first: 0
// log output: second: 1
// log output: first: 1
// log output: second: 2