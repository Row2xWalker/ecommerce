import ItemCard from './ItemCard'

const ProductLists = ({ products = [] }) => {
  return (
    <section className="grid grid-cols-3 ">
      {products?.map((productItem) => {
        return <ItemCard productDetails={productItem} key={productItem._id} />
      })}
    </section>
  )
}

export default ProductLists