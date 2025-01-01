// import { type } from "@testing-library/user-event/dist/type";
import React, { createContext, useReducer } from "react";
// import Product from "../../backend/models/Product";
// import { type } from "@testing-library/user-event/dist/type";

const BasketContext = createContext();

const basketReudcer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_BASKET":
            return [...state, action.payload];
        case "REMOVE_FROM_BASKET":
            return state.filter((item) => item.productId !== action.payload);
            case "CLEAR_BASKET": // Add case for clearing basket
            return [];
        default:
            return state;
    }
};

export const BasketProvider = ({ children }) => {
    const [basket, dispatch] = useReducer(basketReudcer, []);

    const addToBasket = (Product) => {
        // if(!Product.productId) {
        //     console.error("Product must have a valid product ID");
        //     return;
        // }
        dispatch({ type: 'ADD_TO_BASKET', payload: Product });
    };

    const removeFromBasket = (productId) => {
        dispatch({ type: 'REMOVE_FROM_BASKET', payload: productId });
    };

    const clearBasket = () => {
        dispatch({type: "CLEAR_BASKET"});
    };

    return (
        <BasketContext.Provider value={{ basket, addToBasket, removeFromBasket, clearBasket }}>
            {children}
        </BasketContext.Provider>
    );
};
export { BasketContext };