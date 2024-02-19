import {
    Avatar, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextField
} from "@mui/material";
import {ProductType} from "../../model/ProductType"
import {useState, useRef} from "react";
import {useSelector} from "react-redux";
import productParametersConfig from '../../config/product-parameters-config.json'

type Props = {
    submitFn: (product: ProductType) => string
}
const initialProduct: ProductType = {
    category: '', image: '', cost: productParametersConfig.minCost, title: '', unit: ''
};
export const ProductForm: React.FC<Props> = ({submitFn}) => {
    const [product, setProduct] = useState<ProductType>(initialProduct);
    const [isAlerted, setAlert] = useState<boolean>(false);
    const image = useRef<string>('');
    const categories: string[] = useSelector<any, string[]>(state => state.categoriesState.categories);
    const alertMessage = useRef<string>('');
    const minCost = productParametersConfig.minCost;
    const maxCost = productParametersConfig.maxCost;

    function onSubmitFn(event: any) {
        event.preventDefault(); //canceling default form submit
        alertMessage.current = submitFn(product);
        if (!alertMessage.current) {
            // document.querySelector("form")!.reset();
        } else {
            setAlert(true);
        }
    }

    function imageHandler(event: any) {
        const urlImage = event.target.value;
        image.current = urlImage;
        setProduct({...product, image: urlImage});
    }

    function titleHandler(event: any) {
        const title = event.target.value;
        setProduct({...product, title});
    }

    const categoryHandler = (event: SelectChangeEvent) => {
        const category = event.target.value;
        setProduct({...product, category});
    };

    const unitHandler = (event: SelectChangeEvent) => {
        const unit = event.target.value;
        setProduct({...product, unit});
    };

    const costHandler = (event: any) => {
        const cost = event.target.value;
        setProduct({...product, cost});
    };

    const getCategoryMenuItems = () => categories.map((c: string, i: number) =>
        <MenuItem value={c} key={i}>{c}</MenuItem>);

    const getUnitMenuItems = () => productParametersConfig.units.map((c, i) =>
        <MenuItem value={c} key={i}>{c}</MenuItem>);

    const resetForm = () => {
        setProduct(initialProduct);
        document.querySelector("form")!.reset();
    }


    return <Box>
        <form onSubmit={onSubmitFn}>
            <Grid container item xs={12}>
                <Grid container item xs={8} spacing={3} justifyContent={'flex-start'} padding={2}>
                    <Grid item xs={12}>
                        <TextField label='URL image' required fullWidth value={product.image} onChange={imageHandler}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label='Title' required fullWidth value={product.title} onChange={titleHandler}/>
                    </Grid>
                    <Grid container item xs={12} justifyContent={"space-between"}>
                        <Grid item xs={3}>
                            <FormControl variant="standard" fullWidth required={true}>
                                <InputLabel>Category</InputLabel>
                                <Select value={product.category} onChange={categoryHandler} label="Category">
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {getCategoryMenuItems()}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={3}>
                            <FormControl variant="standard" fullWidth required={true}>
                                <InputLabel>Unit</InputLabel>
                                <Select value={product.unit} onChange={unitHandler} label="Unit">
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {getUnitMenuItems()}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <TextField label="cost" required fullWidth type="number" onChange={costHandler}
                                       value={product.cost} helperText={`enter cost in range [${minCost}-${maxCost}]`}
                                       inputProps={{min: `${minCost}`, max: `${maxCost}`}}/>
                        </Grid>
                    </Grid>
                    <Grid item container justifyContent={"space-between"} xs={12}>
                        <Grid item xs={4}>
                            <Button variant={"contained"} type='submit' fullWidth>Submit</Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant={"contained"} type='reset' onClick={resetForm} fullWidth>Reset</Button>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container item xs={4} justifyContent={"center"} alignItems={"center"}>
                    {image.current &&
                        <Avatar variant="rounded" src={image.current} sx={{width: "80%", height: "80%"}}/>}
                </Grid>

            </Grid>
        </form>

        <Snackbar open={isAlerted} autoHideDuration={6000} onClose={() => setAlert(false)}
                  message={alertMessage.current}/>
    </Box>
}