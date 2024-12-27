import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true }, 
    status: { type: String, required: true },
  },{
    timestamps:true
});
  
  const categoriesModel = mongoose.model('Categories', categoriesSchema);
  export default categoriesModel;
  