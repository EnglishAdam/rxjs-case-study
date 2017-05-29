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
 *              "Observables can be created with create, but usually we use the so-called creation operators, like of, from, interval, etc."
 *              "Subscribing to an Observable is like calling a function, providing callbacks where the data will be delivered to"
 *              "In an Observable Execution, zero to infinite Next notifications may be delivered. If either an Error or Complete notification is delivered, then nothing else can be delivered afterwards."
 *              "When you subscribe, you get back a Subscription, which represents the ongoing execution. Just call unsubscribe() to cancel the execution."
 *      - Like promises for mulitple values
 *      - They are synchronous in internally logic, but can return values asynchronously.
 *      - Like functions, if 'return' could be used multiple times.
 * 
 * Anatomy:
 *      - created 
 *              -using Rx.Observable.create
 *              - OR using creation operator (of, from, interval etc...)
 *      - subscribed to with an Observer
 *      - executed with observer notifications
 *              - next
 *              - error
 *              - complete
 *      - observer notifications may be disposed
 * 
 * Core concerns:
 *      - Creating Observables
 *      - Subscribing to Observables
 *      - Executing the Observable
 *      - Disposing Observables
 */

// ---------------------------------- Setup
var Rx = require('rxjs/Rx');



// ---------------------------------- Anatomy
// Notes:
// Rx.Observable.create === Observable constructor / Or alias for constructor
// Observable takes one argument, a subscribe function
// .subscribe is a way to start/execute the Observer
// While different, below, subscribeFunction and .subscribe are conceptually the same.

let subscribeFunction = (observer) => {
    observer.next('returnValue');

    // To clear up subscribes, optionally return custom function which is invoked through observerable.unsubscribe()
    return function unsubscribe() {
        //... Function which releases any resources
    };
}

let observableObj = Rx.Observable.create(subscribeFunction)

let subscriptionObj = observableObj.subscribe((value) => {
    console.log('Value returned =', value);
})

// Conceptually, where each .next() is an individual return:
// observableObj.subscribe((subscribeFunction) => {
//     console.log('Value returned =', subscribeFunction());
// })

// As Observarbles may be inifite, may need to dispose of them.
// Dispose requires a way to stop all resources started in subscribe, see example far below
// unsubscribe() invokes the returned function above.
subscriptionObj.unsubscribe();


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
        observer.next(5); // This is not delivered as is after .complete()
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


// ---------------------------------- Example 003
// ---------------------------------- Synchronous

var sync = Rx.Observable.create(function (observer) {
    observer.next('Invoked!');
    console.log('Logged sync after return.');
});

sync.subscribe((value) => {
    console.log('This subscription has bee sync', value);
})

// logs: This subscription has bee sync Invoked!
// logs: Logged sync after return.



// ---------------------------------- Example 004
// ---------------------------------- Asynchronous

var async = Rx.Observable.create(function (observer) {
    setTimeout(() => {
        observer.next('Invoked!');
    }, 1000);
    console.log('Logged async before return.');
});

async.subscribe((value) => {
    console.log('This subscription has bee async', value);
})

// logs: Logged async before return.
// logs: This subscription has bee async Invoked!



// ---------------------------------- Example 005
// ---------------------------------- Try Catch Error
// Note:
// It may be appropriate to wrap the subscription up in try-catch block

var observable = Rx.Observable.create(function subscribe(observer) {
    try {
        observer.next(1);
        observer.next(2);
        observer.next(3);
        observer.complete();
    } catch (err) {
        observer.error(err); // delivers an error if it caught one
    }
});


// ---------------------------------- Example 006
// ---------------------------------- Dispose
var observable = Rx.Observable.from([10, 20, 30]);
var subscription = observable.subscribe(x => console.log(x));
// Later:
subscription.unsubscribe();