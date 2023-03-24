import { createContext, useEffect, useState } from 'react'

import SHOP_DATA from '../shop-data.js'

import { addCollectionAndDocument } from '../utils/firebase/firebase.utils.js'

export const ProductsContext = createContext({
  products: [],
})

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const value = { products }
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}
