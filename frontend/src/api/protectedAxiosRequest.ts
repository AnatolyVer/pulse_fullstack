import Cookies from "js-cookie";

export const protectedAxiosRequest = async (requestFunction: Function) => {
    try {
        return await requestFunction();
    } catch (e: any) {
        console.log(e)
        switch (e.response.status) {
            case 403:
                Cookies.set('access-token', e.response.headers['access-token'])
                return protectedAxiosRequest(requestFunction);
            case 401:
                throw new Error(e)
        }
    }
};