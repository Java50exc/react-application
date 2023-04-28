import { useSelector } from "react-redux"
import { ProductType } from "../../model/ProductType";
import { ShoppingProductType } from "../../model/ShoppingProductType";
import { useMemo} from "react";
import { ordersService } from "../../config/orders-service-config";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import {Avatar, Box, Typography } from "@mui/material";
const columns: GridColDef[] = [
    {field: 'image', headerName: '', flex: 0.5,align: 'center', headerAlign: 'center',
     renderCell: (params) => <Avatar src={`images/${params.value}`} sx={{width: "50%", height: "12vh"}}/>},
     {field: 'title', headerName: 'Title', flex: 1,
      align: 'center', headerAlign: 'center'},
     {field: 'unit', headerName: 'Unit', flex: 0.3},
     {field: 'cost', headerName: 'Cost(ILS)', flex: 0.3},
     {field: 'count', headerName: 'Count',flex: 0.2,
     },
     {field: 'price', headerName: 'Price', flex: 0.3},

]
type ShoppingDataType = ProductType & {count: number, price: number}
export const ShoppingCart: React.FC = () => {
    
    const products = useSelector<any, ProductType[]> (state => state.productsState.products);
    const shopping = useSelector<any, ShoppingProductType[]> 
    (state => state.shoppingState.shopping);
    const authUser = useSelector<any, string>(state => state.auth.authUser);
    const tableData = useMemo(() => getTableData(), [products, shopping]);
    const total = useMemo(() => getTotalCost(), [tableData]);
    function getTotalCost(): number {
        return tableData.reduce((res, cur) => res + cur.price, 0);
    }
    function getTableData(): ShoppingDataType[] {
        const shoppingData: ShoppingDataType[] = shopping.map(s => getShoppingProduct(s))
        return shoppingData.filter(sd => !!sd.id )
    }
    function getShoppingProduct(shoppingProduct: ShoppingProductType): ShoppingDataType {
        const product: ProductType|undefined = products.find
        (p => shoppingProduct.id == p.id);
        let res: ShoppingDataType = {id: "",category: '', cost: 0, count: 0,
         title: '', image: '', price: 0, unit: ''};
         if (!product) {
            ordersService.removeShoppingProduct(authUser, shoppingProduct.id);
         } else {
            res = {...product, count: shoppingProduct.count, price: +(product.cost * shoppingProduct.count).toFixed(2) };
         }
         return res;
      
    }
    return <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh', alignItems:'center'}}>
            <Box sx={{height: '60vh', width: '70vw'}}>
                <DataGrid columns={columns} rows={tableData} getRowHeight={()=>'auto' } />
                
            </Box>
            <Typography variant="h6">Total cost: {total.toFixed(2)}{' '}
            <img src="images/israeli-shekel-icon.svg" width="3%"/></Typography>
            
    </Box>
     
}


