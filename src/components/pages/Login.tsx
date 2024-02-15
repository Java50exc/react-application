import { useDispatch } from "react-redux";
import { LoginForm } from "../forms/LoginForm";
import { LoginData } from "../../model/LoginData";
import { authActions } from "../../redux/authSlice";


export const Login:React.FC = () => {

    const dispatch = useDispatch();

    const handleSubmit = (loginData: LoginData): string  => {
        try {
            dispatch(authActions.login({user: loginData.email, password: loginData.password}));
        } catch (e) {
            return "Wrong password"
        }
        return "";
        
    }

    return <LoginForm submitFn={handleSubmit} />
}