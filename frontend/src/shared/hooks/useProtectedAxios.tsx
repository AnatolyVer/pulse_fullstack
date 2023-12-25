import {useDispatch} from "react-redux";
import axios, {AxiosPromise} from "axios";
import Cookies from "js-cookie";

import {clearCurrentUser} from "@redux/userSlice.ts";

const useProtectedAxios = ():[(requestFunction: () => AxiosPromise) => Promise<Error | AxiosPromise | undefined>, () => Promise<void> ] => {
    const dispatch = useDispatch();

    const protectedAxiosRequest = async (requestFunction: () => AxiosPromise): Promise<Error | AxiosPromise | undefined> => {
        try {
            return await requestFunction();
        } catch (e: any) {
            console.log(e)
            switch (e.response.status) {
                case 403:
                    Cookies.set('access-token', e.response.headers['access-token'], {expires: 30})
                    Cookies.set('refresh-token', e.response.headers['refresh-token'], {expires: 40})
                    return protectedAxiosRequest(requestFunction);
                case 401:
                    await logout()
            }
        }
    };

    const logout = async () => {

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
        }).catch((e) => console.error(e))
    }

    return [protectedAxiosRequest, logout];
};

export default useProtectedAxios
