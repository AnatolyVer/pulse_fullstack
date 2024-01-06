export interface AvatarState {
    fileToUpload: File | null |undefined;
    photoToEdit: string | ArrayBuffer | undefined;
    previewPhoto: string | undefined;
    lastAvatar: File | null | undefined;
}

export interface IAvatarHook{
    avatar: AvatarState;
    uploadImage: (file: File, photo: string | ArrayBuffer) => void;
    setDefaultImage: () => void;
    cancelEditing: () => void;
    confirmEditing: (file: File, photo: string) => void;
}