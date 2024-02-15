import { useSelector, useDispatch } from "react-redux";
import { UserAccount } from "../../model/UserAccount";
import { LoginForm } from "../forms/LoginForm";
import { LoginData } from "../../model/LoginData";
import { authActions } from "../../redux/authSlice";


export const Login:React.FC = () => {

    const dispatch = useDispatch();

    const handleSubmit = (loginData: LoginData): void  => {
        dispatch(authActions.login({user: loginData.email, password: loginData.password}));
    }




    return <LoginForm submitFn={handleSubmit} />
}