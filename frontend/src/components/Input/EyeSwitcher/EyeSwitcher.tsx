import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import styles from "./styles.module.scss"

interface EyeSwitcherProps{
    visible:boolean
    onClick:() => void
}

const EyeSwitcher = ({visible, onClick}:EyeSwitcherProps) => {

    return (
        <div className={styles.EyeSwitcher} onClick={onClick}>
            {visible ? (<VisibilityIcon/>) : (<VisibilityOffIcon/>)}
        </div>
    );
};

export default EyeSwitcher;