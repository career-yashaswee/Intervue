const { Server } = require("socket.io");
const http = require("http");
const { handleSocketConnection } = require("../controllers/socket");
const ioClient = require("socket.io-client");

describe("Socket.io Integration Tests", () => {
  let server, io, clientSocket;

  beforeEach((done) => {
    server = http.createServer();
    io = new Server(server);
    handleSocketConnection(io, io.of("/"));

    server.listen(() => {
      const port = server.address().port;
      clientSocket = ioClient.connect(`http://localhost:${port}`);
      clientSocket.on("connect", done);
    });
  });

  afterEach(() => {
    clientSocket.close();
    io.close();
    server.close();
  });

  test("should join room and receive JOINED event", (done) => {
    const roomId = "test-room";
    const username = "test-user";

    clientSocket.emit("JOIN", { roomId, username });
    clientSocket.on("JOINED", ({ username: joinedUser, socketId }) => {
      expect(joinedUser).toBe(username);
      // Other assertions
      done();
    });
  });

  // Additional integration tests
});
