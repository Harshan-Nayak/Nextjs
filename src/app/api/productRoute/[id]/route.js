import { NextResponse } from "next/server";
import dbConnect from "@/app/utils/dbConnect";
import Product from "@/app/model/Product";
dbConnect()



export async function PUT(request){

const id = request.url.split('/')[5];

const {name,brand,price,quantity} = await request.json()
const updatedProduct = await Product.findByIdAndUpdate({_id:id},{name,brand,price,quantity} )

    return NextResponse.json({message:updatedProduct})
}


export async function DELETE(request){

    const id = request.url.split('/')[5];
    
    
    const deleteProduct = await Product.findByIdAndDelete({_id:id})
    
        return NextResponse.json({message:"Deleted"})
    }
    