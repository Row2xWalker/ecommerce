
import Image from 'next/image';
import Link from 'next/link';
import CircumIcon from "@klarr-agency/circum-icons-react"

const Cart = ({ item, removeFromCart, increaseQuantity, decreaseQuantity, }) => {

    return (
        <div className="flex py-2" key={item.cartItem._id}>
            <div className="flex-1 w-[600px]">
                <div className="flex">
                    <Image src={item.cartItem.images[0]} alt="cartlist-item" width={100} height={100} className="rounded" />
                    <div className="pl-8 pt-4 flex flex-col gap-2 w-full">
                        <Link href={`products?id=${item.cartItem._id}`}>
                            <span className="font-bold hover:underline hover:text-blue-500 ">{item.cartItem.name}</span>
                        </Link>
                        <span><span className="text-xl">Php </span>{item.cartItem.price}</span>
                    </div>
                </div>
            </div>
            <div className="w-48 pt-8 ">
                <div className="flex">
                    <div className="border flex  text-black">
                        <button className="border-r px-2" onClick={() => decreaseQuantity(item.cartItem._id)}>-</button>
                        <input type="number" onChange={(e) => handleQuantityChange(item.cartItem._id, e)} className="h-full w-12 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value={item.cart_quantity} />
                        <button className="border-l px-2" onClick={() => increaseQuantity(item.cartItem._id)}>+</button>

                    </div>
                    <button className="px-2" onClick={() => removeFromCart(item.cartItem._id)}> <CircumIcon name="trash" color="red" size="24px" /> </button>
                </div>
            </div>
            <div className="w-[100px] pt-8 text-right">Php {item.total}</div>
        </div>
    )
}

export default Cart