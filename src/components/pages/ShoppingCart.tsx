import { useMemo } from "react";
import { ProductType } from "../../model/ProductType"
import { ShoppingProductType } from "../../model/ShoppingProductType";
import { useSelector } from "react-redux";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Avatar, Box, Typography } from "@mui/material";

type ShoppingProductDataType = ProductType & { count: number, totalPrice: number };

export const ShoppingCart: React.FC = () => {
    const products = useSelector<any, ProductType[]>(state => state.productsState.products);
    const shopping = useSelector<any, ShoppingProductType[]>(state => state.shoppingState.shopping);
    const tableData = useMemo(() => getTableData(), [products, shopping]);

    const columns: GridColDef[] = [
        {
            field: "image", headerName: '', flex: 0.3,
            renderCell: (params) => <Avatar src={`images/${params.value}`}
                sx={{ width: "90%", height: "80px" }} />, align: "center", headerAlign: "center"
        },
        { field: "title", headerName: 'Title', flex: 0.8, align: "center", headerAlign: "center" },
        { field: "unit", headerName: 'Unit', flex: 0.8, align: "center", headerAlign: "center" },
        { field: "cost", headerName: "Cost (ILS)", flex: 0.3 },
        { field: "count", headerName: "Count", flex: 0.3 },
        { field: "totalPrice", headerName: 'Total price', flex: 0.8, align: "center", headerAlign: "center" },
    ];

    function getTableData(): (ShoppingProductDataType | undefined)[] {
        return shopping!.map(sItem => {
            const product: ProductType | undefined = products.find(pItem => pItem.id === sItem.id);

            if (product) {
                return {
                    ...product,
                    ...sItem,
                    totalPrice: product!.cost * sItem.count
                };
            }
        }).filter(Boolean);
    }

    function getTotal(): string {
        return tableData.reduce((acc, cur) => acc + cur!.totalPrice, 0).toFixed(2);
    }



    return <Box sx={{ width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box sx={{ width: "80vw", height: "80vh" }}>
            <DataGrid columns={columns} rows={tableData} getRowHeight={() => 'auto'} hideFooter />
            <Typography sx={{ width: '75vw', textAlign: "end" }}>Total: {getTotal()} ILS</Typography>

        </Box>
    </Box>

}