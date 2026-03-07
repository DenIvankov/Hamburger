export interface AvatarEditorProps {
  photoUrl?: string | null;
  onPhotoSelect: (file: File) => void;
}

export interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  email?: string | null;
  photoUrl?: string | null;
  onSuccess: () => void;
}
