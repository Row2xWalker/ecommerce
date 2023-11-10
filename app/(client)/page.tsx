"use client"
import { ProductLists } from '@/components'
import Loader from '@components/Loader';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react'

export default function Home() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const searchParams = useSearchParams();
  const search = searchParams.get('search')
  useEffect(() => {
    if (search) {
      setSearchQuery(search);
    }else{
      setSearchQuery('')
    }
  }, [search]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/product');
      const data = await response.json();
      setProducts(data)
      setIsLoading(false)
    }

    fetchProducts()
   
  }, [])           
  
  useEffect(()=>{
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered)
  },[searchQuery, products])

  // useEffect(() => {
  //   
  //   setFilteredProducts(filtered);
  // }, [searchQuery, products]);

  return (
    <>
      {isLoading ?
        (<Loader />)
        : (<ProductLists products={filteredProducts!==null?filteredProducts: products} />)
      }
    </>
  )
}
