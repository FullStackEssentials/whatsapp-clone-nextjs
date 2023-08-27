import { UserResponse } from "stream-chat";

export interface InitialUser {
  id: string;
  name: string;
  image?: string
}

export interface LoggedUser extends InitialUser {
  token: string
}

export interface AppUser extends UserResponse {
  image?: string
};