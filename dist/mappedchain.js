/*!
 * mappedchain v1.0.0
 * (c) Chris Johnson <me@cmj.io>
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.mappedchain = {}));
}(this, (function (exports) { 'use strict';

  var get = function get(object, path, value) {
    if (!path) return undefined;
    var pathArray = Array.isArray(path) ? path : path.split(/[,[\].]/g).filter(Boolean);
    return pathArray.reduce(function (prevObj, key) {
      return prevObj && prevObj[key];
    }, object) || value;
  };

  var get_1 = get;

  var mapperFactory = function mapperFactory(raw, mapper, opts) {
    var aliases = {};
    var mapped;

    var alias = function alias(prop) {
      return {
        to: function to(key) {
          aliases[prop] = key;
        }
      };
    };

    function _get(property) {
      var returnValue;

      if (!property) {
        return;
      }

      key = aliases[property];

      if (!key) {
        return;
      }

      try {
        returnValue = typeof key === 'function' ? key.call(this, raw, property) : get_1(raw, key);
      } catch (e) {
        console.error(e);
        throw new Error(e);
      }

      return returnValue;
    }

    mapper(alias, raw);
    mapped = Object.create({}, {
      __isMapped__: {
        enumerable: true,
        get: function get() {
          return true;
        },
        set: function set() {}
      },
      __raw__: {
        enumerable: true,
        get: function get() {
          return raw;
        }
      },
      __source__: {
        enumerable: true,
        get: function get() {
          return mapper.source;
        },
        set: function set() {}
      }
    });
    var props = Object.keys(aliases).reduce(function (prev, curr) {
      prev[curr] = {
        get: _get.bind(mapped, curr),
        enumerable: true
      };
      return prev;
    }, {});
    Object.defineProperties(mapped, props);
    return mapped;
  };

  var create = function (raw, mapper, opts) {
    var mapped;

    if (raw === undefined) {
      return null;
    }

    if (typeof mapper !== 'function') {
      return null;
    }

    if (!mapper.source) {
      return null;
    }

    mapped = mapperFactory(raw, mapper);
    return mapped;
  };

  var mapper = {
  	create: create
  };

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var _get = require('./get');

  var chainFactory = function chainFactory(_models) {
    var chain = {
      models: function models() {
        return _toConsumableArray(_models);
      },
      get: function get(prop, source) {
        var sortedModels;
        var value;
        var isSourceString = typeof source === 'string';
        var isSourceArray = Array.isArray(source);

        for (var _len = arguments.length, middleware = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          middleware[_key - 2] = arguments[_key];
        }

        var validMiddleware = middleware.filter(function (m) {
          return typeof m === 'function';
        });

        var runMiddleware = function runMiddleware(initial) {
          return validMiddleware.reduce(function (prev, curr) {
            return curr(prev);
          }, initial);
        };

        if (typeof prop !== 'string') {
          return;
        }

        if (source !== undefined && !isSourceString && !isSourceArray) {
          return;
        }

        if (isSourceString) {
          var model = _models.find(function (model) {
            return model.__source__ === source;
          });

          if (!model) {
            return;
          }

          return runMiddleware(_get(model, prop));
        }

        if (isSourceArray) {
          sortedModels = source.map(function (src) {
            return _models.find(function (model) {
              return model.__source__ === src;
            });
          });
        }

        if (!sortedModels) {
          sortedModels = _models;
        }

        sortedModels.some(function (model) {
          value = _get(model, prop);
          return value !== undefined;
        });
        return runMiddleware(value);
      }
    };
    return chain;
  };

  exports.create = function () {
    var sources = [];

    for (var _len2 = arguments.length, mappedObjs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      mappedObjs[_key2] = arguments[_key2];
    }

    var isValid = mappedObjs.every(function (obj) {
      var isMapped = obj.__isMapped__;
      var src = obj.__source__;
      var isDifferent = sources.indexOf(obj.__source__) === -1;
      sources.push(src);
      return isMapped && isDifferent;
    });

    if (!isValid) {
      return null;
    }

    var chain = chainFactory(mappedObjs);
    return chain;
  };

  var chain = /*#__PURE__*/Object.freeze({
    __proto__: null
  });

  var mapper_1 = mapper;
  var create$1 = chain.create;

  var src = {
  	mapper: mapper_1,
  	create: create$1
  };

  exports.create = create$1;
  exports.default = src;
  exports.mapper = mapper_1;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
