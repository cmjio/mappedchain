const get = require('./get');

const mapperFactory = (raw, mapper, opts) => {
  const aliases = {}
  let mapped;

  const alias = (prop) => {
    return {
      to: (key) => {
        aliases[prop] = key;
      }
    }
  }


  function _get(property) {
    let returnValue;

    if (!property) {
      return;
    }

    key = aliases[property];

    if (!key) {
      return;
    }

    try {
      returnValue = (typeof key === 'function') ? key.call(this, raw, property) : get(raw, key);
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }

    return returnValue
  }

  mapper(alias, raw)

  mapped = Object.create({}, {
    __isMapped__: {
      enumerable: true,
      get: () => true,
      set: () => { }
    },
    __raw__: {
      enumerable: true,
      get: () => raw,
    },
    __source__: {
      enumerable: true,
      get: () => mapper.source,
      set: () => { }
    }
  })


  const props = Object.keys(aliases).reduce((prev, curr) => {
    prev[curr] = {
      get: _get.bind(mapped, curr),
      enumerable: true
    }

    return prev
  }, {});

  Object.defineProperties(mapped, props)
  return mapped;
}



exports.create = (raw, mapper, opts) => {
  let mapped;

  if (raw === undefined) {
    return null
  }

  if (typeof mapper !== 'function') {
    return null;
  }

  if (!mapper.source) {
    return null;
  }

  mapped = mapperFactory(raw, mapper, opts)

  return mapped
}
