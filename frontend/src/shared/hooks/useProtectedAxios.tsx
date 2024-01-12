import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import axios, {AxiosPromise} from "axios";
import Cookies from "js-cookie";

import {clearCurrentUser} from "@redux/userSlice.ts";
import useLoader from "@components/Loader/useLoader.ts";

const useProtectedAxios = ():[(requestFunction: () => AxiosPromise) => Promise<AxiosPromise | undefined>, () => Promise<void> ] => {
    const dispatch = useDispatch();
    const nav = useNavigate()

    const [openLoader, closeLoader] = useLoader()
    const protectedAxiosRequest = async (requestFunction: () => AxiosPromise): Promise<AxiosPromise | undefined> => {
        try {
            return await requestFunction();
        } catch (e: any) {
            switch (e.response.status) {
                case 403:
                    Cookies.set('access-token', e.response.headers['access-token'], {expires: 30})
                    Cookies.set('refresh-token', e.response.headers['refresh-token'], {expires: 40})
                    return protectedAxiosRequest(requestFunction);
                case 401:
                    await logout()
                    break
                default:
                    throw new Error(e.response.data)
            }
        }
    };

    const logout = async () => {
        openLoader()
        axios.post(`${import.meta.env.VITE_RESTAPI_DEV_URL}/user/logout`, {},{
            headers:{
                'access-token':Cookies.get("access-token"),
                'refresh-token':Cookies.get("refresh-token"),
            }
        }).then(() => {
            Cookies.remove('access-token')
            Cookies.remove('refresh-token')
            localStorage.removeItem("id")
            dispatch(clearCurrentUser())
            nav("/sign_in")
        }).catch((e) => console.error(e))
            .finally(() => closeLoader())
    }

    return [protectedAxiosRequest, logout];
};

export default useProtectedAxios
