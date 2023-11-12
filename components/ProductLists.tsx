import ItemCard from './ItemCard'
const ProductLists = ({ products = [] }) => {
  return (
    <>
    <section className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {
      products.map((product) => (
        (<ItemCard productDetails={product} key={product._id} />)
      ))}
     
    </section>
    </>
  )
}

export default ProductLists