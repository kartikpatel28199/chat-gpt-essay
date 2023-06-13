import * as jwt from "jsonwebtoken";
import ENV from "../../core/config/configuration";
import { JwtPayload } from "../../modules/auth/type/authenticated-user.type";

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

/**
 * verify jwt token
 * @param token
 * @returns
 */
export const verifyToken = async (token: string): Promise<JwtPayload> => {
  const payload = (await jwt.verify(token, ENV.jwtSecretKey)) as JwtPayload;
  return payload;
};
