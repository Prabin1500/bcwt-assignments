'use strict';

const _ = require('lodash');

// Exercise 1
console.log('Hello World, I\'m Node');

// Exercise 2
let output = 'Testing nodemon, using lodast ' +
               'this camel case';
               
console.log(output);
output = _.camelCase(output);
console.log(output);