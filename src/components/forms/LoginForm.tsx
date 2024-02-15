import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { LoginData } from "../../model/LoginData";
import { useSelector } from "react-redux";

type Props = {submitFn: (loginData: LoginData) => void }



export const LoginForm: React.FC<Props> = ({submitFn}) => {
    const selector = useSelector<any, string>(status => status.authUser.)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });


    };

    return (
        <ThemeProvider theme={createTheme()}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">Sign in</Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField margin="normal" required fullWidth id="email"
                            label="Email Address" name="email" autoComplete="email" autoFocus />
                        <TextField margin="normal" required fullWidth name="password"
                            label="Password" type="password" id="password" autoComplete="current-password" />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign In</Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}