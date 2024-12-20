import React, { useContext } from 'react';
import CartContext from '../context/cartContext';

export const About = () => {
  const {name, frnd, age, pass} = useContext(CartContext);
  return (
    <div>This is the about page
      my name is <strong>{name}</strong> and i am <strong>{age}</strong> year old and my friend is <strong>{frnd}</strong> and we both <strong>{pass}</strong> in our exam
    </div>
  )
}
