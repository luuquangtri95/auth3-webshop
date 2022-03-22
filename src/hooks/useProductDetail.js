import productApi from 'apis/productApi'
import { useState } from 'react'
import { useEffect } from 'react'

export default function useProductDetail(productId) {
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const data = await productApi.getById(productId)
        setProduct(data)

        setLoading(false)
      } catch (error) {
        console.log('fail to fetch product id', error)
      }
    })()
  }, [productId])

  return { product, loading }
}
