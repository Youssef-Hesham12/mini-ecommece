import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { isAxiosError, type AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import { zodResolver } from "@/lib/zodResolver";
import { registerSchema, type RegisterFormValues } from "@/schemas/auth.schema";
import { useAuthStore } from "@/stores/user-token.store";
import type { AuthErrorResponse, AuthSuccessResponse } from "@/types/auth.response.interface";
import FormField from "../ui/FormField";

export default function RegisterForm() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    mode:"onChange"
  });

  const registerMutation = useMutation({
    mutationFn: async (values: RegisterFormValues) => {
      const { data } = await api.post<AuthSuccessResponse>("/auth/signup", values);
      return data;
    },
    onSuccess: (data) => {
      setAuth({
        token: data.token,
        user: data.user,
      });

      void navigate({ to: "/" });
    },
  });

  const apiError = isAxiosError<AuthErrorResponse>(registerMutation.error)
    ? getAuthErrorMessage(registerMutation.error)
    : "";

  return (
    <div className="mx-auto w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl font-semibold text-card-foreground">Create account</h1>
        <p className="text-sm text-muted-foreground">
          Join Fresh Cart and start shopping fresh groceries today.
        </p>
      </div>

      <form
        className="space-y-4"
        onSubmit={form.handleSubmit((values) => registerMutation.mutate(values))}
      >
        <FormField
          error={form.formState.errors.name?.message}
          label="Name"
          type="text"
          {...form.register("name")}
        />

        <FormField
          error={form.formState.errors.email?.message}
          label="Email"
          type="email"
          {...form.register("email")}
        />

        <FormField
          error={form.formState.errors.phone?.message}
          label="Phone"
          placeholder="01012345678"
          type="tel"
          {...form.register("phone")}
        />

        <FormField
          error={form.formState.errors.password?.message}
          label="Password"
          type="password"
          {...form.register("password")}
        />

        <FormField
          error={form.formState.errors.rePassword?.message}
          label="Confirm password"
          type="password"
          {...form.register("rePassword")}
        />

        {apiError ? (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {apiError}
          </p>
        ) : null}

        <Button className="w-full" disabled={registerMutation.isPending} type="submit">
          {registerMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : null}
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link className="font-medium text-primary hover:underline" to="/login">
          Sign in
        </Link>
      </p>
    </div>
  );
}

function getAuthErrorMessage(error: AxiosError<AuthErrorResponse>) {
  return error.response?.data?.message ?? "Something went wrong. Please try again.";
}
