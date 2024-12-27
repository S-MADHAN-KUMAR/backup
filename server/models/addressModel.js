import mongoose from 'mongoose'
import Mongoose from 'mongoose'

const AddressSchema = new Mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId},
    name:{type:String},
    phone:{type:Number},
    addressline1:{type:String , require : true},
    addressline2:{type:String , require : true},
    city:{type:String,require:true},
    state:{type:String,require:true},
    pincode:{type:Number,require:true}
},{
    timestamps:true
})

const AddressModel = Mongoose.model('Address',AddressSchema)
export default AddressModel