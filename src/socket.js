const { Server } = require("socket.io");

let io; // Declare the io instance globally

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*", // Change in production
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log(` User connected: ${socket.id}`);

        socket.on("joinRoom", (filmId) => {
            socket.join(filmId);
            console.log(`User ${socket.id} joined room: ${filmId}`);
        });

        // Leave room when user exits
        socket.on("leaveRoom", (filmId) => {
            socket.leave(filmId);
            console.log(`User ${socket.id} left room: ${filmId}`);
        });

        socket.on("sendMessage", (message) => {
            io.to(message.filmId).emit("receiveMessage", message);
        });

        socket.on("disconnect", () => {
            console.log(` User disconnected: ${socket.id}`);
        });
    });
};

// Function to get the Socket.IO instance
const getIo = () => {
    if (!io) {
        throw new Error("Socket.IO has not been initialized!");
    }
    return io;
};

module.exports = { initializeSocket, getIo };
