import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, 
  phone: { type: Number, unique: true }, 
  status: { type: String, default: 'active' },
  profilePicture: { type: String },
  otp: { type: Number }, 
  otpExpiry: { type: Date },
  isVerified: { type: Boolean, default: false },
}, {
  timestamps: true,
});

const userModel = mongoose.model('User', userSchema);
export default userModel;
