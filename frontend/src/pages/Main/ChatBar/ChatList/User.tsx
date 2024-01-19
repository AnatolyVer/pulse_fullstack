import styles from "@pages/Main/ChatBar/ChatList/styles.module.scss";
import IUser from "@shared/interfaces/IUser.ts";
import Avatar from "@components/CustomAvatar/CustomAvatar.tsx";
import {useDispatch} from "react-redux";
import {openChat} from "@redux/chatSlice.ts";

const User = ({user}:{user:IUser}) => {

    const dispatch = useDispatch()

    return (
        <div onClick={() => dispatch(openChat({user, messages:[], type:'chat', _id:undefined}))} className={styles.Chat}>
            <div className={styles.Main}>
                <Avatar sx={{width:"60px", height:"60px"}} online={user.online} src={user.avatar_url} alt={user.nickname}/>
                <div className={styles.Message}>
                    <p>{user.nickname}</p>
                    <p>{user.username}</p>
                </div>
            </div>
        </div>
    );
};

export default User;