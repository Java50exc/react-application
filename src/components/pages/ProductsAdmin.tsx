import {Typography, Box, Avatar, Alert, Snackbar} from "@mui/material"
import {DataGrid, GridActionsCellItem, GridColDef} from "@mui/x-data-grid"
import {ProductType} from "../../model/ProductType"
import {useSelector} from "react-redux"
import {Delete} from "@mui/icons-material";
import React, {useRef, useState} from "react";
import {productsService} from "../../config/products-service-config";

export const ProductsAdmin: React.FC = () => {
    const products: ProductType[] = useSelector<any, ProductType[]>(state => state.productsState.products);
    const [open, setOpen] = useState<boolean>(false);
    const alertMessage = useRef<string>('');

    const columns: GridColDef[] = [
        {
            field: "image",
            headerName: '',
            flex: 0.3,
            renderCell: (params) => <Avatar src={`images/${params.value}`}
                                            sx={{width: "90%", height: "80px"}}/>,
            align: "center",
            headerAlign: "center"
        },
        {field: "title", headerName: 'Title', flex: 0.8, align: "center", headerAlign: "center"},
        {field: "category", headerName: "Category", flex: 0.5},
        {field: "unit", headerName: "Unit", flex: 0.4},
        {field: "cost", headerName: "Cost (ILS)", flex: 0.3, editable: true, type: "number"},
        {
            field: 'actions', type: 'actions', flex: 0.1, getActions: (params) => [
                <GridActionsCellItem label="remove" icon={<Delete></Delete>}
                                     onClick={async () =>
                                         await productsService.removeProduct(params.id as string)}/>
            ]
        }
    ];

    async function updateCost(newRow: ProductType, oldRow: ProductType): Promise<any> {
        if (newRow.cost > (oldRow.cost + oldRow.cost / 2) || newRow.cost < (oldRow.cost - oldRow.cost / 2)) {
            throw 'Update cannot be greater than on 50% from the existing cost';
        }
        await productsService.setProduct(newRow);
        return newRow;
    }

    return <Box sx={{width: "100vw", display: "flex", justifyContent: "center"}}>
        <Box sx={{width: "80vw", height: "80vh"}}>
            <DataGrid columns={columns} rows={products} getRowHeight={() => 'auto'}
                      processRowUpdate={updateCost} onProcessRowUpdateError={(error) => {
                alertMessage.current = error;
                setOpen(true)
            }}/>
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert severity="error" sx={{width: '30vw', fontSize: '1.5em'}}>
                    {alertMessage.current}
                </Alert>
            </Snackbar>
        </Box>
    </Box>
}