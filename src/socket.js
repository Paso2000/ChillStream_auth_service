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

        socket.on("sendMessage", (message) => {
            io.emit("receiveMessage", message); // Broadcast to all clients
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
