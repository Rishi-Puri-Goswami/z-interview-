import Redis from "ioredis";
const clint = new Redis({ db: 1 }); 

export default clint;

