import React from "react";
import { useDispatch } from 'react-redux';
import { authActions } from "../redux/authSlice";

export const Logout: React.FC = () => {
    const dispatch = useDispatch();

    return <div>
        <button onClick={() => dispatch(authActions.logout())}>logout</button>
    </div>
}