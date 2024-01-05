import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";

import {getUser} from "@api/getUser.ts";
import Loader from "@components/Loader/Loader.tsx";
import Header from '@layouts/Header/Header';
import Main from '@pages/Main/Main';
import SignInAndUpPage from "@pages/SignIn/SignInAndUpPage.tsx";
import {setCurrentUser} from "@redux/userSlice";
import useProtectedAxios from "@shared/hooks/useProtectedAxios.tsx";
import SnackBar from "@components/SnackBar/SnackBar";
import useLoader from "@components/Loader/useLoader.ts";
function App() {

    const dispatch = useDispatch();

    const isLoading = useSelector((state: any)  => state.loader)
    const [openLoader, closeLoader] = useLoader()
    const [protectedAxiosRequest] = useProtectedAxios()

    useEffect( () => {
        const id = localStorage.getItem("id")
        if (id !== null) {
            openLoader()
            protectedAxiosRequest(() => getUser(id))
                .then((res:any) => dispatch(setCurrentUser(res.data)))
                .finally(() =>  closeLoader())
        }
    }, []);

    return (isLoading ? (
            <Loader/>
        ) : (<>
            <Header/>
            <Routes>
                {<Route path="" element={<Main/>}/>}
                <Route path="/sign_in" element={<SignInAndUpPage link={"sign_in"}/>}/>
                <Route path="/sign_up" element={<SignInAndUpPage link={"sign_up"}/>}/>
            </Routes>
            <SnackBar/>
        </>)
  )
}

export default App
