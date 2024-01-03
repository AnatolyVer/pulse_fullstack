import {useState} from "react";

import EditProfileModal from "@components/EditProfileModal/EditProfileModal.tsx";
import IUser from '@shared/interfaces/IUser.ts';

import {Avatar} from '@mui/material';

import styles from './styles.module.scss'

const ProfileBar = ({ user }: { user: IUser }) => {


    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className={`${styles.ProfileBar}`}>
                {user && (
                    <>
                        <h2>Profile</h2>
                        <Avatar sx={{ height: '90px', width: '90px' }} src={user.avatar_url} alt={user.nickname.toUpperCase()}/>
                        <p>{user.nickname}</p>
                        <p>{user.username}</p>
                        <p>{user.bio}</p>
                        <div className={styles.Settings}>
                            <h2>Settings</h2>
                            <button>Language</button>
                            <button onClick={() =>  setIsModalOpen(true)}>Edit profile</button>
                        </div>
                    </>
                )}
            </div>
            <EditProfileModal isOpen={isModalOpen}
                              userData={user}
                              onClose={() => setIsModalOpen(false)}/>
        </>
    );
};

export default ProfileBar;
