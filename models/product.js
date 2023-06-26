import {Schema, model, models} from 'mongoose';

const ProductSchema = new Schema({
    name: {
        type:String,
        required: [true, 'Product Name is required'],
    },
    category: {
        type:String,
        required: [true, 'Product Category is required'],
    },
    description: {
        type:String,
        required: [true, 'Product Description is required'],
    },
    image: {
        type:String
    },
    quantity: {
        type:Number,
        required: [true, 'Product Quantity is required'],
    },
    sold: {
        type:Number
    }
});

const Product = models.Product || model('Product', ProductSchema)

export default Product