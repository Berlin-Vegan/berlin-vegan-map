import { environmentDefault } from "./environment-default";

export const environment: typeof environmentDefault = {
    ...environmentDefault,
    production: true,
};
