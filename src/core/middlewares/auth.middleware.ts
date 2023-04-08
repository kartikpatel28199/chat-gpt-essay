import { Request, Response } from "express";
import { verifyToken } from "../validations/jwt.service";

/**
 * Auth middleware
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const authMiddleware = async (req: Request, res: Response, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Invalid authentication" });
  }

  try {
    const payload = await verifyToken(token);
    if (!payload) {
      return res.status(401).json({ message: "Invalid authentication" });
    }
    req["user"] = payload;
  } catch (error) {
    return res.status(401).json({ message: "Invalid authentication" });
  }

  next();
};
