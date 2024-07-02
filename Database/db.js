import { connect } from "mongoose";
import 'dotenv/config';

const connectToMongo = async () => {
    try {
        await connect(`mongodb+srv://pratiyushs37:${process.env.db_pass}@cluster0.f4vvqyz.mongodb.net/?retryWrites=true&w=majority&appName=blogs`);
        console.log('data base connected successfully');
    } catch (error) {
        console.log(error);
    }
}

export default connectToMongo