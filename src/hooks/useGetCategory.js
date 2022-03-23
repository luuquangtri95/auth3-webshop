import categoryApi from 'apis/categoryApi'
import { useState } from 'react'
import { useEffect } from 'react'

export default function useGetCategory() {
  const [categoryList, setCategoryList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const data = await categoryApi.getAll()
        const mapCategoryByNameId = data.map((x) => ({
          id: x.id,
          name: x.name,
        }))

        setCategoryList(mapCategoryByNameId)

        setLoading(false)
      } catch (error) {
        console.log('fail to fetch category', error)
      }
    })()
  }, [])

  return { categoryList, loading }
}
