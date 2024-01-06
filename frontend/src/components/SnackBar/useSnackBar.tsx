import {useDispatch} from "react-redux";
import { openSnackbar } from "@redux/snackbarSlice";

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