import IUser from '@shared/interfaces/IUser.ts';
import {Avatar} from '@mui/material';

import styles from './styles.module.scss'

const ProfileBar = ({ user }: { user: IUser }) => {

    return (
        <div className={`${styles.ProfileBar}`}>
            {user && (
                <>
                    <h2>Profile</h2>
                    <Avatar sx={{ height: '90px', width: '90px' }} src={user.avatar_url} alt={user.nickname.toUpperCase()}/>
                    <p>{user.nickname}</p>
                    <p>{user.username}</p>
                    <p>{user.bio}</p>
                    <h2>Settings</h2>
                    <div>
                        <p>Language</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProfileBar;
