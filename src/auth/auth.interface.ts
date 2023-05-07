import { Request } from 'express';
import {
  UserInterface,
  UserInterfaceResponse,
} from 'src/users/users.interface';

export interface AuthRequestInterface extends Request {
  userAuth?: UserInterfaceResponse;
}
