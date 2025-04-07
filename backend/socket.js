import { Server } from "socket.io";
import USER from "./models/userSchema.js";
import CAPTAIN from "./models/captainSchema.js";

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("join", async (data) => {
      const { userId, userType } = data;

      if (userType === "user") {
        await USER.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      } else if (userType === "captain") {
        await CAPTAIN.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      }
    });

    socket.on("update-location", async (data) => {
      const { userId, location } = data;

      if(!location || !location.ltd || !location.lng){
        return socket.emit('error', {message: 'Invalid location'})
      }

      await CAPTAIN.findByIdAndUpdate(userId, { 
        location: {
            ltd: location.ltd,
            lng: location.lng
        }
      });
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};

export const sendMessageToSocketId = (socketId, messageObject) => {
  console.log(`Sending message to ${socketId}`, messageObject)
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io not initialized.");
  }
};
