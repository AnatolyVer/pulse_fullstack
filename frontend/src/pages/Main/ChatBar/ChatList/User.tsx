import styles from "@pages/Main/ChatBar/ChatList/styles.module.scss";
import {Avatar} from "@mui/material";
import IUser from "@shared/interfaces/IUser.ts";

const User = ({user}:{user:Partial<IUser>}) => {
    return (
        <div className={styles.Chat}>
            <div className={styles.Main}>
                <Avatar sx={{width:"60px", height:"60px"}} alt={"A"}/>
                <div className={styles.Message}>
                    <p>{user!.nickname}</p>
                    <p>{user!.username}</p>
                </div>
            </div>
        </div>
    );
};

export default User;