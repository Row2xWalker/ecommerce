export interface ProductProps{
    name:string,
    category:string,
    description:string,
    quantity:number,
    price:number,
    images?:[string],
    sold?:number
}

export interface AdminProductsProps{
    products:ProductProps,
    handleEdit: any,
    handleDelete: any
}

export interface IProductResponse {
    type: string,
    product: ProductProps,
    submitting: boolean,
    setProduct: any,
    handleSubmit: Function,
    handleOnChange: Function
    handleRemove: Function,
    imageSrc: string[]
}