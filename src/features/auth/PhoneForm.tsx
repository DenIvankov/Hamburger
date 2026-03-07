"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Loader2 } from "lucide-react";

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
  useAuthControllerAuthenticateCustomer,
  useCustomerControllerSend,
} from "@/api/generated";

function normalizePhone(phone: string) {
  const normalized = phone.replace(/[^\d+]/g, "");

  if (!normalized.startsWith("+")) {
    return normalized.replace(/\+/g, "");
  }

  return `+${normalized.slice(1).replace(/\+/g, "")}`;
}

const schema = z.object({
  phone: z.string().refine((value) => {
    const normalized = normalizePhone(value);
    return normalized.length >= 10 && /^\+?\d+$/.test(normalized);
  }, "Введите корректный номер телефона"),
});

type FormValues = z.infer<typeof schema>;

function HamburgerStoreLogo({ size = 90 }: { size?: number }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <polygon
        points="100,20 120,70 180,70 130,105 150,160 100,125 50,160 70,105 20,70 80,70"
        fill="#ff7ab6"
        stroke="#1f1f1f"
        strokeWidth="6"
        strokeLinejoin="round"
      />

      <circle cx="75" cy="85" r="10" fill="white" />
      <circle cx="125" cy="85" r="10" fill="white" />
      <circle cx="75" cy="85" r="4" fill="#1f1f1f" />
      <circle cx="125" cy="85" r="4" fill="#1f1f1f" />

      <path
        d="M70 110 Q100 140 130 110"
        stroke="#1f1f1f"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />

      <g transform="translate(70,130)">
        <rect width="60" height="12" rx="6" fill="#8b4513" />
        <rect y="10" width="60" height="8" fill="#3cb043" />
        <rect y="18" width="60" height="10" fill="#5c2c06" />
        <rect y="26" width="60" height="12" rx="6" fill="#f4a460" />
      </g>
    </svg>
  );
}

export function PhoneForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const login = useHamburgerStore((state) => state.login);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: "",
    },
  });

  const sendSmsQuery = useCustomerControllerSend({
    query: {
      enabled: false,
    },
  });

  const authMutation = useAuthControllerAuthenticateCustomer({
    mutation: {
      onSuccess: async (response) => {
        const token = response.data.token;
        login(token as string);

        await sendSmsQuery.refetch();

        onSuccess();
      },
      onError: () => {
        form.setError("phone", {
          message: "Ошибка отправки SMS",
        });
      },
    },
  });

  function onSubmit(values: FormValues) {
    const normalizedPhone = normalizePhone(values.phone);

    authMutation.mutate({
      data: {
        phone: normalizedPhone,
      },
    });
  }

  const isLoading = authMutation.isPending || sendSmsQuery.isFetching;
  const phoneValue = form.watch("phone");

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-muted/40 overflow-hidden">
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
            <div className="flex flex-col items-center space-y-3">
              <HamburgerStoreLogo />
              <h1 className="text-xl font-semibold text-center max-w-full truncate">
                Hamburger
              </h1>

              <p className="text-md text-muted-foreground text-center">
                Вход по номеру телефона
              </p>
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Phone
                        className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        h-4
                        w-4
                        text-muted-foreground
                      "
                      />

                      <Input
                        autoFocus
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="+7 999 123 45 67"
                        className="pl-9 h-12 rounded-xl"
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <p className="text-sm text-muted-foreground">
                    Мы отправим SMS с кодом подтверждения
                  </p>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium rounded-xl"
              disabled={!phoneValue || isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

              {isLoading ? "Отправка..." : "Получить код"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
