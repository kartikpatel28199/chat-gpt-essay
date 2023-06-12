import { FastifyReply } from "fastify";
import { Request } from "../types/request.types";
import { verifyToken } from "../validations/jwt.service";

/**
 * Auth middleware
 * @param req
 * @param reply
 * @param done
 * @returns
 */
export const authMiddleware = async (
  req: Request,
  reply: FastifyReply,
  done
) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return reply.status(403).send({ message: "Invalid authentication" });
  }

  try {
    const payload = await verifyToken(token);
    if (!payload) {
      return reply.status(401).send({ message: "Invalid authentication" });
    }
    req["user"] = payload;
  } catch (error) {
    return reply.status(401).send({ message: "Invalid authentication" });
  }

  done();
};
