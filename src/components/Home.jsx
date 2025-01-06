// import React, { useContext } from 'react';
import React from 'react';
// import CartContext from '../context/cartContext';
// import Productscard from '../pages/Productscard';
import TabComp from './TabComp'

export const Home = () => {
  // const {name, frnd, pass, age} = useContext(CartContext);
  return (
    <div>
      {/* <h3 className='text-center'>Welcome to QuickCart</h3> */}
      {/* <Productscard /> */}
      <TabComp/>
    </div>
  )
}
