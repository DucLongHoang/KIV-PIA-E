import { config } from "dotenv"
import { cleanEnv, port, str, url } from "envalid"

config()

const env = cleanEnv(process.env, {
  DATABASE_URL: url({ default: "postgresql://postgres:postgres@postgres:5432/postgres?schema=public" }),
  SERVER_PORT: port({ default: 5000 }),
  COOKIE_SECRET: str({ default: "cookie-secret" }),
  ACCESS_TOKEN_SECRET: str({ default: "access-token-secret" }),
})

export default env
