import express from "express"
import { userRouter } from "./routes/user.js";
import client from "@repo/db/client";

const app = express();

app.use(express.json());
app.use("/user", userRouter);

app.get('/', (req, res)=>{
    return res.status(200).json({
        message: "/ route working success"
    })
})

app.get('/checkdb', async(req, res)=>{
    const r = await client.user.findFirst();
    return res.status(200).json({
        "username": r?.username,
        "id": r?.id
    })
})

app.get("/getUserById", async(req, res)=>{
    const {id} = req.body;

    if(!id){
        return res.status(400).json({
            message: "id not found"
        })
    }

    const user = await client.user.findFirst({
        where:{
            id
        }
    })

    return res.status(200).json({"user": user?.username});
})

async function startServer(){
    await client.$connect()
    app.listen(3000, ()=>{
        console.log("listening on port 3000")
    })
}

startServer();