import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { counterActions } from "../redux/counterSlice";
type Props = {
    operand: number,
    canReset?: boolean;
}
export const CounterUpdater: React.FC<Props> = ({ operand, canReset }) => {
    const user = useSelector<any, string>(state => state.auth.authUser);
    const dispatch = useDispatch();
    return <div>
        <button onClick={() => dispatch(counterActions.increment(operand))}>
            Increment</button>
        <button onClick={() => dispatch(counterActions.decrement(operand))}>
            Decrement</button>
        {canReset && <button onClick={() => dispatch(counterActions.reset())}>
            Reset</button>}

    </div>
}