import {connectToDB} from '@utils/database'
import Product from '@models/product'

// GET (read)
export const GET = async (request, {params}) => {
    try{
        await connectToDB()

        const product = await Product.findById(params.id).populate('name')
        if(!product) return new Response("Product not found", {status:404});

        return new Response(JSON.stringify(product), {status:200})
    }catch (error){
        return new Response("Failed to fetch all products",{ status:500 })
    }
}
// // PATCH (update)
// export const PATCH = async(request, {params}) => {
//     const {prompt, tag} = await request.json();

//     try{
//         await connectToDB();

//         const existingPrompt = await Prompt.findById(params.id);

//         if(!existingPrompt) return new Response("Prompt not Found", {status:404})
//         existingPrompt.prompt = prompt;
//         existingPrompt.tag = tag;

//         await existingPrompt.save();

//         return new Response(JSON.stringify(existingPrompt), {status:200})
//     }catch (error) {

//     }
// }
// DELETE (delete)

export const DELETE = async(request, {params}) => {
    try{
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);

        return new Response("Product deleted successfully", {status: 200})
    }catch (error){
        return new Response("Failed to delete product", {status: 500})
    }
}