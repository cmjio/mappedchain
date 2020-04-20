export { default as get } from "./get";
import { create as createMapper } from "./mapper";
export { create } from "./chain";

export const mapper = {
  create: createMapper,
};
