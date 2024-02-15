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
import { useRef, useState } from "react";

type Props = {submitFn: (loginData: LoginData) => string }

export const LoginForm: React.FC<Props> = ({submitFn}) => {
    const userField = useRef<HTMLInputElement>(null);
    const passField = useRef<HTMLInputElement>(null);
    const [errMsg, setMsg] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

         setMsg(submitFn({email: data.get('email') as string, password: data.get('password') as string}));
         

        if (userField.current && passField.current) {
            userField.current.value ="";
            passField.current.value ="";
        }
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
                        <TextField margin="normal" required fullWidth id="email" inputRef={userField}
                            label="Email Address" name="email" autoComplete="email" autoFocus />
                        <TextField margin="normal" required fullWidth name="password" inputRef={passField}
                            label="Password" type="password" id="password" autoComplete="current-password" />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign In</Button>
                    </Box>

                    <Typography component="h1" variant="h5">{errMsg}</Typography>

                    

                </Box>
            </Container>
        </ThemeProvider>
    );
}
