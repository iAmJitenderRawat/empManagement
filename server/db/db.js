import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {dbName:process.env.DB_NAME});
        console.log("MongoDB Connected...")
    } catch (error) {
        console.log('MongoDB connection failed:', error.message)
    }
};

export default connectDB;