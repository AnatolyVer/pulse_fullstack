import {useSelector} from "react-redux";

import Logo from '@components/Logo/Logo';
import useProtectedAxios from "@shared/hooks/useProtectedAxios.tsx";
import useWebSocket from "@shared/hooks/useWebSocket.ts";

import styles from './styles.module.scss'
import {useEffect} from "react";

const Header = () => {

    const [, logout] = useProtectedAxios()
    const user = useSelector((state: any)  => state.user)

    const socket = useWebSocket()

    useEffect(() => {
        if (Object.keys(user).length) socket.connect(user._id)
        else socket.close()
    }, [user]);

    const handleLogout =  async () => {
       await logout()
    }

    return (
        <header className={styles.Header}>
            <div>
                <h1>Pulse</h1>
                <Logo size='small'/>
            </div>
            {user && <button onClick={handleLogout}>Log out</button>}
        </header>
    );
};

export default Header;