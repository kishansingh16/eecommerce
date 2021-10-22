const express=require("express");
const app=express();
const mongoose=require("mongoose");
// const dotenv=require(dotenv);
const userRoute=require("./routes/user");
const authRoute=require("./routes/auth");

// dotenv.config();

mongoose
    .connect("mongodb+srv://kishan:kishan@cluster0.q5o58.mongodb.net/shop?retryWrites=true&w=majority")
    .then(()=>console.log("DB Connection Successfull!"))
    .catch((err)=>{
        console.log(err);
    });
    app.use(express.json());
    app.use("/api/auth",authRoute);
    app.use("/api/users",userRoute);

app.listen(3000,()=>{
        console.log("backend is running!")
    })