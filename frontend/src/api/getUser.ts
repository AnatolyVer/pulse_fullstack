import axios from "axios";
import Cookies from "js-cookie";

export const getUser = async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_RESTAPI_DEV_URL}/user/${id}`, {
        headers:{
            'access-token':Cookies.get("access-token"),
            'refresh-token':Cookies.get("refresh-token"),
        }
    })
    return res
}