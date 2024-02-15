
import { useDispatch } from "react-redux"
import { authActions } from "../../redux/authSlice"
import { useEffect } from "react";

export const Logout: React.FC = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(authActions.logout());
    }, [])


    return <></>
}