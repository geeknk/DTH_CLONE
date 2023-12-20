import { UUID } from "crypto";

export interface user {
    id?: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    mobile: number;
    address: string;
  }