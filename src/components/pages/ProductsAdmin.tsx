import { Typography, Box, Avatar } from "@mui/material"
import {DataGrid, GridColDef, GridRowHeightParams} from "@mui/x-data-grid"
import { ProductType } from "../../model/ProductType"
import { useSelector } from "react-redux"
export const ProductsAdmin: React.FC = () => {
    const rowHeight: number = 50;
    const products: ProductType[] =
     useSelector<any, ProductType[]>(state => state.productsState.products);
    const columns: GridColDef[] = [
        {field:"image", headerName: 'Image', flex: 0.2,
         renderCell: (params) => <Avatar src={`images/${params.value}`} 
         sx={{width: "100%", height: rowHeight}} variant="rounded"/>, align: "center", headerAlign: "center"},
        {field: "title", headerName: 'Title', flex: 0.8},
        {field: "category", headerName: "Category", flex: 0.5},
        {field: "unit", headerName: "Unit", flex: 0.4},
        {field: "cost", headerName: "Cost (ILS)", flex: 0.3}
    ]
    return <Box sx={{width: "100%",height: "90vh"}}>
        <DataGrid columns={columns} rows={products} getRowHeight={() => rowHeight + 2}/>
    </Box>
}