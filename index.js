/**
 * Created by Newton on 2015/10/26.
 */

'use strict';

var is = require('is');

/**
 * node extend
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * @fileoverview
 * Port of jQuery.extend that actually works on node.js
 */
function extend(){
  var target = arguments[0] || {};
  var i = 1;
  var length = arguments.length;
  var deep = false;
  var options, name, src, copy, copyIsArray, clone;

  // handle a deep copy situation
  if (is.bool(target)) {
    deep = target;
    target = arguments[1] || {};
    // skip the boolean and the target
    i = 2;
  }

  // handle case when target is a string or something (possible in deep copy)
  if ((typeof target !== 'object' && !is.fn(target)) || target === null) {
    target = {};
  }

  for (; i < length; i++) {
    // only deal with non-null/undefined values
    options = arguments[i];

    if (options !== null) {
      // extend the base object
      for (name in options) {
        if (options.hasOwnProperty(name)) {
          src = target[name];
          copy = options[name];

          // prevent never-ending loop
          if (target === copy) {
            continue;
          }

          // recurse if we're merging plain objects or arrays
          if (deep && copy && (is.hash(copy) || (copyIsArray = Array.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && Array.isArray(src) ? src : [];
            } else {
              clone = src && is.hash(src) ? src : {};
            }

            // never move original objects, clone them
            target[name] = extend(deep, clone, copy);

            // don't bring in undefined values
          } else if (typeof copy !== 'undefined') {
            target[name] = copy;
          }
        }
      }
    }
  }

  // return the modified object
  return target;
}

/**
 * exports module
 */
module.exports = extend;