
import Image from 'next/image';
import Link from 'next/link';
import CircumIcon from "@klarr-agency/circum-icons-react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { AiOutlineDelete } from 'react-icons/ai';
const Cart = ({ item, removeFromCart, increaseQuantity, decreaseQuantity, }) => {

    return (
        <div className="flex py-2" key={item.cartItem._id}>
            <div className="w-full">
                <div className="flex">
                    <div className="relative h-40 w-full md:w-1/3">
                        <Image src={item.cartItem.images[0]} alt="cartlist-item" fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' className="rounded" />
                    </div>
                    <div className="pl-4 md:pl-8 pt-2 md:pt-4 flex flex-col gap-2 w-full">
                        <Link href={`products?id=${item.cartItem._id}`}>
                            <span className="font-bold hover:underline hover:text-blue-500 ">{item.cartItem.name}</span>
                        </Link>
                        <span><span className="text-xl"><span>&#8369;</span></span>{item.cartItem.price}</span>
                        <div className="flex md:hidden">
                            <div className="border flex text-black">
                                <button className="border-r px-2" onClick={() => decreaseQuantity(item.cartItem._id)}>-</button>
                                <input type="number" onChange={(e) => handleQuantityChange(item.cartItem._id, e)} className="h-full w-12 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value={item.cart_quantity} />
                                <button className="border-l px-2" onClick={() => increaseQuantity(item.cartItem._id)}>+</button>
                            </div>
                            <button className="px-2" onClick={() => removeFromCart(item.cartItem._id)}> 
                            <AiOutlineDelete name="trash" color="red" size="24px" /> </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-8 hidden md:block ">
                <div className="flex">
                    <div className="border flex  text-black">
                        <button className="border-r px-2" onClick={() => decreaseQuantity(item.cartItem._id)}>-</button>
                        <input type="number" onChange={(e) => handleQuantityChange(item.cartItem._id, e)} className="h-full w-12 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value={item.cart_quantity} />
                        <button className="border-l px-2" onClick={() => increaseQuantity(item.cartItem._id)}>+</button>
                    </div>
                    <button className="px-2" onClick={() => removeFromCart(item.cartItem._id)}> <AiOutlineDelete name="trash" color="red" size="24px" /> </button>
                </div>
            </div>
            <div className="w-[100px] pt-8 text-right"><span>&#8369;</span> {item.total}</div>
        </div>
    )
}

export default Cart
