import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Route, Routes} from "react-router-dom";

import {getUser} from "@api/getUser.ts";
import Loader from "@components/Loader";
import Header from '@layouts/Header/Header';
import Main from '@pages/Main/Main';
import SignInAndUpPage from "@pages/SignIn/SignInAndUpPage.tsx";
import {setCurrentUser} from "@redux/userSlice";
import useProtectedAxios from "@shared/hooks/useProtectedAxios.tsx";
function App() {

    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    const [protectedAxiosRequest] = useProtectedAxios()

    useEffect( () => {
        const id = localStorage.getItem("id")
        if (id !== null) {
            setIsLoading(true)
            protectedAxiosRequest(() => getUser(id))
                .then((res:any) => dispatch(setCurrentUser(res.data)))
                .finally(() =>  setIsLoading(false))
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
        </>)
  )
}

export default App
