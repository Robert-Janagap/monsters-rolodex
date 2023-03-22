import './checkout-item.styles.scss'

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <div className='name'>{name}</div>
      <div className='quantity'>{quantity}</div>
      <div className='price'>{price}</div>
      <div className='remove-button'>&#10005;</div>
    </div>
  )
}

export default CheckoutItem
