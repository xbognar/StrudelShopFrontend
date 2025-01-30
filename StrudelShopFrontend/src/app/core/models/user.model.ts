export interface User {
  userID?: number;
  username: string;
  passwordHash: string;
  role?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
}
