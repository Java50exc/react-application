
import React, { ReactNode, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import './App.css';
import { Bread } from './components/pages/Bread';
import { Customers } from './components/pages/Customers';
import { Dairy } from './components/pages/Dairy';
import { Home } from './components/pages/Home';
import { NotFound } from './components/pages/NotFound';
import { Orders } from './components/pages/Orders';
import { ShoppingCart } from './components/pages/ShoppingCart';
import { Link, Navigator } from './components/navigators/Navigator';



function App() {
     const mainList: Link[] = [
          { path: '/', name: 'Home', linkStyle: "navigator-item" },
          { path: '/shoppingcart', name: 'Shopping Cart', linkStyle: "navigator-item" },
          { path: '/orders', name: 'Orders', linkStyle: "navigator-item" },
          { path: '/customers', name: 'Customers', linkStyle: "navigator-item" },
          { path: '/products', name: 'Products', linkStyle: "navigator-item" }
     ];

     const productsList: Link[] = [
          { path: '/products/dairy', name: 'Dairy Products', linkStyle: "navigator-item" },
          { path: '/products/bread', name: 'Bread Products', linkStyle: "navigator-item" }
     ];

     const navigate = useNavigate();

     useEffect(() => {
         navigate('/')
     },  [])



     return <>
          <Routes>
               <Route path='/' element={<Navigator links={mainList} style="navigator-list" />}>
                    <Route index element={<Home />} />
                    <Route path='customers' element={<Customers />} />
                    <Route path='orders' element={<Orders />} />
                    <Route path='shoppingcart' element={<ShoppingCart />} />
                    <Route path='products' element={<Navigator links={productsList} style="navigator-list navigator-sublist" />} >
                         <Route path='dairy' element={<Dairy />} />
                         <Route path='bread' element={<Bread />} />
                    </Route>
               </Route>

               <Route path='/*' element={<NotFound />} />

          </Routes>
          </>
     // </BrowserRouter>
}

export default App;
