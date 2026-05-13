import type { FieldErrors, FieldValues, Resolver } from "react-hook-form";
import type { z } from "zod";

export function zodResolver<T extends FieldValues>(schema: z.ZodType<T>): Resolver<T> {
  return (values) => {
    const result = schema.safeParse(values);

    if (result.success) {
      return {
        values: result.data,
        errors: {},
      };
    }

    const errors = result.error.issues.reduce(
      (fieldErrors, issue) => {
        const fieldName = issue.path.join(".");

        if (fieldName) {
          fieldErrors[fieldName] = {
            type: issue.code,
            message: issue.message,
          };
        }

        return fieldErrors;
      },
      {} as Record<string, { type: string; message: string }>,
    );

    return {
      values: {},
      errors: errors as FieldErrors<T>,
    };
  };
}
