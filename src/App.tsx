
import React, { ReactNode } from 'react';
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

function App() {



     return <BrowserRouter>
          <Routes>
               <Route path='/' element={<NavigatorDesktop routes={routes} />}>
                    <Route index element={<Home />} />
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
