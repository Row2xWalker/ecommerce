import React from 'react'

const Cart = () => {
    return (
        <section className="px-8 py-4">
            <h1 className="font-bold text-xl">Your Cart</h1>
            <div className="flex pt-4 font-bold mb-4">
                <div className="w-[600px]">Product</div>
                <div className="w-[200px]">Quantity</div>
                <div className="w-[100px]">Total</div>
            </div>
            <div className="flex">
                <div className="w-[600px]">
                    Image, Product Name
                </div>
                <div className="w-[200px]">2</div>
                <div className="w-[100px]">Total</div>
            </div>
            <hr className="my-4" />
            <div className="flex">
                <div className="w-[700px] bg-red">
                    <h2>Order Instructions</h2>
                    <textarea className="border rounded-md w-3/4 resize-none px-2">

                    </textarea>
                </div>
                <div>
                    <span className="font-semibold text-xl">Subtotal:</span> Php 400
                    <button className="bg-blue-600 text-white h-12 px-8 border rounded-md hover:bg-blue-400 ">Check Out</button>
                </div>
            </div>

        </section >
    )
}

export default Cart