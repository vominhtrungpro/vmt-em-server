import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

export class Utils {
  // Function to generate random password
  static generateRandomPassword(): string {
    return randomBytes(Math.ceil(5)) // Generates random bytes
      .toString('hex') // Convert to hexadecimal string
      .slice(0, 10); // Return the desired length
  }

  // Function to hash the password
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Number of salt rounds for bcrypt
    try {
      return await bcrypt.hash(password, saltRounds);
    } catch (error) {
      console.log(error);
    }
  }
}
