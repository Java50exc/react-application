import { AppBar, Box, Tabs, Tab } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import React, { ReactNode, useEffect } from "react";
import { RouteType } from "../../model/RouteType";
import { useSelector } from "react-redux";
import { UserAccount } from "../../model/UserAccount";
export type Props = {
  subnav?: boolean,
  routes: RouteType[]
}
export const NavigatorDesktop: React.FC<Props> = ({ subnav, routes }) => {
  const { authUser, authPassword } = useSelector<any, UserAccount>(state => state.auth);

  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    navigate(routes[0].path)
  }, [])
  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };
  function getTabs(): ReactNode {
    return routes.map((route, index) => <Tab key={index} component={Link}
      to={route.path} label={route.label} />

    )
  }
  return <Box sx={{}}>
    <AppBar sx={{ backgroundColor: "lightgray", position: "relative" }}>
      <Tabs value={value} onChange={handleChange}>
        {getTabs()}
      </Tabs>
    </AppBar>
    <Outlet></Outlet>
  </Box>
}