"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCustomerControllerUpdate } from "@/api/generated";

const profileSchema = z.object({
  name: z
    .string()
    .min(2, "Имя должно содержать не менее 2 символов")
    .max(50, "Имя не должно превышать 50 символов")
    .regex(/^[a-zA-Zа-яА-ЯёЁ\s-]+$/, "Имя содержит недопустимые символы"),
  email: z
    .string()
    .email("Введите корректный email")
    .optional()
    .or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  email?: string | null;
  photoUrl?: string | null;
  onSuccess: () => void;
}

export function EditProfileDialog({
  open,
  onOpenChange,
  name,
  email,
  onSuccess,
}: EditProfileDialogProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: name || "",
      email: email || "",
    },
  });

  const updateProfile = useCustomerControllerUpdate({
    mutation: {
      onSuccess: () => {
        onSuccess();
        onOpenChange(false);
      },
      onError: (err) => {
        console.error("Ошибка обновления профиля", err);
        form.setError("root", {
          message: "Не удалось обновить профиль",
        });
      },
    },
  });

  function onSubmit(values: ProfileFormValues) {
    updateProfile.mutate({
      data: {
        name: values.name,
        email: values.email || null,
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Редактировать профиль</DialogTitle>
          <DialogDescription>
            Внесите изменения в данные профиля
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input placeholder="Иван Иванов" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@mail.ru"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.formState.errors.root && (
              <p className="text-sm text-red-500">
                {form.formState.errors.root.message}
              </p>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={updateProfile.isPending}
              >
                Отмена
              </Button>
              <Button
                type="submit"
                disabled={updateProfile.isPending}
              >
                {updateProfile.isPending ? "Сохранение..." : "Сохранить"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
