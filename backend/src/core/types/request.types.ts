import { FastifyRequest } from "fastify";
import { SessionDto } from "../../modules/auth/type/authenticated-user.type";

export type Request = FastifyRequest & { user: SessionDto };
