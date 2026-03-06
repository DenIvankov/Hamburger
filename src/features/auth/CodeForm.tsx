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

import { useCustomerControllerConfirm } from "@/api/generated";

const schema = z.object({
  code: z.string().length(4, "Введите код из SMS"),
});

type FormValues = z.infer<typeof schema>;

export function CodeForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: "",
    },
  });

  const login = useHamburgerStore((state) => state.login);

  const confirmMutation = useCustomerControllerConfirm({
    mutation: {
      onSuccess: (res) => {
        const token = res.data.token;
        login(token as string);
        window.location.href = "/";
      },
      onError: (err) => {
        console.error("Ошибка подтверждения", err);
        form.setError("code", {
          type: "manual",
          message: "Неверный код подтверждения",
        });
      },
    },
  });

  function onSubmit(values: FormValues) {
    confirmMutation.mutate({
      data: {
        code: values.code,
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
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Код из SMS</FormLabel>
              <FormControl>
                <Input placeholder="123456" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={confirmMutation.isPending}
        >
          {confirmMutation.isPending ? "Проверка..." : "Подтвердить"}
        </Button>
      </form>
    </Form>
  );
}
