export const MODULE_NAME = 'util';


export function getENV(): any {
  let envData = {};
  try {
    envData = process.env.ENV_DATA || {};
  } catch (e) {
    console.log(e);
  }
  return envData;
}

export function getEnvData(key: string): any {
  return getENV()[key];
}
