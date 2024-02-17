import { Typography, Box, Avatar, Grid } from "@mui/material"
import { DataGrid, GridColDef, GridRowHeightParams } from "@mui/x-data-grid"
import { ProductType } from "../../model/ProductType"
import { useSelector } from "react-redux";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

export const ProductsClient: React.FC = () => {
    const rowHeight: number = 50;
    const products: ProductType[] = useSelector<any, ProductType[]>(state => state.productsState.products);
    const columns: GridColDef[] = [
        {
            field: "image", headerName: 'Image', flex: 0.2,
            renderCell: (params) => <Avatar src={`images/${params.value}`}
                sx={{ width: "100%", height: rowHeight }} variant="rounded" />, align: "center", headerAlign: "center"
        },
        { field: "title", headerName: 'Title', flex: 0.8 },
        { field: "category", headerName: "Category", flex: 0.5 },
        { field: "unit", headerName: "Unit", flex: 0.4 },
        { field: "cost", headerName: "Cost (ILS)", flex: 0.3 }
    ];

    const getCardMedia = (path: string) => <CardMedia component="img" height={200} image={`images/${path}`} />;
    const getCardContent = (title: string, unit: string, cost: number) => {
        return <CardContent>
            <Typography textAlign={"center"} height={50} overflow={"hidden"}>{title}</Typography>
            <Typography textAlign={"center"} height={35} overflow={"hidden"}>{unit}</Typography>
            <Typography textAlign={"center"} height={35} overflow={"hidden"}>{cost}</Typography>
        </CardContent>
    }

    const getCard = (path: string, title: string, unit: string, cost: number) => {
        return <Card>{getCardMedia(path)}{getCardContent(title, unit, cost)}
            <CardActions sx={{ justifyContent: "center" }}>
                <Button size="small">+</Button>
                <Typography>0</Typography>
                <Button size="small">-</Button>
            </CardActions>
        </Card>
    }

    const getList = (products: ProductType[]) => {
        return products.map((p, i) => <Grid item xs={2.8} key={i}>{getCard(p.image, p.title, p.unit, p.cost)}</Grid>)
    }

    return <Grid container justifyContent={"space-evenly"} rowSpacing={2}>{getList(products)}</Grid>;
}