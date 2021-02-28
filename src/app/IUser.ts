import { Roles } from './IRoles';

export interface User{
  email: string;
  firstname: string;
  lastname: string;
  city: string;
  roles: Roles;
}
