import mongoose from 'mongoose'
import Mongoose from 'mongoose'

const BrandShema = new Mongoose.Schema({
    name:{
        type:String,
        imageUrl:String
    }
})

const BrandModel = mongoose.Model(('Brand',BrandShema))
export default BrandModel