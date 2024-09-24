import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

export class Utils {
  static generateRandomPassword(): string {
    return randomBytes(Math.ceil(5)).toString('hex').slice(0, 10);
  }

  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    try {
      return await bcrypt.hash(password, saltRounds);
    } catch (error) {
      console.log(error);
    }
  }

  static async comparePassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, passwordHash);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
