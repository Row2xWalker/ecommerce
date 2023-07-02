export interface ProductsProps{
    name:string,
    category:string,
    description:string,
    quantity:number,
    images?:[string],
    sold?:number
}

export interface AdminProductsProps{
    products:ProductsProps,
    handleEdit: any,
    handleDelete: any
}