export interface IEnvVariables {
  dbName: string;
  dbUsername: string;
  dbPassword: string;
}

export interface IEnvironment {
  getVariables(): IEnvVariables
}
