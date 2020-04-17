const get = require('./get');

const chainFactory = (models) => {
  const chain = {
    models: () => [...models],
    get: (prop, source, ...middleware) => {
      let sortedModels;
      let value;
      const isSourceString = typeof source === 'string';
      const isSourceArray = Array.isArray(source)
      const validMiddleware = middleware.filter(m => typeof m === 'function')

      const runMiddleware = (initial) => validMiddleware.reduce((prev, curr) => curr(prev), initial)

      if (typeof prop !== 'string') {
        return;
      }

      if (source !== undefined && !isSourceString && !isSourceArray) {
        return;
      }

      if (isSourceString) {
        const model = models.find(model => model.__source__ === source);
        if (!model) {
          return
        }

        return runMiddleware(get(model, prop))
      }

      if (isSourceArray) {
        sortedModels = source.map(src => models.find(model => model.__source__ === src))
      }

      if (!sortedModels) {
        sortedModels = models;
      }

      sortedModels.some(model => {
        value = get(model, prop);
        return value !== undefined;
      })

      return runMiddleware(value);
    }
  }
  return chain;
}

exports.create = (...mappedObjs) => {
  const sources = []
  const isValid = mappedObjs.every((obj) => {
    const isMapped = obj.__isMapped__;
    const src = obj.__source__;
    const isDifferent = sources.indexOf(obj.__source__) === -1;

    sources.push(src)

    return (isMapped && isDifferent)
  })

  if (!isValid) {
    return null
  }

  const chain = chainFactory(mappedObjs)

  return chain
}