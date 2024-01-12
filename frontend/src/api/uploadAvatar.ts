import axios from "axios";
import Cookies from "js-cookie";

export const uploadAvatar = async (avatar: File) => {

    const formData = new FormData();
    formData.append('image', avatar);

    return await axios.post(`${import.meta.env.VITE_RESTAPI_DEV_URL}/user/set_avatar`, formData , {
        headers: {
            'Content-Type': 'multipart/form-data',
            'access-token': Cookies.get("access-token"),
            'refresh-token': Cookies.get("refresh-token"),
        }
    })
}