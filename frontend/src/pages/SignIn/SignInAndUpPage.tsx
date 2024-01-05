import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";


import {getUser} from "@api/getUser.ts";
import Logo from "@components/Logo/Logo.tsx";
import Input from "@components/Input/Input.tsx";
import useProtectedAxios from "@shared/hooks/useProtectedAxios.tsx";
import {IUserSign} from "@shared/interfaces/IUserSign.ts";
import useSnackBar from "@components/SnackBar/useSnackBar.tsx";
import {clearCurrentUser, setCurrentUser} from "@redux/userSlice.ts";

import {LinkButton} from "./linkButton.tsx";
import {SubmitButton} from "./submitButton.tsx";

import styles from "./styles.module.scss";
import useLoader from "@components/Loader/useLoader.ts";


const defaultFormData: IUserSign = {
    username: '',
    nickname: '',
    password: '',
    confirm: ''
}
const SignInAndUpPage = ({link}:{link:"sign_up" | "sign_in"}) => {

    const [formData, setFormData] = useState(defaultFormData);

    const [openLoader, closeLoader] = useLoader()

    const [openSnackBar,] = useSnackBar()
    const dispatch = useDispatch()
    const nav = useNavigate()

    const [protectedAxiosRequest] = useProtectedAxios()

    const isSignUpPage = link === "sign_up"

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            openLoader()
            const res = await axios.post(  `${import.meta.env.VITE_RESTAPI_DEV_URL}/user/${link}`, formData);
            localStorage.setItem("id", res.data)
            Cookies.set('access-token', res.headers['access-token'], { expires: 30 })
            Cookies.set('refresh-token', res.headers['refresh-token'], { expires: 40 })
            protectedAxiosRequest(() => getUser(res.data))
                .then((res:any) => dispatch(setCurrentUser(res.data)))
                .catch(() => dispatch(clearCurrentUser()))
                .finally(() => {
                    nav("/")
                })
        }
        catch (error: any) {
            openSnackBar(error.response.data)
        }
        finally {
            closeLoader()
        }
    };

    return (
        <div className={styles.FormWrapper}>
            <Logo size='big'/>
            <form onSubmit={handleSubmit}>
                {isSignUpPage && <Input label="Nickname" type="text" value={formData.nickname} onChange={handleInputChange}/> }
                <Input label="Username" type="text" value={formData.username} onChange={handleInputChange}/>
                <Input label="Password" type="password" value={formData.password} onChange={handleInputChange}/>
                {isSignUpPage && <Input label="Confirm" type="password" value={formData.confirm} onChange={handleInputChange}/>}
                {<SubmitButton isSignUpPage={isSignUpPage} />}
            </form>
            {<LinkButton isSignUpPage={isSignUpPage} onClick={() => setFormData(defaultFormData)}/>}
        </div>
    );
};

export default SignInAndUpPage;