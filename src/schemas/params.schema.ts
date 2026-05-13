import z from "zod";

export const searchParamsSchema = z.object({
  brand: z.coerce.string().optional(),
  category: z.coerce.string().optional(),
  limit: z.coerce.number().optional(),
  maxPrice: z.coerce.string().optional(),
  minPrice: z.coerce.string().optional(),
  page: z.coerce.number().optional(),
  q: z.coerce.string().optional(),
  sort: z.coerce.string().optional(),
});
