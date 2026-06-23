let ioInstance;

const setIO = (io) => {
  ioInstance = io;

  io.on("connection", (socket) => {
    console.log("User Connected", socket.id);

    socket.join(`user:${socket.user.id}`);

    console.log(`User ${socket.user.id} joined room user:${socket.user.id}`);

    socket.on("join_conversation", (conversationId) => {
  socket.join(`conversation_${conversationId}`);
  console.log(`User ${socket.user.id} joined conversation_${conversationId}`);
});
  });
};

const getIO = () => {
  if (!ioInstance) {
    throw new Error("Socket.io not initialized");
  }

  return ioInstance;
};

module.exports = { setIO, getIO };