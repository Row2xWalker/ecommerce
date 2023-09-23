
const CategoryBar = ({ products }) => {
  console.log(products)
  // products.category.filter
  return (
    <section className="bg-white w-screen">
      <div className="w-[1440px] items-center mx-auto h-full px-4">

        <ul className="flex gap-4">
          {products?.map((product, i) => (
            <li key={i}>{product.category}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default CategoryBar