export interface User {
  id: string;
  name: string;
  image?: string
}

export interface LoggedUser extends User {
  token: string
}