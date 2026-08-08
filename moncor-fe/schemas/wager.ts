import { z } from 'zod';

export const WagerModeSchema = z.enum(['fixed', 'variable']);
export const FixedHorizonSchema = z.enum(['PT1M', 'PT3M', 'PT5M', 'PT10M']);

// Zod schema for wager draft
export const WagerDraftSchema = z.object({
  mode: WagerModeSchema,
  horizon: z.union([FixedHorizonSchema, z.number().int().min(10).max(60)]).optional(),
  selection: z.string().optional(),
  wagerAmount: z.string().regex(/^\d+(\.\d+)?$/), // Decimal string
});

export type WagerMode = z.infer<typeof WagerModeSchema>;
export type WagerDraft = z.infer<typeof WagerDraftSchema>;
