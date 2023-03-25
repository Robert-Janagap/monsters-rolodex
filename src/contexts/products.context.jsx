import { createContext, useEffect, useState } from 'react'

import SHOP_DATA from '../shop-data.js'

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js'

export const ProductsContext = createContext({
  products: [],
})

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const value = { products }

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments()
      console.log(categoryMap)
    }
    getCategoriesMap()
  }, [])
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}
