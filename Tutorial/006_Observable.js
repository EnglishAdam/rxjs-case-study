/**
 * OBSERVABLE
 * Summary:
 *      - Lazy (Called when needed)
 *      - Push Data
 *      - Multiple (Push Multiple values)

 * 
 * They are:
 *      - In short:
 *              "Observables are like functions with zero arguments, but generalise those to allow multiple values."
 *              "Subscribing to an Observable is analogous to calling a Function."
 *              "Observables are able to deliver values either synchronously or asynchronously."
 *      - Like promises for mulitple values
 *      - They are synchronous in internally logic, but can return values asynchronously.
 *      - Like functions, if 'return' could be used multiple times.
 */

// ---------------------------------- Setup
var Rx = require('rxjs/Rx');



// ---------------------------------- Example 001
// ---------------------------------- Simple Example

// The following pushes 3 values immediately when subscribed to.
// A fourth value is the pushed after a timeout.

var observable = Rx.Observable.create(function (observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  setTimeout(() => {
    observer.next(4);
    observer.complete();
  }, 1000);
});

// Notes:
// Observable created with create() method, requires callback and passes an observer object.
// An Observer is an object/collection of callbacks named as 'next', 'error', 'complete'
// var observer = {next: ()=>{}, error: ()=>{}, complete: ()=>{}}
// They act like functions, if you could 'return' multiple times (observer.next() is similar to 'return')
//      These 'returns' are also asynchronous, as demonstrated above with the setTimeout.

// To invoke observale, subscribe to it

console.log('logs before subscribe');
observable.subscribe({
  next: x => console.log('got value ' + x),
  error: err => console.error('something wrong occurred: ' + err),
  complete: () => console.log('done'),
});
console.log('logs after subscribe');

// logs: logs before subscribe
// logs: got value 1
// logs: got value 2
// logs: got value 3
// logs: logs after subscribe
// logs: got value 4
// logs: done



// ---------------------------------- Example 002
// ---------------------------------- Multiple subscriptions

var foo = Rx.Observable.create(function (observer) {
  console.log('Hello');
  observer.next(42);
});

foo.subscribe(function (x) {
  console.log(x);
});
foo.subscribe(function (y) {
  console.log(y);
});

// logs: Hello
// logs: 42
// logs: Hello
// logs: 42

// Note:
// As functions are lazy, console.log('Hello') never called until subscription.
// Internal for Observable runs sync