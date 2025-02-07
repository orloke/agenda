import { z } from 'zod';

export interface Person {
  id?: number;
  name: string;
  phone: string;
  email: string;
  address?: string;
}


export const PersonSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  phone: z.string().min(1, 'O telefone é obrigatório'),
  email: z.string().email('Email inválido'),
  address: z.string().optional(),
});

export type PersonFormData = z.infer<typeof PersonSchema>;
