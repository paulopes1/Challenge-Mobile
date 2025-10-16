// src/utils/validators.ts
import { z } from 'zod';

export const readingSchema = z.object({
  bpm: z.number({ invalid_type_error: 'BPM deve ser um número' })
        .min(30, 'BPM mínimo é 30')
        .max(220, 'BPM máximo é 220'),
  status: z.enum(['APTO', 'NAO_APTO'], { required_error: 'Selecione o status' }),
  note: z.string().max(120, 'Observação até 120 caracteres').optional(),
});

export type ReadingForm = z.infer<typeof readingSchema>;
