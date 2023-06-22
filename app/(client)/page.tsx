import Image from 'next/image'
import { CategoryBar, ProductLists } from '@/components'

export default function Home() {
  return (
    <>
      <CategoryBar />
      <ProductLists />
    </>
  )
}
