import Mongoose from 'mongoose'

const BrandsSchema = new Mongoose.Schema({
    name:{type:String, requird:true},
    imageUrl:{type:String,required:true},
    status:{type : String , default:"listed" }
},{
    timestamps:true
})

const BrandModel =  Mongoose.model('Brand',BrandsSchema)
export default BrandModel