import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { RouteType } from '../../model/RouteType';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Tab } from '@mui/material';
type Props = {
    subnav?: boolean,
    routes: RouteType[]
}
export const NavigatorPortrait: React.FC<Props> = ({ routes }) => {
    const drawerWidth = 240;
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');


    useEffect(() => {
        setTitle(getTitle())
        setMobileOpen(false)
    }, [location]);

    useEffect(() => {
        navigate(routes[0].path)
    }, [routes])


    function getTitle(): string {
        return routes.find(r => r.path === location.pathname)!.label;
    }

    const handleDrawerClose = () => {
        setMobileOpen(false);
    };


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    function getDrawer() {
        return routes.map((r, i) => {
            return <ListItem key={i} disablePadding>
                <ListItemButton >
                    <Tab component={Link} to={r.path} label={r.label}/>
                </ListItemButton>
            </ListItem>
        })
    }



    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}>
                <Toolbar>
                    <IconButton color="inherit" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}><MenuIcon /></IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                <Drawer
                    open={mobileOpen}
                    onClose={handleDrawerClose}
                    ModalProps={{ keepMounted: true }}
                    sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}>
                    <Toolbar />
                    <Divider />
                    <List>
                        {getDrawer()}
                    </List>
                </Drawer>
                <Toolbar />
                <Outlet></Outlet>
            </Box>
        </Box>
    );
}


