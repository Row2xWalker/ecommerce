
import Image from 'next/image'

const Cart = ({ cartItems }) => {

    return (
        <section className="px-8 py-4">
            <h1 className="font-bold text-xl">Your Cart</h1>
            <div className="flex pt-4 font-bold mb-4">
                <div className="w-[600px]">Product</div>
                <div className="w-[200px]">Quantity</div>
                <div className="w-[100px] text-right">Total</div>
            </div>
            {cartItems.map((cartItem, index) => (
                <div className="flex py-2" key={index}>
                    <div className="flex w-[600px]">
                        <Image src={cartItem.cartItem.images[0]} alt="cartlist-item" width={100} height={100} className="rounded" />
                        <div className="pl-8 pt-4 flex flex-col gap-2 w-full">
                            <span className="font-bold ">{cartItem.cartItem.name}</span>
                            <span><span className="text-xl">Php </span>{cartItem.cartItem.price}</span>
                        </div>
                    </div>
                    <div className="w-[200px]">
                        <div className="flex  pt-8 h-[70px] ">
                            <button className="border w-[25px]" onClick={() => onMinusQuantityClick(index)}>-</button>
                            <input onChange={handleQuantityChange} className="border w-1/4 text-center" value={quantity} />
                            <button className="border w-[25px]" onClick={() => onAddQuantityClick(index)}>+</button>
                            <button>Delete</button>
                        </div>
                    </div>
                    <div className="w-[100px] pt-8 text-right">Php {cartItem.total}</div>
                </div>
            ))}
            <hr className="my-4" />
            <div className="flex">
                <div className="w-[700px] bg-red">
                    <h2>Order Instructions</h2>
                    <textarea className="border rounded-md w-3/4 resize-none px-2">
                    </textarea>
                </div>
                <div>
                    <span className="font-semibold text-xl">Subtotal:</span> {cartItems.reduce((total, item) => total + item.total, 0)}
                    <button className="bg-blue-600 text-white h-12 px-8 border rounded-md hover:bg-blue-400 ">Check Out</button>
                </div>
            </div>
        </section >
    )
}

export default Cart