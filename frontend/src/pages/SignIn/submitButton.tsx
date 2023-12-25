interface SubmitButtonProps{
    isSignUpPage: boolean
}

export const SubmitButton = ({isSignUpPage}:SubmitButtonProps) => {
    return (
        isSignUpPage ? (
            <button type="submit">Sign up</button>
        ) : (
            <button type="submit">Sign in</button>
        )
    );
};

