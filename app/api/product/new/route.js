import {connectToDB} from '@utils/database'
import Product from '@models/product';

export const POST = async (req) =>{
    const {name, category, description, images, quantity} = await req.json();

    try{
        await connectToDB();
        const newProduct = new Product({ 
            name, 
            category,
            description,
            images, 
            quantity
        })

        await newProduct.save();

        return new Response(JSON.stringify(newProduct), { status: 201 })
    }catch (error){
        return new Response("Failed to create a new Product", { status: 500})
    }

}