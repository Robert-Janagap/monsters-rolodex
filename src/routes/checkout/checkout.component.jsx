import './checkout.styles.scss'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
const Checkout = () => {
  const { cartItems, addItemToCart } = useContext(CartContext)

  return (
    <div>
      <h1>I am checkout page</h1>
      <div>
        {cartItems.map((cartItem) => {
          const { id, name, quantity } = cartItem
          return (
            <div key={id}>
              <h2>{name}</h2>
              <span>{quantity}</span>
              <br />
              <div>Decrement</div>
              <br />
              <div onClick={() => addItemToCart(cartItem)}>Increment</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Checkout
