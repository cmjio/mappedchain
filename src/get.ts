const get = (object: any, path: Array<any> | String, value?: any) => {
  if (!path) return undefined;
  const pathArray = Array.isArray(path)
    ? path
    : path.split(/[,[\].]/g).filter(Boolean);
  return (
    pathArray.reduce((prevObj, key) => prevObj && prevObj[key], object) || value
  );
};

export default get;
