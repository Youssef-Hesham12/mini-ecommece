import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid email").trim().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
     email: z.email("Enter a valid email").trim().min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    rePassword: z.string().min(1, "Please confirm your password"),
    phone: z
      .string()
      .trim()
      .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
  })
  .refine((values) => values.password === values.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
