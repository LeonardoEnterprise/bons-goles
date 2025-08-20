"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.email("Email inválido").min(1, "Email é obrigatório"),
  password: z.string("Senha inválida").min(8, "Minimo 8 caracteres"),
});

type FormValues = z.infer<typeof formSchema>;

const SignInForm = () => {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormValues) {
    await authClient.signIn.email({
      email: values.email,
      password: values.password,

      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
        onError: (error) => {
          if (error.error.code === "USER_NOT_FOUND") {
            toast.error("Usuário não encontrado");
            form.setError("email", {
              message: "Usuário não encontrado",
            });
            return;
          }

          if (error.error.code === "WRONG_PASSWORD") {
            toast.error("Senha incorreta");
            form.setError("password", {
              message: "Senha incorreta",
            });
            return;
          }

          if (error.error.code === "INVALID_EMAIL_OR_PASSWORD") {
            toast.error("Email ou senha inválidos");
            form.setError("email", {
              message: "Email ou senha inválidos",
            });
            form.setError("password", {
              message: "Email ou senha inválidos",
            });
            return;
          }
          toast.error(error.error.message || "Erro ao fazer login");
        },
      },
    });
  }

  const handleSignInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
          <CardDescription>Faça login para continuar.</CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="grid gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite sua senha"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full">
                Entrar
              </Button>
              <Button
                variant={"outline"}
                className="w-full"
                onClick={handleSignInWithGoogle}
                type="button"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.839 10.38h-8.656v3.33h5.065c-.092.81-.645 2.07-1.842 2.88-.737.54-1.842.9-3.223.9-3.079 0-5.525-2.572-5.525-5.58 0-2.923 2.585-5.49 5.525-5.49 1.75 0 2.855.72 3.591 1.35l2.579-2.52C16.787 3.9 14.669 3 12.183 3 8.592 3 5.461 4.98 3.987 7.95a8.8 8.8 0 0 0 0 8.1C5.461 19.02 8.592 21 12.183 21c2.486 0 4.604-.81 6.078-2.16 2.4-2.1 3.095-5.427 2.578-8.46" />
                </svg>
                Entrar com o Google
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default SignInForm;
