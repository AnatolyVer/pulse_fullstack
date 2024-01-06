import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";

import {updateUser} from "@api/updateUser.ts";
import {getUser} from "@api/getUser.ts";

import Input from '@components/Input/Input';
import Textarea from '@components/Textarea/Textarea';
import {setCurrentUser} from "@redux/userSlice.ts";
import IUser from "@shared/interfaces/IUser.ts";
import useProtectedAxios from "@shared/hooks/useProtectedAxios.tsx";

import styles from './styles.module.scss'
import useSnackBar from "@components/SnackBar/useSnackBar.tsx";
import useLoader from "@components/Loader/useLoader.ts";
import {IAvatarHook} from "@shared/interfaces/IAvatar.ts";
import useAvatarUploading from "@shared/hooks/useAvatarUploading.ts";
import AvatarUploader from "@components/AvatarUploader/AvatarUploader.tsx";


interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    userData: Partial<IUser>
}

const EditProfileModal = ({ isOpen, onClose, userData }:EditProfileModalProps) => {

    const dispatch = useDispatch()

    const [openSnackBar, closeSnackBar] =  useSnackBar()
    const [openLoader, closeLoader] = useLoader()
    const avatar:IAvatarHook = useAvatarUploading(userData.avatar_url)

    const [protectedAxiosRequest,] = useProtectedAxios()

    const [editedData, setEditedData] = useState(userData);


    useEffect(() => {
        setEditedData(userData)
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
        closeSnackBar()
        onClose()
    }

    const handleSave = async () => {
        openLoader()

        const userToSend:Partial<IUser> = {};

        for (let key in editedData) {
            if (userData[key] !== editedData[key]) {
                userToSend[key] = editedData[key];
            }
        }

        try {
            const id = (await protectedAxiosRequest(() => updateUser(userToSend)))!.data
            const user = (await protectedAxiosRequest(() => getUser(id)))!.data
            dispatch(setCurrentUser(user))
            handleClose()
        }catch (e: any){
            openSnackBar(e.message)
        }finally {
            closeLoader()
        }
    };


    return (isOpen && (
        <div className={styles.Modal}>
            <div className={styles.Content}>
                <h2>Edit Profile</h2>
                <div className={styles.User}>
                    <AvatarUploader avatar={avatar}/>
                    <Input label={"Nickname"} value={editedData.nickname!} type={"text"} onChange={handleInputChange}/>
                    <Input label={"Username"} value={editedData.username!} type={"text"} onChange={handleInputChange}/>
                    <Textarea label={"Bio"} value={editedData.bio!} onChange={handleInputChange}/>
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