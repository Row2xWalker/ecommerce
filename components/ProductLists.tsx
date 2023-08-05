import ItemCard from './ItemCard'
import { useSearchContext } from '@contexts/SearchContext'
const ProductLists = ({ products = [] }) => {

  const { filteredProducts } = useSearchContext();

  return (
    <section className="grid grid-cols-3 ">
      {filteredProducts
        ? filteredProducts.map((productItem) => (<ItemCard productDetails={productItem} key={productItem._id} />))
        : products.map((product) => (
          (<ItemCard productDetails={productItem} key={productItem._id} />)
        ))
        // products?.map((productItem) => {
        //   return <ItemCard productDetails={productItem} key={productItem._id} />
      }
    </section>
  )
}

export default ProductLists