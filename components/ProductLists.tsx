
import ItemCard from './ItemCard'
import { useSearchContext } from '@contexts/SearchContext'

const ProductLists = ({ products = [] }) => {
  const { filteredProducts } = useSearchContext();

  return (
    <section className="grid grid-cols-1 md:grid-cols-3">
      {filteredProducts
        ? filteredProducts.map((productItem) => (<ItemCard productDetails={productItem} key={productItem._id} />))
        : products.map((product) => (
          (<ItemCard productDetails={product} key={product._id} />)
        ))
      }
    </section>
  )
}

export default ProductLists