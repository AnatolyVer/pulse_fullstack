import React, {useState} from 'react';
import {useDispatch} from "react-redux";

import {updateUser} from "@api/updateUser.ts";

import Input from '@components/Input/Input';
import Textarea from '@components/Textarea/Textarea';
import Loader from '@components/Loader';
import {setCurrentUser} from "@redux/userSlice.ts";
import IUser from "@shared/interfaces/IUser.ts";
import useProtectedAxios from "@shared/hooks/useProtectedAxios.tsx";

import {Alert, Avatar, Slide} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

import styles from './styles.module.scss'


interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    userData: Partial<IUser>
}

const EditProfileModal = ({ isOpen, onClose, userData }:EditProfileModalProps) => {

    const dispatch = useDispatch()

    const [protectedAxiosRequest,] = useProtectedAxios()

    const [isLoading, setIsLoading] = useState(false)
    const [editedData, setEditedData] = useState(userData);
    const [snackbarState, setSnackbarState] = React.useState({
        open:false,
        text:""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleClose = () => {
        setEditedData(userData)
        setSnackbarState({open:false, text:""})
        onClose()
    }

    const handleSave = () => {
        setIsLoading(true)
        protectedAxiosRequest(() => updateUser(editedData))
            .then(() => {
                dispatch(setCurrentUser(editedData))
                handleClose()
            })
            .catch((e: Error) => {
                setSnackbarState({open:true, text:e.message})
            })
            .finally(() =>  setIsLoading(false))
    };

    return (isOpen && (
        isLoading ? (
            <Loader/>
            ) : (
            <div className={styles.Modal}>
                <div className={styles.Content}>
                    <h2>Edit Profile</h2>
                    <div className={styles.User}>
                        <Avatar sx={{ height: '70px', width: '70px' }} src={userData.avatar_url}/>
                        <Input label={"Username"} value={editedData.username!} type={"text"} onChange={handleInputChange}/>
                        <Input label={"Nickname"} value={editedData.nickname!} type={"text"} onChange={handleInputChange}/>
                        <Textarea label={"Bio"} value={editedData.bio!} onChange={handleInputChange}/>
                    </div>
                    <div className={styles.Buttons}>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={handleClose}>Close</button>
                    </div>
                </div>

                <Snackbar anchorOrigin={{ vertical:"bottom", horizontal:"center"}}
                          open={snackbarState.open}
                          TransitionComponent={Slide}
                          onClose={() => setSnackbarState({...snackbarState, open:false})}>
                    <Alert onClose={() => setSnackbarState({...snackbarState, open:false})} severity="error" sx={{width: '100%'}}>
                        {snackbarState.text}
                    </Alert>
                </Snackbar>
            </div>
        )
    ))
};

export default EditProfileModal;