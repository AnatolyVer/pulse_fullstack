import axios from "axios";
import Cookies from "js-cookie";
import {TMessage} from "@shared/interfaces/TMessage.ts";

export const sendMessage = async (message: TMessage, _id: string) => {
    return await axios.post(`${import.meta.env.VITE_RESTAPI_DEV_URL}/chat/send?_id=${_id}`, message, {
        headers: {
            'access-token': Cookies.get("access-token"),
            'refresh-token': Cookies.get("refresh-token"),
        }
    })
}