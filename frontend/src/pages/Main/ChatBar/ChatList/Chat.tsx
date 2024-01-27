import dayjs from "dayjs"
import {IPreviewChat} from "@shared/interfaces/IChat.ts";
import CustomAvatar from "@components/CustomAvatar/CustomAvatar.tsx";
import {openChat} from "@redux/chatSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import styles from './styles.module.scss'
import {RootState} from "@redux/store.ts";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import useProtectedAxios from "@shared/hooks/useProtectedAxios.tsx";
import {getChat} from "@api/getChat.ts";

const Chat = ({chat}: {chat:IPreviewChat}) => {

    const dispatch  = useDispatch()
    const [protectedAxiosRequest, ] = useProtectedAxios()

    const {_id} = useSelector((state: RootState) => state.user);

    const isIAuthor = chat.last_message && _id === chat.last_message.author

    const handleClick = async () => {
        try {
            if (chat._id){
                const res = await protectedAxiosRequest(() => getChat(chat._id!));
                dispatch(openChat(res!.data))
            }
            else {
                dispatch(openChat({...chat, messages:[]}))
            }
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <div onClick={handleClick} className={styles.Chat}>
           <div className={styles.Main}>
               <CustomAvatar sx={{width:"60px", height:"60px"}} online={chat.online} src={chat.image} alt={chat.name}/>
               <div className={styles.Data}>
                   <p>{chat.name}</p>
                   <div className={styles.Message}>
                       {chat.last_message && (
                           <>
                               <p>{chat.last_message.text}</p>
                               {isIAuthor && (chat.last_message.read ? (<DoneAllIcon/>) : (chat.last_message.delivered ? (<DoneIcon/>) : (<CloseIcon/>)) )}
                           </>
                       )}
                   </div>
               </div>
           </div>
            <div className={styles.Info}>
                {chat.last_message && (
                   <>
                       <p>{dayjs(chat.last_message.time).format("HH:mm")}</p>
                       <div className={styles.UnreadMessages}>{chat.unread_messages}</div>
                   </>
                )}
            </div>
        </div>

    );
};

export default Chat;