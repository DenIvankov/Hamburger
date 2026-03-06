"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHamburgerStore } from "@/app/hamburgerStore";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useAuthControllerAuthenticateCustomer } from "@/api/generated";

const schema = z.object({
  phone: z.string().min(10, "Введите номер телефона"),
});

type FormValues = z.infer<typeof schema>;

export function PhoneForm({
  onSuccess,
}: {
  onSuccess: (phone: string) => void;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: "",
    },
  });

  const login = useHamburgerStore((state) => state.login);

  const authMutation = useAuthControllerAuthenticateCustomer({
    mutation: {
      onSuccess: (response) => {
        const token = response.data.token;
        login(token as string);
        onSuccess(form.getValues("phone"));
      },
      onError: (error) => {
        console.error("Ошибка отправки SMS", error);
        form.setError("phone", { message: "Ошибка отправки SMS" });
      },
    },
  });

  function onSubmit(values: FormValues) {
    authMutation.mutate({
      data: {
        phone: values.phone,
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-sm w-full"
      >
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Телефон</FormLabel>
              <FormControl>
                <Input placeholder="+79991234567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={authMutation.isPending}
        >
          {authMutation.isPending ? "Отправка..." : "Отправить код"}
        </Button>
      </form>
    </Form>
  );
}
