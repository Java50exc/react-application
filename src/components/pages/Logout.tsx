import Button from "@mui/material/Button"
import { useDispatch } from "react-redux"
import { authActions } from "../../redux/authSlice"

export const Logout: React.FC = () => {
    const dispatch = useDispatch();
    dispatch(authActions.logout());

    return <></>
}