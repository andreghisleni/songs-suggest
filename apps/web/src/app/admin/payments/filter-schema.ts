import { z } from 'zod';

export const filterSchema = z.object({
  statusFilter: z
    .enum(['PENDING', 'CONFIRMED', 'REJECTED', 'ALL'])
    .default('ALL')
    .describe('Status'),
});
