import { Request as ExpressRequest } from "express";
import { SessionDto } from "../../modules/auth/type/authenticated-user.type";

export type Request = ExpressRequest & { user: SessionDto };
