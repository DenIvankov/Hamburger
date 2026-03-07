"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IconPencil, IconTrash, IconCheck } from "@tabler/icons-react";

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
  useUserAddressControllerUpdate,
  useUserAddressControllerDelete,
  useUserAddressControllerChangeActive,
} from "@/api/generated";

interface Address {
  id?: number;
  address?: string;
  house?: string;
  floor?: string;
  apartment?: string;
  comment?: string;
  is_active?: boolean;
}

interface AddressActionsProps {
  address: Address;
  onSuccess: () => void;
}

const addressSchema = z.object({
  address: z.string().min(5, "Введите корректный адрес"),
  house: z.string().min(1, "Введите номер дома"),
  floor: z.string().optional(),
  apartment: z.string().optional(),
  comment: z.string().optional(),
});

type AddressFormValues = z.infer<typeof addressSchema>;

export function AddressActions({ address, onSuccess }: AddressActionsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: address.address || "",
      house: address.house || "",
      floor: address.floor || "",
      apartment: address.apartment || "",
      comment: address.comment || "",
    },
  });

  const updateAddress = useUserAddressControllerUpdate({
    mutation: {
      onSuccess: () => {
        setIsEditOpen(false);
        onSuccess();
      },
      onError: (err) => {
        console.error("Ошибка обновления адреса", err);
        form.setError("root", {
          message: "Не удалось обновить адрес",
        });
      },
    },
  });

  const deleteAddress = useUserAddressControllerDelete({
    mutation: {
      onSuccess: () => {
        setIsDeleting(false);
        onSuccess();
      },
      onError: (err) => {
        console.error("Ошибка удаления адреса", err);
      },
    },
  });

  const changeActive = useUserAddressControllerChangeActive({
    mutation: {
      onSuccess: () => {
        onSuccess();
      },
      onError: (err) => {
        console.error("Ошибка изменения активного адреса", err);
      },
    },
  });

  function onSubmit(values: AddressFormValues) {
    const coordinates: [number, number] = [142.7386, 46.9588];

    const addressDetails: {
      floor?: string;
      apartment?: string;
      comment?: string;
    } = {};

    if (values.floor) addressDetails.floor = values.floor;
    if (values.apartment) addressDetails.apartment = values.apartment;
    if (values.comment) addressDetails.comment = values.comment;

    updateAddress.mutate({
      id: address.id!,
      data: {
        address: values.address,
        house: values.house,
        coordinates: coordinates as unknown as { [key: string]: unknown },
        address_details: addressDetails,
      },
    });
  }

  const handleDelete = () => {
    setIsDeleting(true);
    deleteAddress.mutate({
      id: address.id!,
    });
  };

  const handleSetActive = () => {
    changeActive.mutate({
      id: address.id!,
    });
  };

  return (
    <>
      {/* Кнопки действий */}
      <div className="flex items-center gap-2 mt-2">
        {!address.is_active && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSetActive}
            disabled={changeActive.isPending}
            className="text-green-600 hover:text-green-700 hover:bg-green-50"
          >
            <IconCheck size={18} className="mr-1" />
            Сделать активным
          </Button>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsEditOpen(true)}
          disabled={updateAddress.isPending}
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
        >
          <IconPencil size={16} />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <IconTrash size={16} />
        </Button>
      </div>

      {/* Диалог редактирования */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Редактировать адрес</DialogTitle>
            <DialogDescription>
              Внесите изменения в данные адреса
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
                        placeholder="Дом с красной крышей"
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
                  onClick={() => setIsEditOpen(false)}
                  disabled={updateAddress.isPending}
                >
                  Отмена
                </Button>
                <Button
                  type="submit"
                  disabled={updateAddress.isPending}
                >
                  {updateAddress.isPending ? "Сохранение..." : "Сохранить"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
