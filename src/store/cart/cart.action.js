import { CART_ACTION_TYPES } from './cart.types'
import { createAction } from '../../utils/reducer.utils'

const addCardItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  )

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, removeItem) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === removeItem.id
  )

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== removeItem.id)
  }

  return cartItems.map((cartItem) =>
    cartItem.id === removeItem.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItem = addCardItem(cartItems, productToAdd)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItem)
}

export const removeItemToCart = (cartItems, removeItemToCart) => {
  const newCartItem = removeCartItem(cartItems, removeItemToCart)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItem)
}

export const clearItemFromCart = (cartItems, clearItemCart) => {
  const newCartItem = clearCartItem(cartItems, clearItemCart)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItem)
}

export const setIsCartOpen = (bool) => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
}
