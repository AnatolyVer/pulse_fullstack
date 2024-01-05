import {useDispatch, useSelector} from "react-redux";

import {closeSnackbar} from "@redux/snackbarSlice.ts";

import {Alert, Slide} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

const SnackBar = () => {

    const {open, text} = useSelector((state: any)  => state.snackbar)

    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(closeSnackbar())
    }

    return (
        <Snackbar anchorOrigin={{ vertical:"bottom", horizontal:"center"}}
                  open={open}
                  TransitionComponent={Slide}
                  onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {text}
            </Alert>
        </Snackbar>
    );
};

export default SnackBar;