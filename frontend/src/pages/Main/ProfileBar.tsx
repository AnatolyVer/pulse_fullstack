import { useState } from 'react';
import IUser from '../../shared/interfaces/IUser.ts';
import {Avatar} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import styles from './styles.module.scss'

const ProfileBar = ({ user }: { user: IUser }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className={`${styles.ProfileBar} ${isVisible ? styles.visible : styles.hidden}`}>
            <ArrowForwardIcon onClick={() => setIsVisible(true)}/>
                <Avatar sx={{ height: '90px', width: '90px' }} src={user.avatar_url} alt={user.nickname.toUpperCase()}/>
                <p>Username: {user.username}</p>
                <p>Nickname: {user.nickname}</p>
                <p>Bio: {user.bio}</p>
        </div>
    );
};

export default ProfileBar;
