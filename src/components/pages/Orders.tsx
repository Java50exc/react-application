import {useSelector} from "react-redux"
import {OrderType} from "../../model/OrderType";
import {Alert, Avatar, Box, Button, Snackbar, Typography} from "@mui/material";
import {DataGrid, GridActionsCellItem, GridColDef, GridRowParams} from "@mui/x-data-grid";
import {ordersService} from "../../config/orders-service-config";
import {Delete, LocalShipping} from "@mui/icons-material";
import React, {useRef, useState} from "react";

type OrderRow = OrderType & { cost: number, amount: number}
export const Orders: React.FC = () => {
    const orders = useSelector<any, OrderType[]>(state => state.ordersState.orders);
    const authUser = useSelector<any, string>(state => state.auth.authUser);
    const alertMessage = useRef('')
    const [isAlerted, setAlert] = useState(false);

    const orderRows: OrderRow[] = orders.map(o => ({
        ...o,
        cost: o.shopping.reduce((acc, cur) => acc + cur.price, 0),
        amount: o.shopping.length
    }));
    const columns: GridColDef[] = [
        {field: 'id', headerName: 'Order ID', flex: 0.2, align: 'center', headerAlign: 'center',},
        {field: 'email', headerName: 'Email', flex: 0.2, align: 'center', headerAlign: 'center'},
        {field: 'amount', headerName: 'Products Amount', align: 'center', flex: 0.1},
        {field: 'cost', headerName: 'Cost(ILS)', flex: 0.08, align: 'center', type: 'number'},
        {field: 'orderDate', headerName: 'Order Date', flex: 0.1, align: 'center', type: 'string'},
        {
            field: 'deliveryDate',
            headerName: 'Delivery Date',
            flex: 0.1,
            align: 'center',
            type: 'string',
            editable: authUser.includes('admin')
        },

    ];
    if (authUser.includes('admin')) {
        columns.push({
            field: 'actions', type: 'actions', headerName: 'Delivery', flex: 0.1,
            getActions: (params: GridRowParams<any>) => [
                <GridActionsCellItem label="delivery" icon={<LocalShipping/>}
                                     onClick={async () => await
                                         ordersService.setDate(params.id as string, new Date()
                                             .toISOString().substring(0, 10))}/>
            ]
        })
    }

    async function updateDate(newRow: OrderRow): Promise<any> {
        if (newRow.deliveryDate > new Date().toISOString() || newRow.deliveryDate < newRow.orderDate) {
            throw 'delivery date must be between order date and today date'
        }
        await ordersService.setDate(newRow.id, newRow.deliveryDate)
        return newRow;
    }


    return <Box
        sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh', alignItems: 'center'}}>
        <Box sx={{height: '60vh', width: '95vw'}}>
            <DataGrid columns={columns} rows={orderRows} getRowHeight={() => 'auto'}
                      processRowUpdate={updateDate} onProcessRowUpdateError={(error) => {
                alertMessage.current = error;
                setAlert(true);
            }}
            />

        </Box>
        <Snackbar open={isAlerted} autoHideDuration={6000} onClose={() => setAlert(false)}>
            <Alert severity="error" sx={{width: '30vw', fontSize: '1.5em'}}>
                {alertMessage.current}
            </Alert>
        </Snackbar>
    </Box>

}