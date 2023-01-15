export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password2: string;
  pesel: string;
  roles: any[];
  street?: string;
  streetNumber?: string;
  postalCode?: string;
  city?: string;
  phoneNumber?: number;
  resetToken?: string;
}
