import mongoose from "mongoose";


const dbconnect = async ()=>{

    try {

        const dbresponce = await mongoose.connect(`${process.env.MONGODB_URL}`);

console.log("data base connect successfully ::> " , dbresponce.connection.host);
        
    } catch (error) {
        console.log("error on connect on database" , error)
    }


}

export default dbconnect ; 