import {useDispatch} from "react-redux";
import {hideLoader, showLoader} from "@redux/loaderSlice.ts";

const UseLoader = () => {

    const dispatch = useDispatch()

    const openLoader = () => {
        dispatch(showLoader())

    }
    const closeLoader = () => {
        dispatch(hideLoader())
    }

    return [openLoader, closeLoader]
};

export default UseLoader;