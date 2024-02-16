import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LoginData } from '../../model/LoginData';
import GoogleIconSvg from './google-icon.svg';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { codeActions } from '../../redux/codeSlice';


function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.tel-ran.com/">
                Tel-Ran
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();
type Props = {
    submitFn: (loginData: LoginData) => void

}
export const LoginForm: React.FC<Props> = ({ submitFn }) => {
    const codeSelector = useSelector<any, string>(state => state.codeState.code);
    const dispatch = useDispatch();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        submitFn({
            email: data.get('email') as string,
            password: data.get('password') as string,
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        {codeSelector != 'OK' && <Alert severity="error" onClose={() => {dispatch(codeActions.reset())}}>
                            {codeSelector}
                        </Alert>}
                        <Divider sx={{fontWeight: 'bold'}}>or</Divider>
                        <Button fullWidth variant="outlined" sx={{ mt: 2 }} onClick={() => submitFn({ email: "GOOGLE", password: "" })}>
                            <img src={GoogleIconSvg} alt="Google" />
                        </Button>

                    </Box>
                </Box>
                <Copyright sx={{ mt: 2 }} />
            </Container>
        </ThemeProvider>
    );
}