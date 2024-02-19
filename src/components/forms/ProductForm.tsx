import {
    Avatar,
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    NativeSelect,
    Select, SelectChangeEvent,
    TextField
} from "@mui/material";
import {ProductType} from "../../model/ProductType"
import {useState, useRef} from "react";
import {useSelector} from "react-redux";

type Props = {
    submitFn: (product: ProductType) => string
}
const initialProduct: ProductType = {
    category: 'bread', image: '', cost: 20,
    title: 'breadx', unit: 'piece'
};
export const ProductForm: React.FC<Props> = ({submitFn}) => {
    const [product, setProduct] = useState<ProductType>(initialProduct);
    const image = useRef<string>('');
    const categories: string[] = useSelector<any, string[]>(state => state.categoriesState.categories);

    function onSubmitFn(event: any) {
        event.preventDefault(); //canceling default form submit
        const errorMessage = submitFn(product);
        if (!errorMessage) {
            document.querySelector("form")!.reset();
        }

        //TODO error handling
    }

    function imageHandler(event: any) {
        const urlImage = event.target.value;
        image.current = urlImage;
        setProduct({...product, image: urlImage});

    }

    function titleHandler() {
        //TODO
    }

    const categoryHandler = (event: SelectChangeEvent) => {
        const category = event.target.value;
        setProduct({...product, category});
    };

    const getCategoryMenuItems = (): JSX.Element[] =>
        categories.map((c: string, i: number) => <MenuItem value={c} key={i}>c</MenuItem>);

    return <Box>
        <form onSubmit={onSubmitFn}>
            <Grid container spacing={4} justifyContent={'center'}>
                <Grid item xs={8} md={7}>
                    <TextField label='URL image'
                               required fullWidth value={product.image}
                               onChange={imageHandler}/>
                </Grid>
                <Grid item xs={5}>
                    {image.current && <Avatar src={image.current} sx={{
                        width: "20vw",
                        height: "20vw"
                    }}/>}
                </Grid>
                <Grid item container spacing={5} justifyContent={'center'} xs={12}>
                    <Grid item xs={4}>
                        <Button type='submit'>Submit</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button type='reset'>Reset</Button>
                    </Grid>
                </Grid>
                <Grid item xs={8} md={7}>
                    <TextField label='Title' required fullWidth value={product.title} onChange={titleHandler}/></Grid>
                <Grid item xs={8} md={7}>
                    <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                        <InputLabel>Age</InputLabel>
                        <Select value={product.category} onChange={categoryHandler} label="Category">
                            <MenuItem value=""><em>None</em></MenuItem>
                            {getCategoryMenuItems()}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

        </form>
    </Box>
}