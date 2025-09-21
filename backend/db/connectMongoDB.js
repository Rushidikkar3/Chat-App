import mongoose from'mongoose';

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MongoDB_URI);
        console.log('MongoDB Connected');
    }
    catch (error) {
        console.log("Error While Connecting to MongoDB," + error);
    }
}


export default connectMongoDB;
