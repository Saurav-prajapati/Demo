import mongoose from "mongoose";
import  dotenv from "dotenv";

dotenv.config({path:'./config.env'});

mongoose.set('strictQuery', true);

// connection database mongnoose 
const DB = process.env.DATABASE;

const connection = async () => {

    try {
        await mongoose.connect(DB, {
            useNewUrlParser: true, useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex:true
        });
        console.log(`you are connected to DataBase 😉`);
    } catch (error) {
        console.log('error : ', error.message);
    }
}
export default connection();