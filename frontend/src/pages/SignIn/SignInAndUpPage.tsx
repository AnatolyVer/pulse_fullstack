import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import {getUser} from "@api/getUser.ts";
import {signUser} from "@api/signUser.ts";

import Logo from "@components/Logo/Logo.tsx";
import Input from "@components/Input/Input.tsx";
import useSnackBar from "@components/SnackBar/useSnackBar.tsx";
import useLoader from "@components/Loader/useLoader.ts";
import useProtectedAxios from "@shared/hooks/useProtectedAxios.tsx";
import {IUserSign} from "@shared/interfaces/IUserSign.ts";
import {setCurrentUser} from "@redux/userSlice.ts";

import {LinkButton} from "./linkButton.tsx";
import {SubmitButton} from "./submitButton.tsx";

import styles from "./styles.module.scss";

const defaultFormData: IUserSign = {
    username: '',
    nickname: '',
    password: '',
    confirm: ''
}
const SignInAndUpPage = ({link}:{link:"sign_up" | "sign_in"}) => {

    const dispatch = useDispatch()
    const nav = useNavigate()
    const [formData, setFormData] = useState(defaultFormData);

    const [openLoader, closeLoader] = useLoader()
    const [openSnackBar,] = useSnackBar()
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
            const userId = (await signUser(link, formData)).data
            const user = (await protectedAxiosRequest(() => getUser(userId)))!.data
            dispatch(setCurrentUser(user))
            nav("/")
        }
        catch (e: any) {
            openSnackBar(e.message)
        }
        finally {
            closeLoader()
        }
    };

    return (
        <div className={styles.FormWrapper}>
            <Logo size='big'/>
            <form onSubmit={handleSubmit}>
                {isSignUpPage && (<>
                    <Input label="Nickname" type="text" value={formData.nickname} onChange={handleInputChange}/> <br/>
                </>)}
                <Input label="Username" type="text" value={formData.username} onChange={handleInputChange}/>
                <br/>
                <Input label="Password" type="password" value={formData.password} onChange={handleInputChange}/>
                <br/>
                {isSignUpPage && (<>
                    <Input label="Confirm" type="password" value={formData.confirm} onChange={handleInputChange}/> <br/>
                </>)}
                {<SubmitButton isSignUpPage={isSignUpPage} />}
            </form>
            {<LinkButton isSignUpPage={isSignUpPage} onClick={() => setFormData(defaultFormData)}/>}
        </div>
    );
};

export default SignInAndUpPage;