import axiosClient from './axiosClient'

const productApi = {
  async getAll(params) {
    // ! transform _page to _start

    const newParams = { ...params }
    newParams._start =
      !params._page || params._page <= 1 ? 0 : (params._page - 1) * (params._limit || 50)

    // newParams = {
    //   _page: 1,
    //   _limit: 10,
    //   _start: 0,
    // }

    // remove un-needed key
    delete newParams._page

    const productList = await axiosClient.get('/products', { params: newParams })
    const count = await axiosClient.get('/products/count', { params: newParams })

    return {
      data: productList,
      pagination: {
        page: params._page,
        limit: params._limit,
        total: count,
      },
    }
  },

  getById(id) {
    const url = `/product/${id}`
    return axiosClient.get(url)
  },

  addNewProduct(data) {
    const url = '/products'
    return axiosClient.post(url, data)
  },

  update(data) {
    const url = `/products/${data.id}`
    return axiosClient.patch(url, data)
  },

  delete(id) {
    const url = `/products/${id}`
    return axiosClient.delete(url)
  },
}

export default productApi
