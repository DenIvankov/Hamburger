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
import {
  useUserAddressControllerSave,
} from "@/api/generated";

const addressSchema = z.object({
  address: z.string().min(5, "Введите корректный адрес"),
  house: z.string().min(1, "Введите номер дома"),
  floor: z.string().optional(),
  apartment: z.string().optional(),
  comment: z.string().optional(),
});

type AddressFormValues = z.infer<typeof addressSchema>;

interface AddAddressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function AddAddressDialog({
  open,
  onOpenChange,
  onSuccess,
}: AddAddressDialogProps) {
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: "",
      house: "",
      floor: "",
      apartment: "",
      comment: "",
    },
  });

  const saveAddress = useUserAddressControllerSave({
    mutation: {
      onSuccess: (data) => {
        console.log("Адрес успешно сохранён:", data);
        onSuccess();
        onOpenChange(false);
        form.reset();
      },
      onError: (err) => {
        console.error("Ошибка сохранения адреса:", err);
        form.setError("root", {
          message: `Не удалось сохранить адрес: ${JSON.stringify(err)}`,
        });
      },
    },
  });

  function onSubmit(values: AddressFormValues) {
    // Координаты в формате [lng, lat] - массив из двух чисел
    const coordinates: [number, number] = [142.7386, 46.9588]; // [lng, lat]

    // Формируем address_details правильно
    const addressDetails: {
      floor?: string;
      apartment?: string;
      comment?: string;
    } = {};

    if (values.floor) addressDetails.floor = values.floor;
    if (values.apartment) addressDetails.apartment = values.apartment;
    if (values.comment) addressDetails.comment = values.comment;

    console.log("Отправляем адрес:", {
      address: values.address,
      coordinates,
      address_details: addressDetails,
      house: values.house,
    });

    saveAddress.mutate({
      data: {
        address: values.address,
        coordinates: coordinates as unknown as { [key: string]: unknown },
        address_details: addressDetails,
        house: values.house,
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Добавить адрес</DialogTitle>
          <DialogDescription>
            Введите данные адреса доставки
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Адрес</FormLabel>
                  <FormControl>
                    <Input placeholder="ул. Примерная" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="house"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дом</FormLabel>
                    <FormControl>
                      <Input placeholder="10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="floor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Этаж</FormLabel>
                    <FormControl>
                      <Input placeholder="5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="apartment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Квартира</FormLabel>
                    <FormControl>
                      <Input placeholder="42" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Комментарий</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Дом с красной крышей, домофон не работает"
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
                onClick={() => {
                  onOpenChange(false);
                  form.reset();
                }}
                disabled={saveAddress.isPending}
              >
                Отмена
              </Button>
              <Button
                type="submit"
                disabled={saveAddress.isPending}
              >
                {saveAddress.isPending ? "Сохранение..." : "Сохранить"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
