export class User {
  private static currentId = 0;

  id: number;
  username: string;
  hashedPassword: string;
  darkMode: boolean;

  constructor(username: string, hashedPassword: string) {
    this.id = User.currentId++;
    this.username = username;
    this.hashedPassword = hashedPassword;
    this.darkMode = false;
  }
}
