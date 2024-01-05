import { openSnackbar } from "@redux/snackbarSlice";
import {useDispatch} from "react-redux";

const UseSnackBar = ():[(text: string) => void, () => void] => {

    const dispatch = useDispatch()

    const openSnackBar = (text:string) =>{
        dispatch(openSnackbar({open: true, text}))
    }

    const closeSnackBar = () =>{
        dispatch(openSnackbar({open: false, text:null}))
    }

    return [openSnackBar, closeSnackBar]
};

export default UseSnackBar;