import React from 'react'

const PaymentSelection = ({handlePaymentChange, selectedPayment}) => {
    return (
        <fieldset className="my-2">
            <legend className="text-xl p-4">Payment Information</legend>
            <div className="px-8 space-x-4">
                <label className="inline-flex items-center cursor-pointer">
                    <input
                        type="radio"
                        id="gcash"
                        name="payment"
                        value="gcash"
                        onChange={handlePaymentChange}
                        checked={selectedPayment === 'gcash'}
                        className="form-radio h-5 w-5 text-blue-500"
                    />
                    <span className="ml-2">GCash</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                    <input
                        type="radio"
                        id="paymaya"
                        name="payment"
                        value="paymaya"
                        onChange={handlePaymentChange}
                        checked={selectedPayment === 'paymaya'}
                        className="form-radio h-5 w-5 text-blue-500"
                    />
                    <span className="ml-2">Maya</span>
                </label>
            </div>
        </fieldset>
    )
}

export default PaymentSelection