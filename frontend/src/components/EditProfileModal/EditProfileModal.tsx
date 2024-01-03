import React, {useState} from 'react';

import IUser from "@shared/interfaces/IUser.ts";

import styles from './styles.module.scss'
import {Alert, Avatar, Slide} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import {useDispatch} from "react-redux";
import {setCurrentUser} from "@redux/userSlice.ts";

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    userData: Partial<IUser>
}

const EditProfileModal = ({ isOpen, onClose, userData }:EditProfileModalProps) => {

    const dispatch = useDispatch()

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

    const handleSave = () => {
        dispatch(setCurrentUser(editedData))
        onClose();
    };

    return (isOpen && (
        <div className={styles.Modal}>
            <div className={styles.Content}>
                <h2>Edit Profile</h2>
                <Avatar sx={{ height: '70px', width: '70px' }} src={userData.avatar_url}/>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={editedData.username}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Nickname:
                    <input
                        type="text"
                        name="nickname"
                        value={editedData.nickname}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Bio:
                    <textarea name="bio" value={editedData.bio} onChange={handleInputChange} />
                </label>
                <div>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={onClose}>Close</button>
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
    ))
};

export default EditProfileModal;