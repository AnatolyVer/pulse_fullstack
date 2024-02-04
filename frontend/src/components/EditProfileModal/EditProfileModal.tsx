import React, {useEffect, useState} from 'react';

import {updateUser} from "@api/updateUser.ts";
import {uploadAvatar} from "@api/uploadAvatar.ts";

import Input from '@components/Input/Input';
import Textarea from '@components/Textarea/Textarea';
import IUser from "@shared/interfaces/IUser.ts";
import useProtectedAxios from "@shared/hooks/useProtectedAxios.tsx";

import useSnackBar from "@components/SnackBar/useSnackBar.tsx";
import useLoader from "@components/Loader/useLoader.ts";
import {IAvatarHook} from "@shared/interfaces/IAvatar.ts";
import useAvatarUploading from "@shared/hooks/useAvatarUploading.ts";
import AvatarUploader from "@components/AvatarUploader/AvatarUploader.tsx";

import styles from './styles.module.scss'

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    userData: Partial<IUser>
}

const EditProfileModal = ({ isOpen, onClose, userData }:EditProfileModalProps) => {

    const [editedData, setEditedData] = useState(userData);

    const [openSnackBar, closeSnackBar] =  useSnackBar()
    const [openLoader, closeLoader] = useLoader()
    const [protectedAxiosRequest,] = useProtectedAxios()

    const avatar:IAvatarHook = useAvatarUploading()

    useEffect(() => {
        setEditedData(userData)
        avatar.initialize(userData.avatar_url!)
    }, [userData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleClose = () => {
        setEditedData(userData)
        avatar.setDefaultImage()
        closeSnackBar()
        onClose()
    }

    const handleSave = async () => {
        openLoader()
        try {
            const userToSend: Partial<IUser> = {};
            for (let key in editedData) {
                if (userData[key] !== editedData[key]) {
                    userToSend[key] = editedData[key];
                }
            }

            if (avatar.avatar.fileToUpload != null) {
                userToSend.avatar_url = (await protectedAxiosRequest(() => uploadAvatar(avatar.avatar.fileToUpload!)))!.data
            }

            if (Object.keys(userToSend).length === 0) {
                return;
            }

            await protectedAxiosRequest(() => updateUser(userToSend));

            setTimeout(() => {
                window.location.reload();
            }, 700);
        } catch (e: any) {
            openSnackBar(e.message);
        } finally {
            closeLoader();
        }
    };

    return (isOpen && (
        <div className={styles.Modal}>
            <div className={styles.Content}>
                <h2>Edit Profile</h2>
                <div className={styles.User}>
                    <AvatarUploader avatar={avatar} alt={userData.nickname!}/>
                    <Input label={"Nickname"} value={editedData.nickname!} type={"text"} onChange={handleInputChange}/>
                    <Input label={"Username"} value={editedData.username!} type={"text"} onChange={handleInputChange}/>
                    <Textarea label={"Bio"} value={editedData.bio!} max={64} onChange={handleInputChange}/>
                </div>
                <div className={styles.Buttons}>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
    ))
};

export default EditProfileModal;