import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        console.log("Attempting to connect to MongoDB...");
        console.log("MONGODB_URI:", process.env.MONGODB_URI ? "Configured" : "NOT SET");
        
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}`,
            {
                serverSelectionTimeoutMS: 5000,
                connectTimeoutMS: 10000,
            }
        );
        console.log(`\n MongoDB connected !!! ${connectionInstance.connection.host}`);
    
    } catch (error) {
        console.log("MongoDB connection failed!", error.message);
        process.exit(1);
    }
}

export default connectDB;