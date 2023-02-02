import { Document,model, Schema } from "mongoose";
import { Iproducts } from "../interfaces/product";

interface productData extends Document, Iproducts{

}

const productSchema : Schema<productData> = new Schema({
    name: {
        type: String,
        required: true
    },
   price: {
    type: String,
    required: true
   },
   rating:  {
    type : Number,
    required: true
   },
  productImage: {
    type: String,
    required: true
  },
  category:{
    type: String,
    required: true
  }
}, {timestamps: true, versionKey: false})

const productModel = model<productData>("productDeatailsColection", productSchema)

export default productModel