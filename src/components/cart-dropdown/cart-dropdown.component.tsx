import {
  CartDropDownContainer,
  EmptyMessage,
  CartItems,
} from './cart-dropdown.styles'
import { useSelector } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector'
import { useNavigate } from 'react-router-dom'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import { useCallback } from 'react'

const CartDropdown = () => {
  const navigate = useNavigate()
  const cartItems = useSelector(selectCartItems)
  /** memoize the function */
  const goToCheckoutHandler = useCallback(() => {
    navigate('/checkout')
  }, [])

  return (
    <CartDropDownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropDownContainer>
  )
}

export default CartDropdown
