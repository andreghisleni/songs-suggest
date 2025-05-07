import { ConfigService } from '@nestjs/config';
import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().default(6363),

  API_URL: z.string(),
  WEB_URL: z.string(),

  DATABASE_URL: z.string(),

  CLOUDFLARE_ACCOUNT_ID: z.string(),
  CLOUDFLARE_ACCESS_KEY: z.string(),
  CLOUDFLARE_SECRET_KEY: z.string(),
  CLOUDFLARE_BUCKET_NAME: z.string(),
  CLOUDFLARE_PREFIX: z.string(),

  JWT_SECRET: z.string(),

  THROTTLE_TTL: z.coerce.number(),
  THROTTLE_LIMIT: z.coerce.number(),

  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),

  SOURCE_COMMIT: z.string().optional(),

  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number(),
  REDIS_USERNAME: z.string(),
  REDIS_PASSWORD: z.string().default(''),
});

export type Env = z.infer<typeof envSchema>;

export type ConfigTypedService = ConfigService<Env, true>;
