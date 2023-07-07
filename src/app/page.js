'use client'
import React,{useState} from 'react'
import Axios from 'axios'

export default function Home() {

const [name,setName] = useState('');
const [brand,setBrand] = useState('');
const [price,setPrice] = useState('');
const [quantity,setQuantity] = useState('');
const [productId,setProductId] = useState('')
const [prodArray,setProdArray] = useState([]);
const [visibility,setVisibility] = useState(false);
const handleSubmit = async()=>{
   const pro = {
    name:name,
    brand:brand,
    price:price,
    quantity:quantity,
   }

   await Axios.post(`/api/productRoute`,pro);
}


//Get data 


const getData = async()=>{
  try {
    const response = await Axios.get('/api/productRoute')
    const products = response.data
    setProdArray(products)
  } catch ( error  ) {
    console.log(error)
  }
}

getData()

//update Data

const handleEdit = ( name,brand,price,quantity,productId )=>{
  setVisibility((visibility)=>!visibility)
  setName(name);
  setBrand(brand);
  setPrice(price);
  setQuantity(quantity);
  setProductId(productId);




}

const handleUpdate=async(id)=>{
  const pro = {
    name:name,
    brand:brand,
    price:price,
    quantity:quantity,
   }

   await Axios.put(`/api/productRoute/${id}`,pro);
}

const handleDelete=async(id)=>{
  await Axios.delete(`/api/productRoute/${id}`)
}


  return (
    <main className=' space-y-10 ' >
      <form className='m-10' > 
    <label htmlFor='name' ><input type='text' name='name' id='name' placeholder='SmartPhone' className=' shadow-xl shadow-slate-500 w-[75%] h-10 p-2 outline-none  m-5 ' value={name} onChange={(e)=>setName(e.target.value)} /></label>
    <label htmlFor='brand'  ><input type='text' name='brand' id='brand' placeholder='Brand' className=' shadow-xl shadow-slate-500 w-[75%] h-10 p-2 outline-none m-5 ' value={brand} onChange={(e)=>setBrand(e.target.value)} /></label>
    <label htmlFor='price'  ><input type='text' name='price' id='price' placeholder='Price' className=' shadow-xl shadow-slate-500 w-[75%] h-10 p-2 outline-none m-5 ' value={price} onChange={(e)=>setPrice(e.target.value)} /></label>
    <label htmlFor='quantity'  ><input type='text' name='quantity' id='quantity' placeholder='Quantity' className=' shadow-xl shadow-slate-500 w-[75%] h-10 p-2 outline-none m-5 ' value={quantity} onChange={(e)=>setQuantity(e.target.value)} /></label>
    <br />

{
  visibility ? 
<button  className=' mt-6 mx-5 p-2 bg-orange-500 hover:cursor-pointer hover:bg-red-600 text-white ' onClick={()=>handleUpdate(productId)}  >Update</button>
:
<button  className=' mt-6 mx-5 p-2 bg-orange-500 hover:cursor-pointer hover:bg-red-600 text-white ' onClick={handleSubmit}  >Submit</button>
}


      </form>

{/** Products */}
<div className=' m-10 ' >

  {prodArray.map((element)=>{
    return(
      <ul className=' flex justify-between ' key={element._id} >
        <li className=' flex-1 ' >{element.name}</li>
        <li className=' flex-1 ' >{element.brand}</li>
        <li className=' flex-1 ' >{element.price}</li>
        <li className=' flex-1 ' >{element.quantity}</li>
        <li className=' flex-1 ' ><button className=' p-2 bg-blue-500 text-white hover:cursor-pointer mx-2  hover:bg-black ' onClick={()=>handleEdit(element.name,element.brand,element.price,element.quantity,element._id)}  >Edit</button><button className=' p-2 bg-orange-500 text-white hover:cursor-pointer   ' onClick={()=>handleDelete(element._id)} >Delete</button></li>
      </ul>
    )
  })}

</div>


    </main>
  )
}
