import axios from "axios";
import Cookies from "js-cookie";

export const getChats = async (substring: string) => {
    return await axios.get(`${import.meta.env.VITE_RESTAPI_DEV_URL}/chat/get_all?substr=${substring}`, {
        headers: {
            'access-token': Cookies.get("access-token"),
            'refresh-token': Cookies.get("refresh-token"),
        }
    })
}