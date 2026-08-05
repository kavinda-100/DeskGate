import { z } from 'zod';

// type SearchParams = {
//   client_id?: string | undefined;
//   state?: string | undefined;
//   code_challenge?: string | undefined;
//   code_challenge_method?: string | undefined;
// };

export const electronSearchSchema = z.object({
  client_id: z.string().optional(),
  state: z.string().optional(),
  code_challenge: z.string().optional(),
  code_challenge_method: z.string().optional(),
});

export type ElectronSearchParamsType = z.infer<typeof electronSearchSchema>;
