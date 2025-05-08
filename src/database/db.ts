import { PrismaClient } from "../prisma/generated/prisma";

const prisma = new PrismaClient();

//function to connect
export async function connectToDB(){
    try{
        const connection = await prisma.$connect();
        console.log("Database Successfully connected");
    }catch(err){
        console.error("Failed to connect to database");
        process.exit(1);
    }
}

export default prisma;
