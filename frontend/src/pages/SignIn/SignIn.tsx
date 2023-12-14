import React, {useState} from "react";
import axios from "axios";

import Input from '../../components/Input/Input';

import styles from './styles.module.scss'
import {Link, useNavigate} from "react-router-dom";
import {Alert, Slide} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Logo from "../../components/Logo/Logo";

import Cookies from 'js-cookie';
import {setCurrentUser} from "../../redux/userSlice";
import {useDispatch} from "react-redux";

const SignIn = () => {

    const dispatch = useDispatch()

    const nav = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [snackbarState, setSnackbarState] = React.useState({
        open:false,
        text:""
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const res = await axios.post( import.meta.env.VITE_RESTAPI_DEV_URL + '/user/sign_in', formData);
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
                    <Input label="Username" type="text" value={formData.username} onChange={handleInputChange}/>
                    <Input label="Password" type="password" value={formData.password} onChange={handleInputChange}/>
                    <button type="submit">Sign in</button>
                </form>
                <Link to="/sign_up">
                    <h4>No account? Sign up</h4>
                </Link>
            </div>
        </>
    );
};

export default SignIn;