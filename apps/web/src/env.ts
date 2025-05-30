import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const nodeEnv = z.enum(["development", "production", "test"]);

export const env = createEnv({
  server: {
    // NEXTAUTH_SECRET: z.string().min(1),
    // CLERK_SECRET_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_VERCEL_URL: z.string().url().min(1),
  },
  shared: {
    NODE_ENV: nodeEnv,
    VERCEL_ENV: z
      .enum(["production", "preview", "development"])
      .default("development"),
    NEXT_PUBLIC_API_URL: z.string().url().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
  },
});
