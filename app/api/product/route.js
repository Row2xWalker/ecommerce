import {connectToDB} from '@utils/database'
import Product from '@models/product'

export const GET = async (request) => {
    try{
        await connectToDB()

        const products = await Product.find({}).populate('name')

        return new Response(JSON.stringify(products), {status:200})
    }catch (error){
        return new Response("Failed to fetch all products",{ status:500 })
    }
}