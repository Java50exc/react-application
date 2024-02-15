import React, { ReactNode, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Bread } from './components/pages/Bread';
import { Customers } from './components/pages/Customers';
import { Dairy } from './components/pages/Dairy';
import { Home } from './components/pages/Home';
import { NotFound } from './components/pages/NotFound';
import { Orders } from './components/pages/Orders';
import { ShoppingCart } from './components/pages/ShoppingCart';
import { routes } from './config/layout-config'
import { routesProduct } from './config/products-config';
import { NavigatorDesktop } from './components/navigators/NavigatorDesktop';
import { Login } from './components/pages/Login';
import { Logout } from './components/pages/Logout';
import { useSelector } from 'react-redux';
import { UserAccount } from './model/UserAccount';
import { RouteType } from './model/RouteType';

function App() {
     const { authUser } = useSelector<any, UserAccount>(state => state.auth);
     const [curRoutes, setRoutes] = useState(getRoutes());

     useEffect(() => { setRoutes(getRoutes()) }, [authUser]);

     function getRoutes(): RouteType[] {
          const newRoutes = routes.filter(r => r.always ||
               (authUser && r.authenticated) ||
               (authUser.includes("admin") && r.admin) ||
               (!authUser && r.no_authenticated));
          const logoutRoute = newRoutes.find(route => route.path === '/logout');

          if (logoutRoute) {
               logoutRoute.label = `Logout [${authUser}]`;
          }
          return newRoutes;
     }

     return <BrowserRouter>
          <Routes>
               <Route path='/' element={<NavigatorDesktop routes={curRoutes} />}>
                    <Route element={<Home />} />
                    <Route path='customers' element={<Customers />} />
                    <Route path='orders' element={<Orders />} />
                    <Route path='shoppingcart' element={<ShoppingCart />} />
                    <Route path='products' element={<NavigatorDesktop subnav routes={routesProduct} />}>
                         <Route path='dairy' element={<Dairy />} />
                         <Route path='bread' element={<Bread />} />
                    </Route>
                    <Route path='login' element={<Login />} />
                    <Route path='logout' element={<Logout />} />
               </Route>

               <Route path='/*' element={<NotFound />} />

          </Routes>

     </BrowserRouter>
}

export default App;
