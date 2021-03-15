export type UserDataEntity = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export type User = {
  login: string;
  password: string;
  age: number;
}
