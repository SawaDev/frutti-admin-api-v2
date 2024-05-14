import { z } from 'zod';

export const createPostSchema = z.object({
  name: z.record(z.string()),
  published: z.boolean(),
  description: z.record(z.string()),
  details: z.array(
    z.object({
      id: z.number(),
      image: z.string().nullable(),
      capacity: z.record(z.string()).nullable().optional(),
      mass: z.number().nullable().optional(),
      pure_mass: z.number().nullable().optional(),
      total_mass: z.number().nullable().optional(),
      expiration_date: z.number().nullable().optional(),
      volume: z.string().nullable().optional(),
      published: z.boolean().nullable().optional(),
      name: z.record(z.string()).nullable().optional(),
    }).nullable().optional()
  ).optional(),
});

export const updatePostSchema = z.object({
  name: z.record(z.string()).optional(),
  published: z.boolean().optional(),
  description: z.record(z.string()).optional(),
  details: z.array(
    z.object({
      image: z.string().nullable().optional(),
      mass: z.number().nullable().optional(),
      pure_mass: z.number().nullable().optional(),
      total_mass: z.number().nullable().optional(),
      expiration_date: z.number().nullable().optional(),
      volume: z.string().nullable().optional(),
      published: z.boolean().nullable().optional(),
      capacity: z.record(z.string()).nullable().optional(),
      name: z.record(z.string()).nullable().optional(),
    }).nullable().optional()
  ).optional()
});

export const detailSchema = z.object({
  image: z.string(),
  published: z.boolean(),
  name: z.record(z.string()),
  capacity: z.record(z.string()),
  mass: z.number().nullable().optional(),
  pure_mass: z.number().nullable().optional(),
  total_mass: z.number().nullable().optional(),
  expiration_date: z.number().nullable().optional(),
  volume: z.string().nullable().optional(),
})