import get from "./get";

interface IMapper extends Function {
  source: String;
  type?: String;
}

const mapperFactory = (raw: any, mapper: IMapper, opts?: object) => {
  const aliases = {};
  let mapped;

  const alias = (prop: string) => {
    return {
      to: (key: string | Function) => {
        aliases[prop] = key;
      },
    };
  };

  function getProp(property: string) {
    let returnValue;

    if (!property) {
      return;
    }

    const key = aliases[property];

    if (!key) {
      return;
    }

    try {
      returnValue =
        typeof key === "function"
          ? key.call(this, raw, property)
          : get(raw, key, undefined);
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }

    return returnValue;
  }

  mapper(alias, raw);

  mapped = Object.create(
    {},
    {
      __isMapped__: {
        enumerable: true,
        get: () => true,
        set: () => {},
      },
      __raw__: {
        enumerable: true,
        get: () => raw,
      },
      __source__: {
        enumerable: true,
        get: () => mapper.source,
        set: () => {},
      },
    }
  );

  const props = Object.keys(aliases).reduce((prev, curr) => {
    prev[curr] = {
      get: getProp.bind(mapped, curr),
      enumerable: true,
    };

    return prev;
  }, {});

  Object.defineProperties(mapped, props);
  return mapped;
};

export const create = (raw: object, mapper: IMapper, opts?: any) => {
  let mapped;

  if (raw === undefined) {
    return null;
  }

  if (typeof mapper !== "function") {
    return null;
  }

  if (!mapper.source) {
    return null;
  }

  mapped = mapperFactory(raw, mapper, opts);

  return mapped;
};
