import { WebSocketServer } from "ws";
import client from "@repo/db/client"

const wss = new WebSocketServer({port: 8080});

wss.on("connection", async(ws: WebSocket)=>{
    ws.send("connected to the server");

    const resp = await client.user.create({
        data:{
            username: String(Math.random()),
            password: String(Math.random())
        }
    })

    ws.send(resp.id)

})