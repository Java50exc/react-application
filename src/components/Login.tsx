import React from "react";
import { Input } from "./Input";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from "../redux/authSlice";

export const Login: React.FC = () => {
    const user = useSelector<any, string>(state => state.auth.authUser);
    const dispatch = useDispatch()

    const submit = (username: string): string => {
        dispatch(authActions.login(username));
        return '';
    }


    return <div>
        <Input submitFn={submit} placeHolder={user || "enter username"} buttonName="login"/>
    </div>
}