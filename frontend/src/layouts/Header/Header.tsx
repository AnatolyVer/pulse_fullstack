import Logo from '../../components/Logo/Logo';
import styles from './styles.module.scss'
import axios from "axios";
import Cookies from "js-cookie";
import {useDispatch} from "react-redux";
import {clearCurrentUser} from "../../redux/userSlice";

const Header = () => {
    const dispatch = useDispatch()

    const handleClick = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_RESTAPI_DEV_URL}/user/log_out`, {
                headers:{
                    'access-token':Cookies.get("access-token"),
                    'refresh-token':Cookies.get("refresh-token")
                }
            })
            Cookies.remove("access-token")
            Cookies.remove("refresh-token")
            localStorage.removeItem("id")
            dispatch(clearCurrentUser())
        } catch (e: any) {
            console.log(e)
        }
    }
    
    return (
        <header className={styles.Header}>
            <div>
                <h1>Pulse</h1>
                <Logo size='small'/>
            </div>
            <button onClick={handleClick}>Log out</button>
        </header>
    );
};

export default Header;