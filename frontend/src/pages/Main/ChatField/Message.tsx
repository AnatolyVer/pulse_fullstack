import {TMessage} from "@shared/interfaces/TMessage.ts";

import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CloseIcon from '@mui/icons-material/Close';

import styles from "@pages/Main/ChatField/styles.module.scss";
import {useSelector} from "react-redux";
import {RootState} from "@redux/store.ts";
import dayjs from "dayjs";

const Message = ({message}:{message:TMessage}) => {

    const {_id} = useSelector((state: RootState) => state.user);

    const isIAuthor = _id === message.author

    const justifyContent = isIAuthor ? "flex-end" : "flex-start"

    return (
        <div style={{justifyContent}} className={styles.Message}>
           <div className={styles.Data}>
               <p>{message.text}</p>
               <p>{dayjs(message.time).format("HH:mm")}</p>
               {isIAuthor && (message.read ? (<DoneAllIcon/>) : (message.delivered ? (<DoneIcon/>) : (<CloseIcon/>)) )}
           </div>
        </div>
    );
};

export default Message;