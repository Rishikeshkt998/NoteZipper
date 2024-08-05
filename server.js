const express=require('express')
const cors=require('cors')

const dotenv=require("dotenv")
const connectDB=require("./config/db")
const userRoutes=require("./routes/userRoutes")
const noteRoutes=require('./routes/noteRoutes')

const app=express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: process.env.ORIGIN || "*",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders:"Origin,X-Requested-With,Content-Type,Accept,Authorization,Course-Id",
    optionsSuccessStatus: 200,
};

app.use('*',cors(corsOptions));

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.ORIGIN || "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});



dotenv.config()
connectDB()

app.use('/api/users',userRoutes)
app.use('/api/notes',noteRoutes)



const PORT=process.env.PORT||5000

app.listen(5000,console.log(`server started on port ${PORT}`))