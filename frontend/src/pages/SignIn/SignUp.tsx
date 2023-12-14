import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import axios from "axios";

import Input from '../../components/Input/Input';

import styles from './styles.module.scss'
import Snackbar from "@mui/material/Snackbar";
import {Alert, Slide} from "@mui/material";
import Logo from "../../components/Logo/Logo";
import Cookies from "js-cookie";
import {setCurrentUser} from "../../redux/userSlice";
import {useDispatch} from "react-redux";

const SignUp = () => {

    const dispatch = useDispatch()
    const nav = useNavigate()

    const [snackbarState, setSnackbarState] = React.useState({
        open:false,
        text:""
    });

    const [formData, setFormData] = useState({
        username: '',
        nickname: '',
        password: '',
        confirm: ''
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const res = await axios.post( import.meta.env.VITE_RESTAPI_DEV_URL + '/user/sign_up', formData);
            console.log(res)
            localStorage.setItem("id", res.data)
            Cookies.set('access-token', res.headers['access-token'])
            Cookies.set('refresh-token', res.headers['refresh-token'])
            const {data} = await axios.get(`${import.meta.env.VITE_RESTAPI_DEV_URL}/user/${res.data}`, {
                headers:{
                    'access-token':Cookies.get("access-token"),
                    'refresh-token':Cookies.get("refresh-token"),
                }
            })
            dispatch(setCurrentUser(data))
            nav("/")
        } catch (error: any) {
            console.error(error)
            setSnackbarState({open:true, text: error.response.data})
        }
    };

    return (
        <>
            <Snackbar anchorOrigin={{ vertical:"bottom", horizontal:"center"}}
                      open={snackbarState.open}
                      TransitionComponent={Slide}
                      onClose={() => setSnackbarState({...snackbarState, open:false})}>
                <Alert onClose={() => setSnackbarState({...snackbarState, open:false})} severity="error" sx={{width: '100%' }}>
                    {snackbarState.text}
                </Alert>
            </Snackbar>
            <div className={styles.FormWrapper}>
                <Logo size='big'/>
                <form onSubmit={handleSubmit}>
                    <Input label="Nickname" type="text" value={formData.nickname} onChange={handleInputChange}/>
                    <Input label="Username" type="text" value={formData.username} onChange={handleInputChange}/>
                    <Input label="Password" type="password" value={formData.password} onChange={handleInputChange}/>
                    <Input label="Confirm" type="password" value={formData.confirm} onChange={handleInputChange}/>
                    <button type="submit">Sign up</button>
                </form>
                <Link to="/sign_in">
                    <h4>Has account? Sign in</h4>
                </Link>
            </div>
        </>
    );
};

export default SignUp;