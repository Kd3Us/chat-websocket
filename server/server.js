import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";


const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5000",
        methods: ["GET", "POST"]
    }
})

app.use(express.static(__dirname))

io.on("connection", (socket) => {
    console.log("Un utilisateur est connecté");

    socket.on("message", (data) => {
        io.emit("message", data) // envoie à tous les clients connecté
    })
    
    socket.on("disconnect", () => {
        console.log("Un utilisateur est deconnecté.");
    })
})

server.listen(5000, () => {
    console.log("Serveur en ligne sur le port 5000");
})