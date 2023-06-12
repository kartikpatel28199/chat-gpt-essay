import HttpException from "../validations/http-exception";
import { FastifyReply, FastifyRequest } from "fastify";

function errorMiddleware(
  error: HttpException,
  request: FastifyRequest,
  reply: FastifyReply
) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  reply.status(status).send({
    status,
    message,
  });
}

export default errorMiddleware;
