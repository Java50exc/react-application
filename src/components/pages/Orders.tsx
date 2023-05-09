import { useSelector } from "react-redux"
import { OrderType } from "../../model/OrderType";
import { Box, Typography } from "@mui/material";

export const Orders: React.FC = () => {
    const orders = useSelector<any, OrderType[]>(state => state.ordersState.orders);
    return <Box>
        {orders.map((o,i) => <Typography key={i}>{JSON.stringify(o)}</Typography>)}
    </Box>
}