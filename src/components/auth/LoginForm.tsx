import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { isAxiosError, type AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import FormField from "@/components/ui/FormField";
import { api } from "@/lib/axios";
import { zodResolver } from "@/lib/zodResolver";
import { loginSchema, type LoginFormValues } from "@/schemas/auth.schema";
import { useAuthStore } from "@/stores/user-token.store";
import type { AuthErrorResponse, AuthSuccessResponse } from "@/types/auth.response.interface";

export default function LoginForm() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (values: LoginFormValues) => {
      const { data } = await api.post<AuthSuccessResponse>("/auth/signin", values);
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

  const apiError = isAxiosError<AuthErrorResponse>(loginMutation.error)
    ? getAuthErrorMessage(loginMutation.error)
    : "";

  return (
    <div className="mx-auto w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl font-semibold text-card-foreground">Sign in</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back. Enter your details to continue shopping.
        </p>
      </div>

      <form
        className="space-y-4"
        onSubmit={form.handleSubmit((values) => loginMutation.mutate(values))}
      >
        <FormField
          error={form.formState.errors.email?.message}
          label="Email"
          type="email"
          {...form.register("email")}
        />

        <FormField
          error={form.formState.errors.password?.message}
          label="Password"
          type="password"
          {...form.register("password")}
        />

        {apiError ? (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {apiError}
          </p>
        ) : null}

        <Button className="w-full" disabled={loginMutation.isPending} type="submit">
          {loginMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : null}
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        New to Fresh Cart?{" "}
        <Link className="font-medium text-primary hover:underline" to="/register">
          Create account
        </Link>
      </p>
    </div>
  );
}

function getAuthErrorMessage(error: AxiosError<AuthErrorResponse>) {
  return error.response?.data?.message ?? "Something went wrong. Please try again.";
}
