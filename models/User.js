import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: false },
  address: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  email: { type: String, required: true, unique: true },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);