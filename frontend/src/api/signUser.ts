import axios from "axios";
import Cookies from "js-cookie";
import {IUserSign} from "@shared/interfaces/IUserSign.ts";

export const signUser = async (link: string, formData: IUserSign) => {
    try {
        const res = await axios.post(  `${import.meta.env.VITE_RESTAPI_DEV_URL}/user/${link}`, formData);
        localStorage.setItem("id", res.data)
        Cookies.set('access-token', res.headers['access-token'], { expires: 30 })
        Cookies.set('refresh-token', res.headers['refresh-token'], { expires: 40 })
        return res
    }catch (e:any) {
        throw new Error(e.response.data)
    }
}