const mongoose = require('mongoose')


export default async function dbConnect(){
await mongoose.connect(process.env.UR,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
}





 

 