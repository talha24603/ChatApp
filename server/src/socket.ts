import { Server ,Socket} from "socket.io";
import prisma from "./config/db.config.js";

interface CustomSocket extends Socket {
    room?:string
  }
export  function setupSocket(io:Server) {
    io.use((Socket:CustomSocket,next)=>{
        const room = Socket.handshake.auth.room || Socket.handshake.headers.room;
        if(!room){
            return next(new Error('room is required'))
        }
        Socket.room = room
        next()
    })
    io.on("connection",(socket:CustomSocket)=>{
        socket.join(socket.room)
        console.log("Socket connected",socket.id);

        socket.on("message",async (data)=>{
            console.log("server side message",data);
            // socket.broadcast.emit("message",data)
            await prisma.chats.create({
                data:data,
            })
            socket.to(socket.room).emit("message",data)
        })

        socket.on("disconnected",()=>{
            console.log("Client disconnected",socket.id);
        })
    })
}