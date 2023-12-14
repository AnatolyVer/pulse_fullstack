import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from './layouts/Header/Header';
import Main from './pages/Main/Main';
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignIn/SignUp";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import axios from "axios";
import Loader from "./components/Loader";
import {setCurrentUser} from "./redux/userSlice";
import Cookies from "js-cookie";
function App() {

    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch();

    useEffect( () => {

        const load = async () => {
            const id = localStorage.getItem("id")
            if (id !== null) {
                try {
                    const {data} = await axios.get(`${import.meta.env.VITE_RESTAPI_DEV_URL}/user/${id}`, {
                        headers:{
                            'access-token':Cookies.get("access-token"),
                            'refresh-token':Cookies.get("refresh-token"),
                        }
                    })
                    dispatch(setCurrentUser(data))
                }catch (e: any) {
                    console.error(e)
                }
            }
        }

        load()
        setIsLoading(false)



    }, []);

  return (
      <>
          {isLoading ? (
              <Loader/>
              ) : (<>
                  <Header/>
                  <BrowserRouter>
                      <Routes>
                          {<Route path="" element={<Main/>}/>}
                          <Route path="/sign_in" element={<SignIn/>}/>
                          <Route path="/sign_up" element={<SignUp/>}/>
                      </Routes>
                  </BrowserRouter>
              </>)
          }
      </>
  )
}

export default App
