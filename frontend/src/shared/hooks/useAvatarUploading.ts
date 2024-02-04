import {useState} from 'react';
import {AvatarState} from "@shared/interfaces/IAvatar.ts";

const UseAvatarUploading = (image?: string) => {
    const [defaultImage, setDefaultImg ] = useState(image || '')

    const [fileToUpload, setFileToUpload] = useState<File | null>()
    const [photoToEdit, setPhotoToEdit] = useState<string | ArrayBuffer>()
    const [previewPhoto, setPreviewPhoto] = useState<string>(image || '')
    const [lastAvatar, setLastAvatar] = useState<File | null>()

    const avatar:AvatarState = {
        fileToUpload,
        photoToEdit,
        previewPhoto,
        lastAvatar
    }

    const initialize = (image: string) => {
        setDefaultImg(image)
        setPreviewPhoto(image)
    }

    const uploadImage = (file:File, photo:string | ArrayBuffer) => {
        setLastAvatar(fileToUpload)
        setFileToUpload(file)
        setPhotoToEdit(photo)
    }

    const setDefaultImage = () => {
        setFileToUpload(null)
        setPreviewPhoto(defaultImage)
        setPhotoToEdit(undefined)
    }

    const cancelEditing = () => {
        setFileToUpload(lastAvatar)
    }

    const confirmEditing = (file:File, photo:string) => {
        setFileToUpload(file);
        setLastAvatar(file)
        setPreviewPhoto(photo);
    }

    return {avatar, uploadImage, setDefaultImage, cancelEditing, confirmEditing, initialize}
};

export default UseAvatarUploading;