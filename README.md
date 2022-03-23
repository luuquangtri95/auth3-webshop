# rules of filters (filter by category, price range...vv)

```
ProductFilerList
|__FilterByCategory
|__FilterByPriceRange
|__FilterByService
```

# rules of ListPage

```
ListPage
|__Left page
   |__ProductsFilterList
      |__FilterByCategory
      |__FilterByPriceRange
      |__FilterByService
      ...etc
|__Right page
   |__ProductSort
   |__FilterViewer
   |__ProductList
      |__ProductComponent
```

# rules of DetailPage

```
DetailPage
|__ProductThumbnail
|__ProductInfo
   |__ProductInfo
   |__AddToCartForm
      |__QuantityField
|__ProductMenu
```
