/**
 * Observer
 * Summary:
 *      - Consumber of values provided by Observable
 *      - A set of callbacks
 *      - One callback for each notification type, 'next', 'error', 'complete'
 * 
 * They are:
 *      - In short:
 *              "Observers are just objects with three callbacks, one for each type of notification that an Observable may deliver."
 * 
 */

// ---------------------------------- Setup
var Rx = require('rxjs/Rx');



// ---------------------------------- Anatomy
var observer = {
    next: x => console.log('Observer got a next value: ' + x),
    error: err => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
};



// ---------------------------------- To Use
// Provide it to the subscribe function

let observableObj = Rx.Observable.create((observer) => {
    observer.next('returnValue');
    return function unsubscribe() {
        //... Function which releases any resources
    };
})

// Observer provided as an object
let subscriptionObj = observableObj.subscribe(observer)

// Alternatively, passed as a function argument
// let subscriptionObj = observable.subscribe(
//     x => console.log('Observer got a next value: ' + x),
//     err => console.error('Observer got an error: ' + err),
//     () => console.log('Observer got a complete notification')
// );

// Note, observer notifications are options. If not provided, then they are ignored.