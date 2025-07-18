import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model('User', UserSchema);
