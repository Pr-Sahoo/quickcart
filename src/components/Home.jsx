import React, { useContext } from 'react';
import CartContext from '../context/cartContext';

export const Home = () => {
  const {name, frnd, pass, age} = useContext(CartContext);
  return (
    <div>this is home page 
      i am the {name} and my friend is {frnd} and we are both {age} yr old and we both {pass} in our exam 
    </div>
  )
}
