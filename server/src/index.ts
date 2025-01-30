import express, { Application, Request, Response, urlencoded } from "express";
import cors from "cors";
import Routes from 	'./routes/index.js'
import { Server } from "socket.io";
import { createServer } from "http";
import { setupSocket } from "./socket.js";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import redis from "./config/redis.config.js";
import {instrument} from '@socket.io/admin-ui'
const app: Application = express();
const PORT = process.env.PORT || 7000;

const server = createServer(app);
const io = new Server(server,{
    cors: {
        origin: ["https://admin.socket.io","http://localhost:3000"],
    credentials: true
    },
    adapter:createAdapter(redis)
});
instrument(io, {
    auth: false,
    mode: "development",
  });
export {io};
setupSocket(io)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//routes
app.use('/api', Routes);
server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));