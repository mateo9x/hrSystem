import {User} from "./user.model";

export class AnnotationForUser {
  id?: number;
  user: User;
  createDate: Date;
  message: string;
  readed: boolean;
  readedChanged = false;
}

export class AnnotationForUsersRequest {
  userIds: number[];
  createDate: Date;
  message: string;
}
