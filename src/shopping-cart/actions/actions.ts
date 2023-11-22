/*
cookie: cart
{
    'uuid-123-1': 4,
    'uuid-123-2': 3,
    'uuid-123-3': 1,
}
*/

import { getCookie, hasCookie, setCookie } from "cookies-next";


export const getCookieCart = (): { [id:string]: number } => {
    if (!hasCookie('cart')) return {};

    const cookieCart = JSON.parse(getCookie('cart') as string ?? '{}')

    return cookieCart;
}

export const addProductToCart = (id: string) => {
    const cookieCart = getCookieCart();
    if (cookieCart[id]) {
        cookieCart[id] = cookieCart[id] + 1;
    } else {
        cookieCart[id] = 1;

    }

    setCookie('cart', JSON.stringify(cookieCart));
};


export const removeProductFromCart = (id: string) => {
    const cookieCart = getCookieCart()
    delete cookieCart[id];

    setCookie('cart', JSON.stringify(cookieCart))
}

export const removeSingleItemFromCart = (id: string) => {
    const cookieCart = getCookieCart();

    if (!cookieCart[id]) return;
    
    if (cookieCart[id] === 1) {
        delete cookieCart[id]
    } else {
        cookieCart[id] = cookieCart[id] - 1;

    }

    setCookie('cart', JSON.stringify(cookieCart));
}