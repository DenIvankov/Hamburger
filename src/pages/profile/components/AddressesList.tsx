"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconMapPin, IconPlus } from "@tabler/icons-react";
import { useUserAddressControllerFindAll } from "@/api/generated";
import { AddAddressDialog } from "./AddAddressDialog";
import { AddressActions } from "./AddressActions";

interface Address {
  id?: number;
  address?: string;
  house?: string;
  address_details?: { 
    comment?: string; 
    floor?: string; 
    apartment?: string;
  };
  is_active?: boolean;
}

export function AddressesList() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { data, isLoading, error, refetch } = useUserAddressControllerFindAll();

  // Извлекаем массив адресов из ответа API
  const addresses = (data?.data as unknown as { data?: Address[] })?.data || [];

  if (isLoading) {
    return (
      <div className="bg-white rounded-[24px] p-4 mb-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Адреса доставки</h2>
        <p className="text-sm text-gray-500">Загрузка адресов...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-[24px] p-4 mb-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Адреса доставки</h2>
        <p className="text-sm text-red-500">Ошибка загрузки адресов</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-[24px] p-4 mb-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Адреса доставки</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <IconPlus size={18} className="mr-1" />
            Добавить
          </Button>
        </div>

        {addresses.length > 0 ? (
          <div className="space-y-3">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className={`p-4 rounded-lg border ${
                  addr.is_active
                    ? "bg-green-50 border-green-300"
                    : "bg-gray-50 border-gray-100"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`mt-0.5 ${
                      addr.is_active 
                        ? "text-green-600" 
                        : "text-gray-400"
                    }`}>
                      <IconMapPin size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-base">{addr.address}</p>
                        {addr.is_active && (
                          <span className="px-2 py-0.5 bg-green-200 text-green-800 text-xs rounded-full font-medium">
                            Активный
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        д. {addr.house}
                      </p>
                      {(addr.address_details?.floor || addr.address_details?.apartment || addr.address_details?.comment) && (
                        <p className="text-xs text-gray-500 mt-1">
                          {[
                            addr.address_details.floor && `Этаж: ${addr.address_details.floor}`,
                            addr.address_details.apartment && `Кв: ${addr.address_details.apartment}`,
                            addr.address_details.comment,
                          ]
                            .filter(Boolean)
                            .join(" • ")}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <AddressActions 
                  address={addr} 
                  onSuccess={refetch} 
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <IconMapPin size={48} className="mx-auto text-gray-300 mb-2" />
            <p className="text-sm text-gray-500">
              У вас пока нет сохранённых адресов
            </p>
            <Button
              variant="link"
              className="text-blue-500 mt-2"
              onClick={() => setIsAddDialogOpen(true)}
            >
              Добавить первый адрес
            </Button>
          </div>
        )}
      </div>

      <AddAddressDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSuccess={() => {
          refetch();
        }}
      />
    </>
  );
}
