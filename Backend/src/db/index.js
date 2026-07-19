import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config();

const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Mongo DB connected succesfully');
  }
  catch(err){
    console.log('Error connecting to Mongo DB',err);
    process.exit(1);
  }
}

export default connectDB