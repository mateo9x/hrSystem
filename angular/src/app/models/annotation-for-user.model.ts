import {User} from "./user.model";

export class AnnotationForUser {
  id?: number;
  user: User;
  createDate: Date;
  message: string;
  readed: boolean;
}
