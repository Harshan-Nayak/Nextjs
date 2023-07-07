import { NextResponse } from "next/server";
import Product from "@/app/model/Product";
import dbConnect from "@/app/utils/dbConnect";
dbConnect()

export async function POST(request){

 const {name,brand,price,quantity} = await request.json();

 let newProduct = new Product({
    name,brand,price,quantity
 })


await newProduct.save()



    return NextResponse.json({message:"Product Saved"})
}

export async function GET(request){
    let products = await Product.find()
    return NextResponse.json(products)
}