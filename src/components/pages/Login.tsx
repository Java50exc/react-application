import { LoginForm } from "../forms/LoginForm";
import {useDispatch, useSelector} from "react-redux";
import { authActions } from "../../redux/authSlice";
import { LoginData } from "../../model/LoginData";
import { AUTH_USER_ITEM, authService } from "../../config/auth-service-config";
import { codeActions } from "../../redux/codeSlice";
import { useEffect } from "react";
import { GoogleAuthProvider, getRedirectResult } from "firebase/auth";

const STATUS_OK = 'OK';
const STATUS_WRONG = 'Wrong Credentials';

export const Login: React.FC = () => {
    const dispatch = useDispatch();


    //------------ redirect oAuth experiments
    // const getRedirect = async () => {
    //     try {
    //         console.log(1);
    //         const result = await getRedirectResult(authService.auth);
    //         const credential = GoogleAuthProvider.credentialFromResult(result!);
    //         const token = credential!.accessToken;
    //         const user = result!.user;
            
    //         console.log("result:" + result);
    //         console.log("credential:" + credential);
    //         console.log("token:" + token);
    //         console.log("user:" + user);
    //         console.log(user.email)
    //     } catch (e) {
    //         console.log("fail");
    //     }
    // }

    // useEffect(() => {
    //     getRedirect();
       
    // }, [])

    
    



    async function loginFn(loginData: LoginData) {
        try {
            const email:string = await authService.login(loginData);
            localStorage.setItem(AUTH_USER_ITEM, email);
            dispatch(authActions.login(email));
            dispatch(codeActions.set(STATUS_OK));
        } catch (error) {
            dispatch(codeActions.set(STATUS_WRONG));
        }
            
    }

    return <LoginForm submitFn = {loginFn}/>
}