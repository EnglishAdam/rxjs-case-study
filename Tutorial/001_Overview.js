// Overview
// RxJS, a library for creating async and event-based programs.
//  - Used 

/**
 * OVERVIEW
 * - RxJS, a library for creating async and event-based programs.
 *      - Uses Observable sequences
 *      - Composed of:
 *          - 1 Core Type (Observable)
 *          - 3 Satellite Types (Observer, Schedulers, Subjects)
 *          - Operators
 *      - Similar to using Array.map/filter/reduce/every etc... for async events as collectison
 *      - Combinese Observer & Iterator Patterns
 *      - Combines Functional Programming with Collections * 
 */

/**
 * CONCEPTS
 * - Observable
 *      - Invokable Collection, of future values or events
 * - Observer
 *      - Collection (Object) of callbaks, respond to value delivered by the Observable
 * - Subscription
 *      - Execution of Observable
 *      - Or cancelling execution of Observable
 * - Operators
 *      - Pure functions, such as map, filter, concat to deal with collections
 * - Subject
 *      - Equivalent to EventEmitter
 *      - Able to multicast value or event
 * - Schedulers
 *      - Centralised dispatchers
 *      - Control concurrency
 *      - Coordinate when computation happen
 *      - e.g. setTimeout/requetAnimationFrame
 */