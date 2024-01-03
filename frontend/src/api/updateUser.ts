import axios from "axios";
import Cookies from "js-cookie";
import IUser from "@shared/interfaces/IUser.ts";

export const updateUser = async (user: Partial<IUser>) => {
    return await axios.put(`${import.meta.env.VITE_RESTAPI_DEV_URL}/user/update`, user , {
        headers: {
            'access-token': Cookies.get("access-token"),
            'refresh-token': Cookies.get("refresh-token"),
        }
    })
}