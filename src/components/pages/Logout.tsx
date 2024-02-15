import Button from "@mui/material/Button"
import { useDispatch } from "react-redux"
import { authActions } from "../../redux/authSlice"


export const Logout: React.FC = () => {
    const dispatch = useDispatch();

    const logout = () => {

        dispatch(authActions.logout());   
    }

    return <Button onClick={logout} variant="contained" href="/">Logout</Button>
}