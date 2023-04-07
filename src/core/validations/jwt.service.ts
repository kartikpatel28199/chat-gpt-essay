import * as jwt from "jsonwebtoken";
import ENV from "../../core/config/configuration";

export class JwtService {
  /**
   * Sing payload
   * @param payload
   * @returns
   */
  async signPayload(payload: any): Promise<string> {
    const token = await jwt.sign(payload, ENV.jwtSecretKey, {
      expiresIn: ENV.jwtExpiresIn,
    });
    return token;
  }
}
