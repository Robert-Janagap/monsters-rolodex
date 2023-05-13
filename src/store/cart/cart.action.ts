import { CART_ACTION_TYPES } from './cart.types'
import {
  ActionWithPayload,
  createAction,
  withMatcher
} from '../../utils/reducer.utils'
import { CategoryItem } from '../categories/category.types'
import { CartItem } from './cart.types'

const addCardItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
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

const removeCartItem = (
  cartItems: CartItem[],
  removeItem: CartItem
): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === removeItem.id
  )

  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== removeItem.id)
  }

  return cartItems.map((cartItem) =>
    cartItem.id === removeItem.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}

const clearCartItem = (
  cartItems: CartItem[],
  cartItemToClear: CartItem
): CartItem[] =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>
export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>

export const setCartItems = withMatcher(
  (CartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, CartItems)
)

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
) => {
  const newCartItem = addCardItem(cartItems, productToAdd)
  return setCartItems(newCartItem)
}

export const removeItemToCart = (
  cartItems: CartItem[],
  removeItemToCart: CartItem
) => {
  const newCartItem = removeCartItem(cartItems, removeItemToCart)
  return setCartItems(newCartItem)
}

export const clearItemFromCart = (
  cartItems: CartItem[],
  clearItemCart: CartItem
) => {
  const newCartItem = clearCartItem(cartItems, clearItemCart)
  return setCartItems(newCartItem)
}

export const setIsCartOpen = withMatcher((bool: boolean): SetIsCartOpen => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
})
