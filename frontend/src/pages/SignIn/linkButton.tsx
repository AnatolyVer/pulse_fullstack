import {Link} from "react-router-dom";

interface LinkButtonProps {
    isSignUpPage: boolean,
    onClick: () => void
}

export const LinkButton = ({isSignUpPage, onClick}:LinkButtonProps) => {
    return (
        isSignUpPage ? (
            <Link to="/sign_in" onClick={onClick}>
                <h4>Has account? Sign in</h4>
            </Link>
        ) : (
            <Link to="/sign_up" onClick={onClick}>
                <h4>No account? Sign up</h4>
            </Link>
        )
    );
};

