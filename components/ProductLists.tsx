import React from 'react'
import ItemCard from './ItemCard'

const ProductLists = ({ products }) => {
  return (
    <section className="grid grid-cols-3 max-w-[990px] mx-auto border bg-white ">
      {products?.map((product, i) => {

        // if (i < 10) {
        //   return <ItemCard productDetails={product} key={product._id} />
        // }
        return <ItemCard productDetails={product} key={product._id} />
      })}
    </section>
  )
}

export default ProductLists