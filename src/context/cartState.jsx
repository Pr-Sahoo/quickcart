import React, {useState, useEffect} from 'react'
import CartContext from "./cartContext";

const CartState = (props) => {
    const [students, setStudents] =  useState({
        name: "Homelander",
        frnd: "peter parker",
        age: 34,
        pass: true
    })
    useEffect (() => {
      const intervalId = setInterval(() => {
        setStudents({
          name: "Billy Butcher",
          frnd: "Hugh campbell",
          age: 22,
          pass: false
        });
      }, 5000);
      return () => clearInterval(intervalId);
    },[])
  return (
    <CartContext.Provider value={students}>
        {props.children}
    </CartContext.Provider>
  )
}

export default CartState;