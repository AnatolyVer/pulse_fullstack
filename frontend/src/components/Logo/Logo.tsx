import logo from "../../assets/pulse.png";

import styles from "./styles.module.scss"

interface LogoProps{
    size:"big" | "medium" | "small"
}

const Logo = ({size}:LogoProps) => {

    const sizes = {
        big: styles.big,
        medium: styles.medium,
        small: styles.small,
    }

    return (
        <img src={logo} className={sizes[size]} alt="" />
    );
};

export default Logo;