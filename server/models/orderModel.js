import mongoose, { Schema } from 'mongoose'

const OrderSchema = new mongoose.Schema({
user:{
  type:mongoose.Types.ObjectId
}
},{
  timestamps:true
})

const OrderModel = mongoose.model('Order', OrderSchema);
export default OrderModel