import { AppBar, Box, Tabs, Tab } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import React, { ReactNode, useEffect, useRef } from "react";
import { RouteType } from "../../model/RouteType";

export type Props = {
  subnav?: boolean,
  routes: RouteType[]
}
export const NavigatorDesktop: React.FC<Props> = ({ subnav, routes }) => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setValue(0);
    navigate(routes[0].path)
    
  }, [routes])

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  function getTabs(): ReactNode {
    return routes.map((route, index) =>
      <Tab key={index} component={Link} to={route.path} label={route.label} />
      )
  }

  return <Box sx={{}}> 
    <AppBar sx={{backgroundColor:"white", position: "relative"}}>
      <Tabs value={value >= routes.length ? 0 : value} onChange={handleChange} variant="fullWidth">
        {getTabs()}
      </Tabs>
    </AppBar>
    <Outlet></Outlet>
  </Box>
}