import { testOpenAI } from "../open-ai/open-ai";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const router = require("express").Router();

router.get("/test", testOpenAI);

export default router;
