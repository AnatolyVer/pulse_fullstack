import axios from "axios";
import Cookies from "js-cookie";

export const getChat = async (id: string) => {
    return await axios.get(`${import.meta.env.VITE_RESTAPI_DEV_URL}/chat/${id}`, {
        headers: {
            'access-token': Cookies.get("access-token"),
            'refresh-token': Cookies.get("refresh-token"),
        }
    })
}