"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";
import { Loader2, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHamburgerStore } from "@/app/hamburgerStore";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  useCustomerControllerConfirm,
  useCustomerControllerGet,
} from "@/api/generated";

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

  const navigate = useNavigate();
  const setConfirm = useHamburgerStore((state) => state.setConfirm);
  const [isCodeSent, setIsCodeSent] = useState(false);

  const confirmMutation = useCustomerControllerConfirm({
    mutation: {
      onSuccess: () => {
        setIsCodeSent(true);
      },
      onError: () => {
        form.setError("code", {
          type: "manual",
          message: "Неверный код подтверждения",
        });
      },
    },
  });

  const { data, isLoading, isError } = useCustomerControllerGet({
    query: {
      enabled: isCodeSent,
      retry: false,
    },
  });

  useEffect(() => {
    // Не используем кэшированные данные, пока код реально не подтверждён
    if (!isCodeSent) return;

    if (data) {
      setConfirm(true);
      navigate("/main", { replace: true });
    } else if (isError) {
      setConfirm(false);
    }
  }, [isCodeSent, data, isError, setConfirm, navigate]);

  function onSubmit(values: FormValues) {
    confirmMutation.mutate({
      data: {
        code: values.code,
      },
    });
  }

  const isPending = confirmMutation.isPending || isLoading;
  const codeValue = form.watch("code");

  return (
    <div className="w-full max-w-sm px-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="
            space-y-6
            p-7
            rounded-2xl
            bg-background
            shadow-md
            border
          "
        >
          {/* Header */}

          <div className="flex flex-col items-center space-y-3">
            <ShieldCheck className="h-10 w-10 text-primary" />

            <h1 className="text-xl font-semibold text-center">Введите код</h1>

            <p className="text-sm text-muted-foreground text-center">
              Мы отправили SMS с кодом подтверждения
            </p>
          </div>

          {/* Code input */}

          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    autoFocus
                    inputMode="numeric"
                    placeholder="1234"
                    maxLength={4}
                    className="
                      h-12
                      text-center
                      text-lg
                      tracking-widest
                      rounded-xl
                    "
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}

          <Button
            type="submit"
            className="w-full h-12 text-base font-medium rounded-xl"
            disabled={!codeValue || isPending}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

            {confirmMutation.isPending
              ? "Проверка..."
              : isLoading
                ? "Загрузка..."
                : "Подтвердить"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
