import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from './layouts/Header/Header';
import Main from './pages/Main/Main';
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignIn/SignUp";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import Loader from "./components/Loader";
import {getUser} from "./api/getUser";
import {protectedAxiosRequest} from "./api/protectedAxiosRequest";
function App() {

    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();

    useEffect( () => {
        const id = localStorage.getItem("id")
        if (id !== null) {
            setIsLoading(true)
            protectedAxiosRequest(() => getUser(id))
                .then((res: any) => console.log(res))
                .finally(() =>  setIsLoading(false))
        }
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
