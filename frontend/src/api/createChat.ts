import axios from "axios";
import Cookies from "js-cookie";

export const createChat = async (users_id: Array<string>) => {
    return await axios.post(`${import.meta.env.VITE_RESTAPI_DEV_URL}/chat/create`, users_id, {
        headers: {
            'access-token': Cookies.get("access-token"),
            'refresh-token': Cookies.get("refresh-token"),
        }
    })
}