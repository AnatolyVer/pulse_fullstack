import {useState} from "react";

import EditProfileModal from "@components/EditProfileModal/EditProfileModal.tsx";
import IUser from '@shared/interfaces/IUser.ts';

import styles from './styles.module.scss'
import Avatar from "@components/CustomAvatar/CustomAvatar.tsx";

const ProfileBar = ({ user }: { user: IUser }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className={`${styles.ProfileBar}`}>
                {user && (
                    <>
                        <h2>Profile</h2>
                        <Avatar sx={{ width: "90px", height: "90px" }} src={user.avatar_url} alt={user.nickname}/>
                        <p>{user.nickname}</p>
                        <p>@{user.username}</p>
                        <p>{user.bio}</p>
                        <div className={styles.Settings}>
                            <h2>Settings</h2>
                            <button>Language</button>
                            <button onClick={() =>  setIsModalOpen(true)}>Edit profile</button>
                        </div>
                    </>
                )}
            </div>
            {user && (
                <EditProfileModal isOpen={isModalOpen}
                                  userData={user}
                                  onClose={() => setIsModalOpen(false)}/>
            )}
        </>
    );
};

export default ProfileBar;
