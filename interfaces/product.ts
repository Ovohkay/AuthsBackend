import { Document } from "mongoose";

export interface Iproducts extends Document{
    name: string,
    price: string,
    category: string,
    rating: number,
    productImage: string
}