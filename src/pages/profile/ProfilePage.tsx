"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  IconPhone,
  IconMail,
  IconLogout,
  IconPencil,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { useHamburgerStore } from "@/app/hamburgerStore";
import { useCustomerControllerGet, useImageControllerCreateUserImage } from "@/api/generated";

import { AvatarEditor } from "./components/AvatarEditor";
import { EditProfileDialog } from "./components/EditProfileDialog";
import { AddressesList } from "./components/AddressesList";

export default function ProfilePage() {
  const navigate = useNavigate();
  const logout = useHamburgerStore((state) => state.logout);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [storedPhotoUrl, setStoredPhotoUrl] = useState<string | null>(null);

  const { data, isLoading, error, refetch } = useCustomerControllerGet();

  const uploadPhoto = useImageControllerCreateUserImage({
    mutation: {
      onSuccess: (data) => {
        console.log("Фото загружено, ответ API:", data);
        // Структура ответа: { data: { data: Image[] } }
        // Image содержит: id, url, url_lg, type, ...
        const images = (data?.data as unknown as { data?: Array<{ url?: string; url_lg?: string }> })?.data;
        console.log("Массив изображений:", images);
        
        if (images && images.length > 0) {
          // Используем url_lg (большое фото) или url (маленькое)
          const imageUrl = images[0].url_lg || images[0].url;
          console.log("URL фото (url_lg):", images[0].url_lg);
          console.log("URL фото (url):", images[0].url);
          console.log("Сохраняем URL фото:", imageUrl);
          
          if (imageUrl) {
            localStorage.setItem('userPhotoUrl', imageUrl);
            setStoredPhotoUrl(imageUrl);
            refetch();
          }
        }
      },
      onError: (err) => {
        console.error("Ошибка загрузки фото", err);
      },
    },
  });

  // Читаем фото из localStorage при загрузке
  useEffect(() => {
    const savedPhoto = localStorage.getItem('userPhotoUrl');
    if (savedPhoto) {
      setStoredPhotoUrl(savedPhoto);
    }
  }, []);

  // Слушаем изменения localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const savedPhoto = localStorage.getItem('userPhotoUrl');
      if (savedPhoto) {
        setStoredPhotoUrl(savedPhoto);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    // Очищаем фото профиля из localStorage
    localStorage.removeItem('userPhotoUrl');
    setStoredPhotoUrl(null);
    logout();
    navigate("/", { replace: true });
  };

  const handlePhotoSelect = (file: File) => {
    console.log("Выбрано фото для загрузки:", file);
    setPhotoPreview(URL.createObjectURL(file));
    
    // Загружаем фото сразу
    uploadPhoto.mutate({
      data: {
        files: [file],
      },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Загрузка...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-500">Ошибка загрузки профиля</div>
      </div>
    );
  }

  const user = data.data as unknown as {
    name?: string;
    phone?: string;
    email?: string;
    photo?: { url?: string } | null;
  };

  // Читаем фото из localStorage или из ответа API
  const userPhoto = storedPhotoUrl || user?.photo?.url || null;
  const displayPhoto = photoPreview || userPhoto;

  return (
    <div className="min-h-screen bg-gray-100 pb-[calc(100px+env(safe-area-inset-bottom))]">
      {/* HEADER */}
      <div className="bg-white shadow-sm">
        <div className="max-w-[420px] mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Назад
          </button>
        </div>
      </div>

      {/* PROFILE CONTENT */}
      <div className="max-w-[420px] mx-auto px-4 py-6">
        {/* Avatar & Name */}
        <div className="bg-white rounded-[24px] p-6 mb-4 shadow-sm">
          <div className="flex items-center gap-4">
            <AvatarEditor
              photoUrl={displayPhoto}
              onPhotoSelect={handlePhotoSelect}
            />
            <div className="flex-1">
              <h1 style={{ fontSize: "1rem" }} className="font-bold">
                {user.name || "Пользователь"}
              </h1>
              <p className="text-gray-500 text-sm">Клиент</p>
              <button
                onClick={() => setIsEditDialogOpen(true)}
                className="text-sm text-blue-500 hover:text-blue-600 mt-1 flex items-center gap-1"
              >
                <IconPencil size={14} />
                Редактировать
              </button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-[24px] p-4 mb-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Контактная информация</h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <IconPhone size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Телефон</p>
                <p className="font-medium">{user.phone}</p>
              </div>
            </div>

            {user.email && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <IconMail size={20} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Addresses */}
        <AddressesList />

        {/* Actions */}
        <div className="bg-white rounded-[24px] p-4 shadow-sm">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <IconLogout size={20} />
            Выйти
          </Button>
        </div>
      </div>

      {/* Edit Dialog */}
      <EditProfileDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        name={user.name || ""}
        email={user.email || null}
        photoUrl={userPhoto}
        onSuccess={() => {
          refetch();
          setPhotoPreview(null);
        }}
      />
    </div>
  );
}
