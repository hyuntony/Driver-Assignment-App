import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Driver = mongoose.model('Driver', driverSchema);

export default Driver;