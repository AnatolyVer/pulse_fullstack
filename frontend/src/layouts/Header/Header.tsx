import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import Logo from '@components/Logo/Logo';
import useProtectedAxios from "@shared/hooks/useProtectedAxios.tsx";

import styles from './styles.module.scss'

const Header = () => {

    const [, logout] = useProtectedAxios()
    const user = useSelector((state: any)  => state.user)
    const nav = useNavigate()

    return (
        <header className={styles.Header}>
            <div>
                <h1>Pulse</h1>
                <Logo size='small'/>
            </div>
            {user && <button onClick={async() => logout().then(() => nav('/') )}>Log out</button>}
        </header>
    );
};

export default Header;